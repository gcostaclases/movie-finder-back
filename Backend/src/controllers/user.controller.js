//#region  ----------- IMPORTS -----------
// Importo el servicio de Cloudinary
import cloudinary from "../services/cloudinary.js";

// Importo las funciones del repositorio
import repoFactory from "../repositories/repositories.service.js";

// Importo el servicio de cache
//import cacheService from "../services/cache/index.js";

// Importo constantes
import { INTERNAL_SERVER_ERROR, INVALID_PAYLOAD_MESSAGE } from "../utils/constants.js";
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
 * Reemplaza la lista completa de proveedores del usuario autenticado
 * PUT /users/me/providers
 * @param {Object} req - Request de Express
 * @param {Array<string>} req.body - Array de IDs de proveedores a dejar en la lista
 * @param {Object} req.user - Usuario autenticado
 * @param {string} req.user.userId - ID del usuario autenticado
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con array de proveedores actualizado o error
 */
export const replaceUserProvidersController = async (req, res) => {
	const providerIds = req.body; // Ahora el body es directamente un array
	const { userId } = req.user;

	try {
		// console.log("IDs recibidos en el body:", providerIds);

		const user = await repoFactory.findUser({ _id: userId });
		if (!user) {
			return res.status(404).json({
				message: "Usuario no encontrado",
			});
		}

		// console.log("Providers ANTES de asignar:", user.providers);

		user.providers = providerIds;
		await user.save();

		// console.log("Providers DESPUÉS de asignar y guardar:", user.providers);

		// Populo los providers para devolver el array completo
		const userWithProviders = await repoFactory.populateUserProviders(user);

		// console.log("Providers después de populate:", userWithProviders.providers);

		return res.status(200).json(userWithProviders.providers);
	} catch (error) {
		console.error("Error al actualizar proveedores:", error);
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

		// Ordeno para que la última agregada quede primero
		const orderedWatchlist = [...userWithWatchlist.watchlist].reverse();

		// Pagino la watchlist
		const total = orderedWatchlist.length;
		const paginatedWatchlist = orderedWatchlist.slice((page - 1) * limit, page * limit);

		// Mapeo para asegurarme que solo se devuelven los campos deseados
		const movies = paginatedWatchlist.map((movie) => ({
			_id: movie._id,
			title: movie.title,
			posterPath: movie.posterPath,
			releaseDate: movie.releaseDate,
			duration: movie.duration,
			directors: movie.directors,
			overview: movie.overview,
		}));

		// // Respondo con la estructura completa
		// res.status(200).json({
		// 	movies: paginatedWatchlist,
		// 	total,
		// 	page: parseInt(page, 10),
		// 	limit: parseInt(limit, 10),
		// });

		res.status(200).json({
			movies,
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

		// Devuelvo la info de la película agregada
		const movieInfo = {
			_id: movie._id,
			title: movie.title,
			posterPath: movie.posterPath,
			releaseDate: movie.releaseDate,
			duration: movie.duration,
			directors: movie.directors,
			overview: movie.overview,
		};

		return res.status(201).json({
			message: "Película agregada a la watchlist",
			movie: movieInfo,
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

//#region ----------- PROFILE -----------

export const getMyProfileController = async (req, res) => {
	const { userId } = req.user;

	try {
		// Busco al usuario en la base de datos
		const user = await repoFactory.findUser({ _id: userId });
		if (!user) {
			return res.status(404).json({
				message: "Usuario no encontrado.",
			});
		}

		// Devuelvo los datos del usuario
		res.status(200).json({
			username: user.username,
			email: user.email,
			profileImage: user.profileImage || null, // Devuelvo null si no tiene imagen
		});
	} catch (error) {
		console.error("Error al obtener el perfil del usuario:", error);
		res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Actualiza la imagen de perfil del usuario autenticado
 * PUT /me/profile-image
 * @param {Object} req - Request de Express
 * @param {Object} req.user - Usuario autenticado (desde middleware)
 * @param {string} req.user.userId - ID del usuario autenticado
 * @param {Object} req.file - Archivo subido (procesado por multer)
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con la URL de la imagen subida o mensaje de error
 */
export const uploadProfileImageController = async (req, res) => {
	const { userId } = req.user;

	// Verifico que se haya subido un archivo
	if (!req.file) {
		return res.status(400).json({
			message: INVALID_PAYLOAD_MESSAGE,
			details: ["No se subió ninguna imagen."],
		});
	}

	try {
		// Busco al usuario usando el repositorio
		const user = await repoFactory.findUser({ _id: userId });
		if (!user) {
			return res.status(404).json({
				message: "Usuario no encontrado.",
			});
		}

		// Si el usuario ya tiene una imagen de perfil, la elimino de Cloudinary
		if (user.profileImage) {
			try {
				const publicId = user.profileImage.split("/").slice(-2).join("/").split(".")[0];
				await cloudinary.uploader.destroy(publicId);
				console.log(`Imagen anterior eliminada: ${publicId}`);
			} catch (error) {
				console.error("Error al eliminar la imagen anterior de Cloudinary:", error);
			}
		}

		// Subo la nueva imagen a Cloudinary
		const result = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						folder: "profile-images",
					},
					(error, result) => {
						if (error) {
							reject(new Error("Error al subir la imagen a Cloudinary."));
						} else {
							resolve(result);
						}
					}
				)
				.end(req.file.buffer);
		});

		console.log("Imagen subida a Cloudinary:", result.secure_url);

		// Actualizo la URL de la nueva imagen usando el repositorio
		const updatedUser = await repoFactory.updateUserProfileImage(userId, result.secure_url);

		console.log("Usuario actualizado en la base de datos:", updatedUser);

		res.status(200).json({
			message: "Imagen de perfil actualizada con éxito.",
			profileImage: updatedUser.profileImage,
		});
	} catch (error) {
		console.error("Error al subir la imagen de perfil:", error);
		res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

//#endregion ----------- PROFILE -----------

