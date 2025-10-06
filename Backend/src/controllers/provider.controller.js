//#region  ----------- IMPORTS -----------
// Importo el factory de repositorios (patrón Adapter)
import repoFactory from "../repositories/index.js";

// Importo el servicio de cache
import cacheService from "../services/cache/index.js";

// Importo constantes
import { INTERNAL_SERVER_ERROR } from "../constants/messages.constants.js";
//#endregion ----------- IMPORTS -----------

/**
 * Obtiene todos los proveedores de streaming
 * GET /providers
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con array de proveedores
 */
export const getAllProvidersController = async (req, res) => {
	// Genero clave de cache consistente
	const cacheKey = "providers:all";

	try {
		// Intento obtener del cache primero
		let providers = await cacheService.get(cacheKey);

		if (!providers) {
			// Si no está en cache, consulto BD
			providers = await repoFactory.findAllProviders();

			// Guardo en cache (300 segundos = 5 minutos)
			if (providers && providers.length > 0) {
				await cacheService.set(cacheKey, providers, 300);
			}
		}

		return res.json(providers);
	} catch (error) {
		console.error("Error al obtener proveedores:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Obtiene un proveedor específico por su ID
 * GET /providers/:id
 * @param {Object} req - Request de Express
 * @param {string} req.params.id - ID del proveedor
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con el proveedor o error 404
 */
export const getProviderByIdController = async (req, res) => {
	const { id } = req.params;
	// Genero clave de cache con el ID
	const cacheKey = `provider:id:${id}`;

	try {
		// Intento obtener del cache primero
		let provider = await cacheService.get(cacheKey);

		if (!provider) {
			// Si no está en cache, consulto BD
			provider = await repoFactory.findProvider({ _id: id });

			if (!provider) {
				return res.status(404).json({
					message: "Proveedor no encontrado",
				});
			}

			// Guardar en cache (600 segundos = 10 minutos)
			await cacheService.set(cacheKey, provider, 600);
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

/**
 * Crea un nuevo proveedor de streaming
 * POST /providers
 * @param {Object} req - Request de Express
 * @param {Object} req.body - Cuerpo de la petición
 * @param {string} req.body.nombre - Nombre del proveedor
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con el proveedor creado o error
 */
export const createProviderController = async (req, res) => {
	const { nombre } = req.body;

	try {
		// Valido que no exista
		const count = await repoFactory.countProviders({ nombre });
		if (count > 0) {
			return res.status(400).json({
				message: "El proveedor ya existe",
			});
		}

		// Creo el proveedor
		const newProvider = await repoFactory.saveProvider(nombre);

		// Invalido cache después de crear
		await cacheService.delete("providers:all");

		return res.status(201).json(newProvider);
	} catch (error) {
		console.error("Error al crear proveedor:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Actualiza un proveedor existente
 * PATCH /providers/:id
 * @param {Object} req - Request de Express
 * @param {string} req.params.id - ID del proveedor
 * @param {Object} req.body - Cuerpo de la petición
 * @param {string} req.body.nombre - Nuevo nombre del proveedor
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con el proveedor actualizado o error 404
 */
export const updateProviderController = async (req, res) => {
	const { id } = req.params;
	const { nombre } = req.body;

	try {
		// Actualizo en BD
		const updatedProvider = await repoFactory.updateProvider(id, nombre);

		if (!updatedProvider) {
			return res.status(404).json({
				message: "Proveedor no encontrado",
			});
		}

		// Invalido caches relacionados después de actualizar
		const keysToInvalidate = [`provider:id:${id}`, "providers:all"];
		await cacheService.invalidateMultiple(keysToInvalidate);

		return res.json(updatedProvider);
	} catch (error) {
		console.error("Error al actualizar proveedor:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Elimina un proveedor de streaming
 * DELETE /providers/:id
 * @param {Object} req - Request de Express
 * @param {string} req.params.id - ID del proveedor
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con mensaje de confirmación o error 404
 */
export const deleteProviderController = async (req, res) => {
	const { id } = req.params;

	try {
		// Elimino de BD
		const deletedProvider = await repoFactory.deleteProvider(id);

		if (!deletedProvider) {
			return res.status(404).json({
				message: "Proveedor no encontrado",
			});
		}

		// Invalido caches relacionados después de eliminar
		const keysToInvalidate = [`provider:id:${id}`, `provider:nombre:${deletedProvider.nombre}`, "providers:all"];
		await cacheService.invalidateMultiple(keysToInvalidate);

		return res.json({
			message: "Proveedor eliminado correctamente",
		});
	} catch (error) {
		console.error("Error al eliminar proveedor:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

//#endregion ----------- ADMIN CONTROLLERS -----------

