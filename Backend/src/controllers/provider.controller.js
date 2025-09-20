//#region  ----------- IMPORTS -----------
// Importo las funciones del repositorio
import {
	findAllProviders,
	findProvider,
	countProviders,
	saveProvider,
	updateProvider,
	deleteProvider,
} from "../repositories/provider.repository.js";

// Importo constantes
import { INVALID_PAYLOAD_MESSAGE, INTERNAL_SERVER_ERROR } from "../utils/constants.js";
//#endregion ----------- IMPORTS -----------

// Obtener todos los proveedores
export const getAllProvidersController = async (req, res) => {
	try {
		const providers = await findAllProviders();
		return res.json(providers);
	} catch (error) {
		console.error("Error al obtener proveedores:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

// Obtener proveedor por ID
export const getProviderByIdController = async (req, res) => {
	const { id } = req.params;
	try {
		const provider = await findProvider({ _id: id });
		if (!provider) {
			return res.status(404).json({
				message: INVALID_PAYLOAD_MESSAGE,
			});
		}
		return res.json(provider);
	} catch (error) {
		console.error("Error al obtener proveedor:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

//#region ----------- ADMIN CONTROLLERS -----------
// Crear proveedor
export const createProviderController = async (req, res) => {
	const { nombre } = req.body;
	// Validar que no exista un proveedor con ese nombre
	const count = await countProviders({ nombre });
	if (count > 0) {
		return res.status(403).json({
			message: INVALID_PAYLOAD_MESSAGE,
		});
	}
	try {
		const newProvider = await saveProvider(nombre);
		return res.status(201).json(newProvider);
	} catch (error) {
		console.error("Error al crear proveedor:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

// Actualizar proveedor
export const updateProviderController = async (req, res) => {
	const { id } = req.params;
	const { nombre } = req.body;
	try {
		const updatedProvider = await updateProvider(id, nombre);
		if (!updatedProvider) {
			return res.status(404).json({
				message: INVALID_PAYLOAD_MESSAGE,
			});
		}
		return res.json(updatedProvider);
	} catch (error) {
		console.error("Error al actualizar proveedor:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

// Eliminar proveedor
export const deleteProviderController = async (req, res) => {
	const { id } = req.params;
	try {
		const deletedProvider = await deleteProvider(id);
		if (!deletedProvider) {
			return res.status(404).json({
				message: INVALID_PAYLOAD_MESSAGE,
			});
		}
		return res.json({ message: "Proveedor eliminado correctamente" });
	} catch (error) {
		console.error("Error al eliminar proveedor:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};
//#endregion ----------- ADMIN CONTROLLERS -----------
