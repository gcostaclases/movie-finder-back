//#region  ----------- IMPORTS -----------
// Importo las funciones del repositorio
import repoFactory from "../repositories/repositories.service.js";

// Importo el servicio de cache
//import cacheService from "../services/cache/index.js";

// Importo constantes
import { INTERNAL_SERVER_ERROR } from "../utils/constants.js";
//#endregion ----------- IMPORTS -----------

//#region ----------- PROVIDERS -----------

/**
 * Obtiene los proveedores del usuario autenticado
 * GET /users/me/providers
 * @param {Object} req - Request de Express
 * @param {Object} req.user - Usuario autenticado (desde middleware)
 * @param {string} req.user.userId - ID del usuario autenticado
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con array de proveedores del usuario
 */
export const getMyProvidersController = async (req, res) => {
	const { userId } = req.user;
	try {
		const user = await repoFactory.findUser({ _id: userId });
		if (!user) {
			return res.status(404).json({
				message: "Usuario no encontrado",
			});
		}
		const userWithProviders = await repoFactory.populateUserProviders(user);
		return res.status(200).json(userWithProviders.providers);
	} catch (error) {
		console.error("Error al obtener proveedores del usuario:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Agrega un proveedor a la lista del usuario autenticado
 * POST /users/me/providers
 * @param {Object} req - Request de Express
 * @param {Object} req.body - Cuerpo de la petición
 * @param {string} req.body.providerId - ID del proveedor a agregar
 * @param {Object} req.user - Usuario autenticado
 * @param {string} req.user.userId - ID del usuario autenticado
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con mensaje de confirmación o error
 */
export const addProviderToUserController = async (req, res) => {
	const { providerId } = req.body;
	const { userId } = req.user;
	try {
		const result = await repoFactory.addProviderToUser(providerId, userId);
		if (result === null) {
			return res.status(404).json({
				message: "Usuario no encontrado",
			});
		}
		if (result === false) {
			return res.status(400).json({
				message: "El proveedor ya está en tu lista",
			});
		}
		return res.status(201).json({
			message: "Proveedor agregado a tu lista",
		});
	} catch (error) {
		console.error("Error al agregar proveedor al usuario:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Remueve un proveedor de la lista del usuario autenticado
 * DELETE /users/me/providers/:providerId
 * @param {Object} req - Request de Express
 * @param {string} req.params.providerId - ID del proveedor a remover
 * @param {Object} req.user - Usuario autenticado
 * @param {string} req.user.userId - ID del usuario autenticado
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con mensaje de confirmación o error 404
 */
export const removeProviderFromUserController = async (req, res) => {
	const { providerId } = req.params;
	const { userId } = req.user;
	try {
		const result = await repoFactory.removeProviderFromUser(userId, providerId);
		if (result === null) {
			return res.status(404).json({
				message: "Usuario no encontrado",
			});
		}
		if (result === false) {
			return res.status(404).json({
				message: "Proveedor no estaba en tu lista",
			});
		}
		return res.status(200).json({
			message: "Proveedor eliminado de tu lista",
		});
	} catch (error) {
		console.error("Error al quitar proveedor del usuario:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

//#endregion ----------- PROVIDERS -----------

//#region ----------- WATCHLIST -----------

/**
 * Obtiene la watchlist del usuario autenticado
 * GET /users/me/watchlist
 * @param {Object} req - Request de Express
 * @param {Object} req.user - Usuario autenticado
 * @param {string} req.user.userId - ID del usuario autenticado
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con array de películas en la watchlist
 */
export const getMyWatchlistController = async (req, res) => {
	const { userId } = req.user;
	const { page = 1, limit = 10 } = req.query;

	try {
		// Consulto el usuario en la base de datos
		const user = await repoFactory.findUser({ _id: userId });
		if (!user) {
			return res.status(404).json({
				message: "Usuario no encontrado",
			});
		}

		// Populo la watchlist del usuario
		const userWithWatchlist = await repoFactory.populateUserWatchlist(user);

		// Pagino la watchlist
		const total = userWithWatchlist.watchlist.length;
		const paginatedWatchlist = userWithWatchlist.watchlist.slice((page - 1) * limit, page * limit);

		// Respondo con la estructura completa
		res.status(200).json({
			movies: paginatedWatchlist,
			total,
			page: parseInt(page, 10),
			limit: parseInt(limit, 10),
		});
	} catch (error) {
		console.error("Error al obtener watchlist:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Agrega una película a la watchlist del usuario autenticado
 * POST /users/me/watchlist
 * @param {Object} req - Request de Express
 * @param {Object} req.body - Cuerpo de la petición
 * @param {string} req.body.movieId - ID de la película a agregar
 * @param {Object} req.user - Usuario autenticado
 * @param {string} req.user.userId - ID del usuario autenticado
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con mensaje de confirmación o error
 */
export const addMovieToWatchlistController = async (req, res) => {
	const { movieId } = req.body;
	const { userId } = req.user;

	try {
		// Verifico si la película existe
		const movie = await repoFactory.findMovie({ _id: movieId });
		if (!movie) {
			return res.status(404).json({
				message: "Película no encontrada",
			});
		}

		// Agrego la película a la watchlist del usuario
		const added = await repoFactory.addMovieToWatchlist(userId, movieId);
		if (added === null) {
			return res.status(404).json({
				message: "Usuario no encontrado",
			});
		}
		if (!added) {
			return res.status(400).json({
				message: "La película ya está en tu watchlist",
			});
		}

		return res.status(201).json({
			message: "Película agregada a la watchlist",
		});
	} catch (error) {
		console.error("Error al agregar película a la watchlist:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Remueve una película de la watchlist del usuario autenticado
 * DELETE /users/me/watchlist/:movieId
 * @param {Object} req - Request de Express
 * @param {string} req.params.movieId - ID de la película a remover
 * @param {Object} req.user - Usuario autenticado
 * @param {string} req.user.userId - ID del usuario autenticado
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con mensaje de confirmación o error 404
 */
export const removeMovieFromWatchlistController = async (req, res) => {
	const { movieId } = req.params;
	const { userId } = req.user;

	try {
		// Elimino la película de la watchlist del usuario
		const removed = await repoFactory.removeMovieFromWatchlist(userId, movieId);
		if (removed === null) {
			return res.status(404).json({
				message: "Usuario no encontrado",
			});
		}
		if (!removed) {
			return res.status(400).json({
				message: "La película no está en tu watchlist",
			});
		}

		return res.status(200).json({
			message: "Película eliminada de la watchlist",
		});
	} catch (error) {
		console.error("Error al quitar película de la watchlist:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

//#endregion ----------- WATCHLIST -----------
