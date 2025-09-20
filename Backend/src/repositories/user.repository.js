// Importamos el modelo de usuario
import User from "../models/user.model.js";

// Importamos bcrypt para hashear las contraseñas
//import bcrypt from "bcrypt";

export const findUser = async (filter) => {
	const user = await User.findOne(filter);
	return user;
};

export const countUsers = async (filter) => {
	const count = await User.countDocuments(filter);
	return count;
};

export const saveUser = async (username, email, password) => {
	// Ahora esto lo estoy haciendo a nivel del esquema
	/*
	// Hasheamos la contraseña antes de guardarla
	const SALT_ROUNDS = 10;
	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});
	*/
	const newUser = new User({
		username,
		email,
		password,
	});
	return await newUser.save();
};

//#region Funciones que ya no se usan
/*
export const userPasswordMatch = async (plainPassword, hashedPassword) => {
	const result = await bcrypt.compare(plainPassword, hashedPassword);
	return result;
};

export const findUserByIdentifierAndPassword = async (identifier, password) => {
	// Busca por email o username y contraseña en texto plano
	const user = await User.findOne({
		$or: [{ email: identifier }, { username: identifier }],
		password: password,
	});

	if (!user) return null;
	return user;
};

export const findUserByEmail = async (email) => {
	const user = await User.findOne({ email });
	return user;
};

export const findUserByUsername = async (username) => {
	const user = await User.findOne({ username });
	return user;
};
*/
//#endregion

// PROVEEDORES
// Obtener usuario por ID y popular proveedores
export const findUserByIdWithProviders = async (id) => {
	return await User.findById(id).populate("proveedores");
};

// TODO: Revisar - 18-09-2025 1:27:15 - Grabación con ejemplo saveToDo
// Agregar proveedor a la lista del usuario
export const addProviderToUser = async ({ providerId }, userId) => {
	const user = await User.findById(userId);
	if (!user) return null;
	if (user.proveedores.includes(providerId)) return false;
	user.proveedores.push(providerId);
	await user.save();
	return true;
};

// Quitar proveedor de la lista del usuario
export const removeProviderFromUser = async (userId, providerId) => {
	const user = await User.findById(userId);
	if (!user) return null;
	const initialLength = user.proveedores.length;
	user.proveedores = user.proveedores.filter((id) => id.toString() !== providerId);
	if (user.proveedores.length === initialLength) return false;
	await user.save();
	return true;
};
