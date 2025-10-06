/**
 * Cache Adapters - Punto de entrada para todos los adaptadores de cache
 *
 * Cada adaptador implementa la misma interfaz básica:
 * - get(key): Obtener valor
 * - set(key, value, ttl): Establecer valor con TTL opcional
 * - del(key): Eliminar valor
 */

import createInMemoryAdapter from "./in-memory.adapter.js";
import createRedisAdapter from "./redis.adapter.js";

/**
 * Factory para crear adaptadores de cache
 * @param {string} type - Tipo de adaptador ('in-memory' | 'redis')
 * @returns {Object} Instancia del adaptador
 */
export const createCacheAdapter = (type = "in-memory") => {
	switch (type.toLowerCase()) {
		case "in-memory":
		case "memory":
			return createInMemoryAdapter();

		case "redis":
			return createRedisAdapter();

		default:
			throw new Error(`Unsupported cache adapter type: ${type}`);
	}
};

export const getSupportedAdapters = () => {
	return ["in-memory", "memory", "redis"];
};

export { createInMemoryAdapter, createRedisAdapter };
