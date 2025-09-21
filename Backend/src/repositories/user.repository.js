//#region  ----------- IMPORTS -----------
// Importamos el modelo de usuario
import User from "../models/user.model.js";
//#endregion ----------- IMPORTS -----------

export const findUser = async (filter) => {
	const user = await User.findOne(filter);
	return user;
};

export const countUsers = async (filter) => {
	const count = await User.countDocuments(filter);
	return count;
};

export const saveUser = async (username, email, password) => {
	const newUser = new User({
		username,
		email,
		password,
	});
	return await newUser.save();
};

// PROVEEDORES
// Obtener usuario por ID y popular proveedores
export const findUserByIdWithProviders = async (id) => {
	return await User.findById(id).populate("providers");
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
