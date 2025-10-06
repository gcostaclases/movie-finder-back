import createMongooseAdapter from "./mongoose/index.js";

/**
 * Factory para crear adaptadores de repositorio
 * @param {string} type - Tipo de adaptador ('mongoose')
 * @returns {Promise<Object>} Instancia del adaptador con todos los métodos de repositorio
 */
export const createRepositoryAdapter = (type = null) => {
	switch (type.toLowerCase()) {
		case "mongoose":
			return createMongooseAdapter();
		default:
			throw new Error(`Unsupported repository adapter type: ${type}`);
	}
};
