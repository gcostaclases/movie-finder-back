//#region  ----------- IMPORTS -----------
// Importo el factory de repositorios (patrón Adapter)
import repoFactory from "../repositories/repositories.service.js";

// Importo el servicio de cache
import cacheService from "../services/cache/index.js";

// Importo constantes
import { INTERNAL_SERVER_ERROR } from "../utils/constants.js";
//#endregion ----------- IMPORTS -----------

/**
 * Reporta que el usuario vio una película en un servicio específico
 * POST /movies/:movieId/availability
 *
 * Invalida el cache de availability de la película después de reportar.
 *
 * @param {Object} req - Request de Express
 * @param {string} req.params.movieId - ID de la película
 * @param {Object} req.body - Cuerpo de la petición
 * @param {string} req.body.providerId - ID del proveedor donde vio la película
 * @param {Object} req.user - Usuario autenticado
 * @param {string} req.user.userId - ID del usuario
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con mensaje de confirmación (201) o error (400/404/500)
 */
export const reportMovieAvailabilityController = async (req, res) => {
	const { movieId } = req.params;
	const { providerId } = req.body;
	const { userId } = req.user;

	try {
		// Verifico que la película existe
		const movie = await repoFactory.findMovie({ _id: movieId });
		if (!movie) {
			return res.status(404).json({ message: "Película no encontrada" });
		}

		// Verifico que el proveedor existe
		const provider = await repoFactory.findProvider({ _id: providerId });
		if (!provider) {
			return res.status(404).json({ message: "Proveedor no encontrado" });
		}

		// Verifico si el usuario ya reportó esta película en este servicio
		const exists = await repoFactory.availabilityExists(userId, movieId, providerId);
		if (exists) {
			return res.status(400).json({
				message: "Ya reportaste esta película en este servicio",
			});
		}

		// Verifico que el proveedor esté en la lista del usuario
		const user = await repoFactory.findUser({ _id: userId });
		const userWithProviders = await repoFactory.populateUserProviders(user);
		const userProviderIds = userWithProviders.providers.map((p) => p._id.toString());

		if (!userProviderIds.includes(providerId)) {
			return res.status(400).json({
				message: "No puedes reportar disponibilidad en un proveedor que no tienes contratado.",
			});
		}

		// Guardo el reporte
		await repoFactory.saveAvailability(userId, movieId, providerId);

		// Invalido cache de availability
		await cacheService.delete(`movie:${movieId}:availability`);

		return res.status(201).json({
			message: "Disponibilidad reportada correctamente",
		});
	} catch (error) {
		console.error("Error al reportar disponibilidad:", error);
		return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
	}
};

/**
 * Obtiene las estadísticas de disponibilidad de una película (público)
 * GET /movies/:movieId/availability
 *
 * Utiliza cache de 10 minutos para optimizar performance.
 *
 * @param {Object} req - Request de Express
 * @param {string} req.params.movieId - ID de la película
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con availability stats o error (404/500)
 */
export const getMovieAvailabilityController = async (req, res) => {
	const { movieId } = req.params;

	try {
		// Verifico que la película existe
		const movie = await repoFactory.findMovie({ _id: movieId });
		if (!movie) {
			return res.status(404).json({ message: "Película no encontrada" });
		}

		// Cache key
		const availabilityCacheKey = `movie:${movieId}:availability`;

		// Intento obtener del cache
		let availability = await cacheService.get(availabilityCacheKey);
		if (!availability) {
			// Si no está en cache, lo calculo
			availability = await repoFactory.getMovieAvailabilityStats(movieId);
			// Guardo en cache por 10 minutos
			await cacheService.set(availabilityCacheKey, availability, 600);
		}

		return res.status(200).json({
			movieId,
			movieTitle: movie.title,
			availability,
		});
	} catch (error) {
		console.error("Error al obtener disponibilidad:", error);
		return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
	}
};

/**
 * Obtiene la disponibilidad personalizada según los servicios del usuario (requiere auth)
 * GET /movies/:movieId/availability/personalized
 *
 * Separa la availability en:
 * - yourServices: Servicios que el usuario tiene contratados
 * - otherServices: Servicios que el usuario NO tiene
 *
 * @param {Object} req - Request de Express
 * @param {string} req.params.movieId - ID de la película
 * @param {Object} req.user - Usuario autenticado
 * @param {string} req.user.userId - ID del usuario
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con availability personalizada o error (404/500)
 */
export const getPersonalizedAvailabilityController = async (req, res) => {
	const { movieId } = req.params;
	const { userId } = req.user;

	try {
		// Verifico que la película existe
		const movie = await repoFactory.findMovie({ _id: movieId });
		if (!movie) {
			return res.status(404).json({ message: "Película no encontrada" });
		}

		// Obtengo los proveedores del usuario
		const user = await repoFactory.findUser({ _id: userId });
		const userWithProviders = await repoFactory.populateUserProviders(user);

		// Obtengo availability personalizada
		const availability = await repoFactory.getPersonalizedAvailability(movieId, userWithProviders.providers);

		return res.status(200).json({
			movieId,
			movieTitle: movie.title,
			...availability,
		});
	} catch (error) {
		console.error("Error al obtener disponibilidad personalizada:", error);
		return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
	}
};
