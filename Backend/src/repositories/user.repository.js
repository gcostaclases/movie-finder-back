//#region  ----------- IMPORTS -----------
// Importamos el modelo de usuario
import User from "../models/user.model.js";
//#endregion ----------- IMPORTS -----------

// Buscar un usuario
export const findUser = async (filter) => {
	const user = await User.findOne(filter);
	return user;
};

// Contar usuarios por filtro
export const countUsers = async (filter) => {
	const count = await User.countDocuments(filter);
	return count;
};

// Crear usuario
export const saveUser = async (username, email, password) => {
	const newUser = new User({
		username,
		email,
		password,
	});
	return await newUser.save();
};

// PROVIDERS
// Popular los proveedores de un usuario ya obtenido
export const populateUserProviders = async (user) => {
	if (!user) return null;
	return await user.populate("providers");
};

// Agregar proveedor a la lista del usuario
export const addProviderToUser = async ({ providerId }, userId) => {
	const user = await User.findById(userId);
	if (!user) return null;
	if (user.providers.includes(providerId)) return false;
	user.providers.push(providerId);
	await user.save();
	return true;
};

// Quitar proveedor de la lista del usuario
export const removeProviderFromUser = async (userId, providerId) => {
	const user = await User.findById(userId);
	if (!user) return null;
	const initialLength = user.providers.length;
	user.providers = user.providers.filter((id) => id.toString() !== providerId);
	if (user.providers.length === initialLength) return false;
	await user.save();
	return true;
};

// WATCHLIST
// Popular la watchlist de un usuario ya obtenido
export const populateUserWatchlist = async (user) => {
	if (!user) return null;
	return await user.populate("watchlist");
};

// Agregar película a la watchlist del usuario
export const addMovieToWatchlist = async (userId, movieId) => {
	const user = await User.findById(userId);
	if (!user) return null;
	if (user.watchlist.includes(movieId)) return false;
	user.watchlist.push(movieId);
	await user.save();
	return true;
};

// Quitar película de la watchlist del usuario
export const removeMovieFromWatchlist = async (userId, movieId) => {
	const user = await User.findById(userId);
	if (!user) return null;
	const initialLength = user.watchlist.length;
	user.watchlist = user.watchlist.filter((id) => id.toString() !== movieId);
	if (user.watchlist.length === initialLength) return false;
	await user.save();
	return true;
};
