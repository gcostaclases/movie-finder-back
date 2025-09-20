import {
	findUserByIdWithProviders,
	addProviderToUser,
	removeProviderFromUser,
} from "../repositories/user.repository.js";

// Obtener los proveedores del usuario autenticado
export const getMyProvidersController = async (req, res) => {
	try {
		const user = await findUserByIdWithProviders(req.user.id);
		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}
		return res.json(user.proveedores);
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
	const userId = req.user.id;
	try {
		const result = await addProviderToUser({ providerId }, userId);
		if (result === null) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}
		if (result === false) {
			return res.status(400).json({ message: "El proveedor ya está en tu lista" });
		}
		return res.json({ message: "Proveedor agregado a tu lista" });
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
	try {
		const result = await removeProviderFromUser(req.user.id, providerId);
		if (result === null) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}
		if (result === false) {
			return res.status(404).json({ message: "Proveedor no estaba en tu lista" });
		}
		return res.json({ message: "Proveedor eliminado de tu lista" });
	} catch (error) {
		console.error("Error al quitar proveedor del usuario:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};
