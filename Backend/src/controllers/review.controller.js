//#region  ----------- IMPORTS -----------
// Importo el servicio de repositorios
import repoFactory from "../repositories/repositories.service.js";

// Importo constantes
import { INVALID_PAYLOAD_MESSAGE, INTERNAL_SERVER_ERROR } from "../utils/constants.js";
//#endregion ----------- IMPORTS -----------

/**
 * Crea una nueva reseña para una película
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} Reseña creada
 */
export const createReviewController = async (req, res) => {
	const { movieId, rating, comment } = req.body;
	const { userId } = req.user;

	try {
		// Verificar si la película existe
		const movie = await repoFactory.findMovie({ _id: movieId });
		if (!movie) {
			return res.status(404).json({
				message: "Película no encontrada",
			});
		}

		// Verificar si el usuario ya reseñó esta película
		const existingReview = await repoFactory.findReview({ userId, movieId });
		if (existingReview) {
			return res.status(400).json({
				message: "Ya has reseñado esta película. Puedes editar tu reseña existente.",
			});
		}

		const newReview = await repoFactory.saveReview(userId, movieId, rating, comment);
		return res.status(201).json(newReview);
	} catch (error) {
		console.error("Error al crear reseña:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Obtiene todas las reseñas de una película con estadísticas
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} Lista de reseñas y estadísticas
 */
export const getMovieReviewsController = async (req, res) => {
	const { movieId } = req.params;

	try {
		// Verificar si la película existe
		const movie = await repoFactory.findMovie({ _id: movieId });
		if (!movie) {
			return res.status(404).json({
				message: "Película no encontrada",
			});
		}

		const reviews = await repoFactory.findReviewsByMovie(movieId);
		const stats = await repoFactory.getAverageRating(movieId);

		return res.json({
			reviews,
			stats: {
				averageRating: stats.averageRating,
				totalReviews: stats.totalReviews,
			},
		});
	} catch (error) {
		console.error("Error al obtener reseñas:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Obtiene todas las reseñas del usuario autenticado
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Array>} Lista de reseñas del usuario
 */
export const getMyReviewsController = async (req, res) => {
	const { userId } = req.user;

	try {
		const reviews = await repoFactory.findReviewsByUser(userId);
		return res.json(reviews);
	} catch (error) {
		console.error("Error al obtener mis reseñas:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Actualiza una reseña del usuario autenticado
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} Reseña actualizada
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

		// Verificar que el usuario es el autor de la reseña
		if (review.userId.toString() !== userId) {
			return res.status(403).json({
				message: "No tienes permiso para editar esta reseña",
			});
		}

		const updatedReview = await repoFactory.updateReview(reviewId, rating, comment);
		return res.json(updatedReview);
	} catch (error) {
		console.error("Error al actualizar reseña:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Elimina una reseña del usuario autenticado
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} Mensaje de confirmación
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

		// Verificar que el usuario es el autor de la reseña
		if (review.userId.toString() !== userId) {
			return res.status(403).json({
				message: "No tienes permiso para eliminar esta reseña",
			});
		}

		await repoFactory.deleteReview(reviewId);
		return res.json({ message: "Reseña eliminada correctamente" });
	} catch (error) {
		console.error("Error al eliminar reseña:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

