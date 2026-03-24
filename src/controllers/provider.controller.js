//#region  ----------- IMPORTS -----------
// Importo el factory de repositorios (patrón Adapter)
import repoFactory from "../repositories/repositories.service.js";

// Importo el servicio de cache
import cacheService from "../services/cache/index.js";

// Importo Cloudinary para subir/eliminar logos
import cloudinary from "../services/cloudinary.js";

// Importo constantes
import { INTERNAL_SERVER_ERROR } from "../utils/constants.js";
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

		return res.status(200).json(providers);
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

			// Guardo en cache (600 segundos = 10 minutos)
			await cacheService.set(cacheKey, provider, 600);
		}

		return res.status(200).json(provider);
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
 * @param {string} req.body.name - Nombre del proveedor
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con el proveedor creado o error
 */
export const createProviderController = async (req, res) => {
	const { name, logo } = req.body;

	try {
		// Valido que no exista un proveedor con el mismo nombre
		const count = await repoFactory.countProviders({ name });
		if (count > 0) {
			return res.status(400).json({
				message: "El proveedor ya existe",
			});
		}

		let logoUrl = logo || null;

		// Si se subió un archivo, subo el logo a Cloudinary (tiene prioridad sobre el logo del body)
		if (req.file) {
			const result = await new Promise((resolve, reject) => {
				cloudinary.uploader
					.upload_stream({ folder: "provider-logos" }, (error, result) => {
						if (error) {
							reject(new Error("Error al subir el logo a Cloudinary."));
						} else {
							resolve(result);
						}
					})
					.end(req.file.buffer);
			});
			console.log("Logo subido a Cloudinary:", result.secure_url);
			logoUrl = result.secure_url;
		}

		// Creo el proveedor usando el repositorio
		const newProvider = await repoFactory.saveProvider({
			name,
			logo: logoUrl,
		});

		// Invalido el cache después de crear el proveedor
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
	const { name, logo } = req.body;

	try {
		// Busco el proveedor en la base de datos
		const provider = await repoFactory.findProvider({ _id: id });
		if (!provider) {
			return res.status(404).json({ message: "Proveedor no encontrado" });
		}

		let logoUrl = logo !== undefined ? logo : provider.logo;

		// Si se subió un archivo, subo el nuevo logo a Cloudinary (tiene prioridad)
		if (req.file) {
			// Elimino el logo anterior si existe
			if (provider.logo) {
				try {
					const publicId = provider.logo.split("/").slice(-2).join("/").split(".")[0]; // Ejemplo: "provider-logos/imagen"
					await cloudinary.uploader.destroy(publicId);
					console.log(`Logo anterior eliminado: ${publicId}`);
				} catch (error) {
					console.error("Error al eliminar logo anterior en Cloudinary:", error);
				}
			}

			// Subo el nuevo logo
			const result = await new Promise((resolve, reject) => {
				cloudinary.uploader
					.upload_stream({ folder: "provider-logos" }, (error, result) => {
						if (error) {
							reject(new Error("Error al subir el logo a Cloudinary."));
						} else {
							resolve(result);
						}
					})
					.end(req.file.buffer);
			});

			console.log("Nuevo logo subido a Cloudinary:", result.secure_url);
			logoUrl = result.secure_url;
		}

		// Preparo los datos a actualizar
		let updateData = {};
		if (name !== undefined) updateData.name = name;
		if (logoUrl !== undefined) updateData.logo = logoUrl;

		// Actualizo el proveedor usando el repositorio
		const updatedProvider = await repoFactory.updateProvider(id, updateData);

		// Invalido el cache después de actualizar el proveedor
		await cacheService.delete(`provider:id:${id}`);
		await cacheService.delete("providers:all");

		return res.status(200).json(updatedProvider);
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
		const keysToInvalidate = [`provider:id:${id}`, `provider:name:${deletedProvider.name}`, "providers:all"];
		await cacheService.invalidateMultiple(keysToInvalidate);

		return res.status(200).json({
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

