import { createCacheAdapter } from "./adapters/index.js";

/**
 * CacheManager - Maneja la lógica de cache y la selección de adaptadores
 */
class CacheManager {
	#type;
	#debug;

	constructor(type = null, debug = null) {
		this.#type = type || process.env.CACHE_TYPE || "in-memory";
		this.#debug = debug !== null ? debug : process.env.CACHE_DEBUG === "true";
		this.client = createCacheAdapter(this.#type);

		if (this.#debug) {
			console.log(`Cache initialized: ${this.#type.toUpperCase()}`);
		}
	}

	async getItem(key) {
		if (this.#debug) {
			console.log(`[Reading from Cache]: ${key}`);
		}

		const value = await this.client.get(key);
		if (value === null || value === undefined) {
			return null;
		}

		// Verificamos el tipo de dato recibido
		// Redis devuelve objetos ya deserializados, in-memory devuelve strings
		if (typeof value === "string") {
			try {
				return JSON.parse(value);
			} catch (error) {
				if (this.#debug) {
					console.log(`[Cache] Warning: Could not parse JSON for key ${key}, returning raw value`);
				}
				return value; // Era un string plano, no JSON
			}
		}

		// Si no es string, ya es un objeto (Redis auto-deserializó)
		return value;
	}

	async setItem(key, value, ttl = 300) {
		if (this.#debug) {
			console.log(`[Writing in Cache] key: ${key} - value: ${JSON.stringify(value)}`);
		}

		// Redis serializa automáticamente, in-memory necesita strings
		if (this.#type === "redis") {
			// Pasamos el valor directo, Redis maneja la serialización
			return await this.client.setex(key, ttl, value);
		} else {
			// In-memory necesita valores serializados manualmente
			const serializedValue = JSON.stringify(value);
			return Promise.resolve(this.client.set(key, serializedValue, ttl));
		}
	}

	async del(key) {
		if (this.#debug) {
			console.log(`[Deleting from Cache]: ${key}`);
		}
		return await this.client.del(key);
	}

	getType() {
		return this.#type;
	}

	isDebugEnabled() {
		return this.#debug;
	}
}

export default CacheManager;

