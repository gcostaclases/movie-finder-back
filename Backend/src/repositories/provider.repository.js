//#region  ----------- IMPORTS -----------
// Importamos el modelo de proveedor
import Provider from "../models/provider.model.js";

// Importo el cliente de Redis
import getRedisClient from "../services/redis.client.js";
//#endregion ----------- IMPORTS -----------

// Inicializo el cliente de Redis
const redisClient = getRedisClient();

// Buscar un proveedor
export const findProvider = async (filter) => {
	let cacheKey = null;

	// Si buscan por ID
	if (filter._id) {
		cacheKey = `provider:id:${filter._id}`;
	}
	// Si buscan por nombre
	else if (filter.nombre) {
		cacheKey = `provider:nombre:${filter.nombre}`;
	}

	// Si tengo una clave de caché válida, intento buscar en Redis
	if (cacheKey) {
		const cachedProvider = await redisClient.get(cacheKey);

		if (cachedProvider) {
			console.log("Proveedor obtenido desde Redis");
			return cachedProvider; // Acá no tengo que hacer JSON.parse porque Redis ya deserializa automáticamente
		}
	}

	// Si no está en Redis, busco en MongoDB
	console.log("Proveedor obtenido desde MongoDB");
	const provider = await Provider.findOne(filter).select("-createdAt -updatedAt -__v"); // Le quito los campos que no quiero que se vean en el listado;

	// Guardo en Redis solo si: 1) MongoDB encontró el proveedor (provider existe)
	// Y 2) Tengo una clave válida para guardarlo (cacheKey no es null, o sea, buscaron por ID o nombre)
	if (provider && cacheKey) {
		await redisClient.set(cacheKey, JSON.stringify(provider));
	}

	return provider;
};

// Buscar todos los proveedores
export const findAllProviders = async () => {
	const cacheKey = "providers:all";

	// Intento obtener desde Redis
	const cachedProviders = await redisClient.get(cacheKey);

	if (cachedProviders) {
		console.log("Lista de proveedores obtenida desde Redis");
		return cachedProviders; // Acá no tengo que hacer JSON.parse porque Redis ya deserializa automáticamente
	}

	// Si no está en Redis, busco en MongoDB
	console.log("Lista de proveedores obtenida desde MongoDB");
	const providers = await Provider.find().select("-createdAt -updatedAt -__v"); // Le quito los campos que no quiero que se vean en el listado

	// Guardo en Redis solo si hay datos
	if (providers && providers.length > 0) {
		await redisClient.set(cacheKey, JSON.stringify(providers));
	}

	return providers;
};

// Contar proveedores por filtro (para validar duplicados)
export const countProviders = async (filter) => {
	return await Provider.countDocuments(filter);
};

// Crear proveedor
export const saveProvider = async (nombre) => {
	// Invalido el caché de la lista completa ANTES de guardar
	await redisClient.del("providers:all");
	console.log("Caché invalidado: providers:all");

	const newProvider = new Provider({ nombre });
	return await newProvider.save();
};

// Actualizar proveedor
export const updateProvider = async (id, nombre) => {
	// Invalido los cachés relacionados ANTES de actualizar
	await redisClient.del(`provider:id:${id}`);
	await redisClient.del("providers:all");
	console.log(`Caché invalidado: provider:id:${id} y providers:all`);

	// { new: true, runValidators: true }
	// new: true -> para que me devuelva el objeto actualizado y no el antiguo
	// runValidators: true -> para que corra las validaciones del schema al actualizar y no solo al crear
	return await Provider.findByIdAndUpdate(id, { nombre }, { new: true, runValidators: true });
};

// Eliminar proveedor
export const deleteProvider = async (id) => {
	// Obtengo el proveedor antes de eliminarlo para saber su nombre
	const provider = await Provider.findById(id);

	if (provider) {
		// Invalido los cachés relacionados ANTES de eliminar
		await redisClient.del(`provider:id:${id}`);
		await redisClient.del(`provider:nombre:${provider.nombre}`);
		await redisClient.del("providers:all");
		console.log(`Caché invalidado: provider:id:${id}, provider:nombre:${provider.nombre} y providers:all`);
	}

	return await Provider.findByIdAndDelete(id);
};

