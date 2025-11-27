import CacheManager from "./cache.manager.js";

/**
 * CacheService - Servicio singleton de cache
 * Responsable de:
 * - Proporcionar una interfaz única para toda la aplicación
 * - Manejar la instancia singleton del CacheManager
 * - Simplificar la API de cache para los controladores
 */
class CacheService {
	constructor() {
		this.cacheManager = null;
	}
	getInstance() {
		if (!this.cacheManager) {
			this.cacheManager = new CacheManager();
		}
		return this.cacheManager;
	}

	async get(key) {
		try {
			return await this.getInstance().getItem(key);
		} catch (error) {
			if (this.isDebugEnabled()) {
				console.error(`[CacheService] Error getting key ${key}:`, error.message);
			}
			return null; // Fallar silenciosamente, devolver null como si no existiera
		}
	}

	async set(key, value, ttl = 300) {
		try {
			return await this.getInstance().setItem(key, value, ttl);
		} catch (error) {
			if (this.isDebugEnabled()) {
				console.error(`[CacheService] Error setting key ${key}:`, error.message);
			}
			return false; // Fallar silenciosamente
		}
	}

	async delete(key) {
		try {
			return await this.getInstance().del(key);
		} catch (error) {
			if (this.isDebugEnabled()) {
				console.error(`[CacheService] Error deleting key ${key}:`, error.message);
			}
			return false; // Fallar silenciosamente
		}
	}

	// AGREGADO
	async deleteByPattern(pattern) {
		try {
			return await this.getInstance().deleteByPattern(pattern);
		} catch (error) {
			if (this.isDebugEnabled()) {
				console.error(`[CacheService] Error deleting by pattern ${pattern}:`, error.message);
			}
			return false;
		}
	}

	getType() {
		return this.getInstance().getType();
	}

	isDebugEnabled() {
		return this.getInstance().isDebugEnabled();
	}

	async invalidateMultiple(keys) {
		const promises = keys.map((key) => this.delete(key));
		return await Promise.all(promises);
	}

	generateKey(prefix, ...parts) {
		return `${prefix}:${parts.join(":")}`;
	}
}

const cacheService = new CacheService();
export default cacheService;

