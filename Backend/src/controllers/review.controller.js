//#region  ----------- IMPORTS -----------
// Importo el servicio de repositorios
import repoFactory from "../repositories/repositories.service.js";

// Importo el servicio de cache
import cacheService from "../services/cache/index.js";

// Importo constantes
import { INVALID_PAYLOAD_MESSAGE, INTERNAL_SERVER_ERROR } from "../utils/constants.js";
//#endregion ----------- IMPORTS -----------

/**
 * Crea una nueva reseña para una película (con reporte opcional de disponibilidad)
 *
 * Permite a un usuario autenticado crear una reseña con puntuación y comentario opcional.
 * Opcionalmente, puede incluir el servicio de streaming donde vio la película.
 *
 * Validaciones:
 * - La película debe existir
 * - El usuario no puede tener más de una reseña por película
 * - El rating debe ser un entero entre 1 y 10
 *
 * Efecto secundario (si se incluye providerId):
 * - Crea automáticamente un registro de availability
 * - Solo si el provider existe y el usuario no lo había reportado antes
 * - Si el provider no existe o ya fue reportado, se ignora sin fallar la review
 *
 * Este método invalida los caches relacionados:
 * - Cache de ratings de la película.
 * - Cache de reviews de la película.
 * - Cache de disponibilidad de la película.
 * - Cache de reviews del usuario autenticado.
 *
 * @param {Object} req - Request de Express
 * @param {Object} req.body - Cuerpo de la petición
 * @param {string} req.body.movieId - ID de la película a reseñar (requerido)
 * @param {number} req.body.rating - Puntuación de 1 a 10 (requerido)
 * @param {string} [req.body.comment] - Comentario de texto (opcional, max 500 caracteres)
 * @param {string} [req.body.providerId] - ID del servicio donde vio la película (opcional)
 * @param {Object} req.user - Usuario autenticado (inyectado por authMiddleware)
 * @param {string} req.user.userId - ID del usuario que crea la reseña
 * @param {Object} res - Response de Express
 *
 * @returns {Promise<void>} JSON con la reseña creada (201) o mensajes de error (400/404/500)
 *
 * @example
 * // Request body mínimo (sin availability)
 * {
 *   "movieId": "68d30243f5be4f51a4c4a9d3",
 *   "rating": 9,
 *   "comment": "Excelente película"
 * }
 *
 * @example
 * // Request body completo (con availability)
 * {
 *   "movieId": "68d30243f5be4f51a4c4a9d3",
 *   "rating": 9,
 *   "comment": "Excelente película",
 *   "providerId": "68d055c86aa347d04a2053da"
 * }
 */
export const createReviewController = async (req, res) => {
	const { movieId, rating, comment, providerId } = req.body;
	const { userId } = req.user;

	try {
		// Verifico si la película existe
		const movie = await repoFactory.findMovie({ _id: movieId });
		if (!movie) {
			return res.status(404).json({
				message: "Película no encontrada",
			});
		}

		// Verifico si el usuario ya reseñó esta película
		const existingReview = await repoFactory.findReview({ userId, movieId });
		if (existingReview) {
			return res.status(400).json({
				message: "Ya has reseñado esta película. Puedes editar tu reseña existente.",
			});
		}

		// Creo la review
		const newReview = await repoFactory.saveReview(userId, movieId, rating, comment);

		// Invalidar caches relacionados
		await cacheService.delete(`movie:${movieId}:rating`); // Puntaje de la película
		await cacheService.delete(`reviews:movie:${movieId}`); // Reviews de la película
		await cacheService.delete(`reviews:user:${userId}`); // Reviews del usuario
		//await cacheService.delete(`movie:${movieId}:reviews`); // !Si cacheas las reviews de la película

		// Si se incluye providerId, también reporto disponibilidad
		if (providerId) {
			// Verifico que el provider existe
			const provider = await repoFactory.findProvider({ _id: providerId });
			if (provider) {
				// Verifico si ya reportó disponibilidad para evitar duplicados
				const alreadyReported = await repoFactory.availabilityExists(userId, movieId, providerId);

				if (!alreadyReported) {
					await repoFactory.saveAvailability(userId, movieId, providerId);

					// Invalido cache de disponibilidad (solo si se creó)
					await cacheService.delete(`movie:${movieId}:availability`);
				}
			}
		}

		return res.status(201).json(newReview);
	} catch (error) {
		console.error("Error al crear reseña:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Obtiene todas las reseñas de una película
 *
 * Este método utiliza cache para optimizar la carga:
 * - Cachea las reviews de la película.
 *
 * @param {Object} req - Request de Express
 * @param {Object} req.params - Parámetros de la ruta
 * @param {string} req.params.movieId - ID de la película
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con las reseñas
 */
export const getMovieReviewsController = async (req, res) => {
	const { movieId } = req.params;
	const { page = 1, limit = 10 } = req.query;

	// Cache key
	const reviewsCacheKey = `reviews:movie:${movieId}:page:${page}:limit:${limit}`;

	try {
		// Verificar si la película existe
		const movie = await repoFactory.findMovie({ _id: movieId });
		if (!movie) {
			return res.status(404).json({
				message: "Película no encontrada",
			});
		}

		// Intento obtener las reviews del cache
		let reviews = await cacheService.get(reviewsCacheKey);
		if (!reviews) {
			// Si no están en cache, consulto la base de datos
			reviews = await repoFactory.findReviewsByMovie(movieId);
			// Solo guardo en cache por 5 minutos si el array no está vacío
			if (reviews.length > 0) {
				await cacheService.set(reviewsCacheKey, reviews, 300);
			}
		}

		// Respondo con las reviews
		return res.status(200).json(reviews);
	} catch (error) {
		console.error("Error al obtener reseñas:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Obtiene todas las reseñas del usuario autenticado
 *
 * Este método utiliza cache para optimizar la carga:
 * - Cachea las reviews del usuario autenticado.
 *
 * @param {Object} req - Request de Express
 * @param {Object} req.user - Usuario autenticado
 * @param {string} req.user.userId - ID del usuario autenticado
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con las reseñas del usuario
 */
export const getMyReviewsController = async (req, res) => {
	const { userId } = req.user;

	// Cache key
	const userReviewsCacheKey = `reviews:user:${userId}`;

	try {
		// Intento obtener las reviews del cache
		let reviews = await cacheService.get(userReviewsCacheKey);
		if (!reviews) {
			// Si no están en cache, consulto la base de datos
			reviews = await repoFactory.findReviewsByUser(userId);
			// Guardo en cache por 5 minutos
			await cacheService.set(userReviewsCacheKey, reviews, 300);
		}

		// Respondo con las reviews
		return res.status(200).json(reviews);
	} catch (error) {
		console.error("Error al obtener mis reseñas:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Actualiza una reseña del usuario autenticado
 *
 * Este método invalida los caches relacionados:
 * - Cache de ratings de la película.
 * - Cache de reviews de la película.
 * - Cache de disponibilidad de la película.
 * - Cache de reviews del usuario autenticado.
 *
 * @param {Object} req - Request de Express
 * @param {Object} req.params - Parámetros de la ruta
 * @param {string} req.params.reviewId - ID de la reseña a actualizar
 * @param {Object} req.body - Cuerpo de la petición
 * @param {number} req.body.rating - Nueva puntuación (opcional)
 * @param {string} req.body.comment - Nuevo comentario (opcional)
 * @param {Object} req.user - Usuario autenticado
 * @param {string} req.user.userId - ID del usuario autenticado
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con la reseña actualizada
 */
export const updateReviewController = async (req, res) => {
	const { reviewId } = req.params;
	const { rating, comment } = req.body;
	const { userId } = req.user;

	try {
		const review = await repoFactory.findReview({ _id: reviewId });

		if (!review) {
			return res.status(404).json({
				message: "Reseña no encontrada",
			});
		}

		// Verifico que el usuario es el autor de la reseña
		if (review.userId.toString() !== userId) {
			return res.status(403).json({
				message: "No tienes permiso para editar esta reseña",
			});
		}

		const updatedReview = await repoFactory.updateReview(reviewId, rating, comment);

		// Invalidar caches relacionados
		await cacheService.delete(`movie:${review.movieId}:rating`); // Puntaje de la película
		await cacheService.delete(`reviews:movie:${review.movieId}`); // Reviews de la película
		await cacheService.delete(`reviews:user:${userId}`); // Reviews del usuario
		//await cacheService.delete(`movie:${review.movieId}:reviews`);

		return res.status(200).json(updatedReview);
	} catch (error) {
		console.error("Error al actualizar reseña:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Elimina una reseña del usuario autenticado
 *
 * Este método invalida los caches relacionados:
 * - Cache de ratings de la película.
 * - Cache de reviews de la película.
 * - Cache de disponibilidad de la película.
 * - Cache de reviews del usuario autenticado.
 *
 * @param {Object} req - Request de Express
 * @param {Object} req.params - Parámetros de la ruta
 * @param {string} req.params.reviewId - ID de la reseña a eliminar
 * @param {Object} req.user - Usuario autenticado
 * @param {string} req.user.userId - ID del usuario autenticado
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con mensaje de confirmación
 */
export const deleteReviewController = async (req, res) => {
	const { reviewId } = req.params;
	const { userId } = req.user;

	try {
		const review = await repoFactory.findReview({ _id: reviewId });

		if (!review) {
			return res.status(404).json({
				message: "Reseña no encontrada",
			});
		}

		// Verifico que el usuario es el autor de la reseña
		if (review.userId.toString() !== userId) {
			return res.status(403).json({
				message: "No tienes permiso para eliminar esta reseña",
			});
		}

		// Elimino la reseña
		await repoFactory.deleteReview(reviewId);

		// Invalidar caches relacionados
		await cacheService.delete(`movie:${review.movieId}:rating`); // Puntaje de la película
		await cacheService.delete(`reviews:movie:${review.movieId}`); // Reviews de la película
		await cacheService.delete(`reviews:user:${userId}`); // Reviews del usuario
		//await cacheService.delete(`movie:${review.movieId}:reviews`);

		return res.status(200).json({ message: "Reseña eliminada correctamente" });
	} catch (error) {
		console.error("Error al eliminar reseña:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

