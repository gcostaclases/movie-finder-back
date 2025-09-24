//#region  ----------- IMPORTS -----------
// Importo las funciones del repositorio
import {
	findUser,
	populateUserProviders,
	addProviderToUser,
	removeProviderFromUser,
	addMovieToWatchlist,
	removeMovieFromWatchlist,
	populateUserWatchlist,
} from "../repositories/user.repository.js";

// Importo constantes
import { INTERNAL_SERVER_ERROR } from "../utils/constants.js";
//#endregion ----------- IMPORTS -----------

// PROVIDERS
// Obtener los proveedores del usuario autenticado
export const getMyProvidersController = async (req, res) => {
	const { userId } = req.user;
	try {
		const user = await findUser({ _id: userId });
		if (!user) {
			return res.status(404).json({
				message: "Usuario no encontrado",
			});
		}
		const userWithProviders = await populateUserProviders(user);
		return res.status(200).json(userWithProviders.providers);
	} catch (error) {
		console.error("Error al obtener proveedores del usuario:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

// Agregar un proveedor a la lista del usuario autenticado
export const addProviderToUserController = async (req, res) => {
	const { providerId } = req.body;
	const { userId } = req.user;
	try {
		const result = await addProviderToUser({ providerId }, userId);
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

// Quitar un proveedor de la lista del usuario autenticado
export const removeProviderFromUserController = async (req, res) => {
	const { providerId } = req.params;
	const { userId } = req.user;
	try {
		const result = await removeProviderFromUser(userId, providerId);
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

// WATCHLIST
// Obtener la watchlist del usuario autenticado
export const getMyWatchlistController = async (req, res) => {
	const { userId } = req.user;
	try {
		const user = await findUser({ _id: userId });
		if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
		const userWithWatchlist = await populateUserWatchlist(user);
		return res.status(200).json(userWithWatchlist.watchlist);
	} catch (error) {
		console.error("Error al obtener watchlist:", error);
		return res.status(500).json({ message: "Error interno del servidor" });
	}
};

// Agregar película a la watchlist
export const addMovieToWatchlistController = async (req, res) => {
	const { movieId } = req.body;
	const { userId } = req.user;
	try {
		const result = await addMovieToWatchlist(userId, movieId);
		if (result === null) return res.status(404).json({ message: "Usuario no encontrado" });
		if (result === false) return res.status(400).json({ message: "La película ya está en tu watchlist" });
		return res.status(201).json({ message: "Película agregada a tu watchlist" });
	} catch (error) {
		console.error("Error al agregar película a la watchlist:", error);
		return res.status(500).json({ message: "Error interno del servidor" });
	}
};

// Quitar película de la watchlist
export const removeMovieFromWatchlistController = async (req, res) => {
	const { movieId } = req.params;
	const { userId } = req.user;
	try {
		const result = await removeMovieFromWatchlist(userId, movieId);
		if (result === null) return res.status(404).json({ message: "Usuario no encontrado" });
		if (result === false) return res.status(404).json({ message: "La película no estaba en tu watchlist" });
		return res.status(200).json({ message: "Película eliminada de tu watchlist" });
	} catch (error) {
		console.error("Error al quitar película de la watchlist:", error);
		return res.status(500).json({ message: "Error interno del servidor" });
	}
};
