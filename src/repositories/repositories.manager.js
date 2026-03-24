import { createRepositoryAdapter } from "./adapters/index.js";

/**
 * RepositoryManager - Gestiona el acceso a los repositorios a través del adaptador seleccionado
 * Actúa como intermediario entre los servicios/controladores y el adaptador de base de datos
 */
class RepositoryManager {
	#type;
	#debug;

	/**
	 * Crea una instancia del RepositoryManager
	 * @param {string|null} type - Tipo de adaptador a usar ('mongoose', etc.)
	 * @param {boolean|null} debug - Activar modo debug
	 */
	constructor(type = null, debug = null) {
		this.#type = type || process.env.STORAGE_TYPE || "mongoose";
		this.#debug = debug !== null ? debug : process.env.DB_DEBUG === "true";

		try {
			if (this.#debug) {
				console.log(`[RepositoryManager] Initializing ${this.#type.toUpperCase()} adapter...`);
			}

			this.adapter = createRepositoryAdapter(this.#type);

			// Solo logueo cuando la conexión termine
			this.adapter.then(() => {
				if (this.#debug) {
					console.log(`[RepositoryManager] ${this.#type.toUpperCase()} adapter initialized successfully`);
				}
			});
		} catch (error) {
			console.error(`[RepositoryManager] Failed to initialize ${this.#type} adapter:`, error.message);
			throw error;
		}
	}

	//* Acá a los métodos les añadí debug también

	// ========== USER METHODS ==========

	/**
	 * Busca un usuario por filtro
	 * @param {Object} filter - Filtro de búsqueda (ej: { email: 'test@example.com' })
	 * @returns {Promise<Object|null>} Usuario encontrado o null
	 */
	async findUser(filter) {
		if (this.#debug) {
			console.log(`[Repository] Finding user with filter:`, filter);
		}
		return (await this.adapter).findUser(filter);
	}

	/**
	 * Cuenta usuarios que coincidan con el filtro
	 * @param {Object} filter - Filtro de búsqueda
	 * @returns {Promise<number>} Cantidad de usuarios
	 */
	async countUsers(filter) {
		if (this.#debug) {
			console.log(`[Repository] Counting users with filter:`, filter);
		}
		return (await this.adapter).countUsers(filter);
	}

	/**
	 * Guarda un nuevo usuario
	 * @param {string} username - Nombre de usuario
	 * @param {string} email - Email del usuario
	 * @param {string} password - Contraseña del usuario
	 * @returns {Promise<Object>} Usuario creado
	 */
	async saveUser(username, email, password) {
		if (this.#debug) {
			console.log(`[Repository] Saving new user: ${username} (${email})`);
		}
		return (await this.adapter).saveUser(username, email, password);
	}

	/**
	 * Popula los proveedores de un usuario ya obtenido
	 * @param {Object} user - Objeto de usuario
	 * @returns {Promise<Object|null>} Usuario con proveedores populados
	 */
	async populateUserProviders(user) {
		if (this.#debug) {
			console.log(`[Repository] Populating providers for user: ${user._id}`);
		}
		return (await this.adapter).populateUserProviders(user);
	}

	/**
	 * Agrega un proveedor a la lista del usuario
	 * @param {string} providerId - ID del proveedor
	 * @param {string} userId - ID del usuario
	 * @returns {Promise<boolean|null>} true si se agregó, false si ya existía, null si no se encontró el usuario
	 */
	async addProviderToUser(providerId, userId) {
		if (this.#debug) {
			console.log(`[Repository] Adding provider ${providerId} to user ${userId}`);
		}
		return (await this.adapter).addProviderToUser(providerId, userId);
	}

	/**
	 * Remueve un proveedor de la lista del usuario
	 * @param {string} userId - ID del usuario
	 * @param {string} providerId - ID del proveedor
	 * @returns {Promise<boolean|null>} true si se removió, false si no existía, null si no se encontró el usuario
	 */
	async removeProviderFromUser(userId, providerId) {
		if (this.#debug) {
			console.log(`[Repository] Removing provider ${providerId} from user ${userId}`);
		}
		return (await this.adapter).removeProviderFromUser(userId, providerId);
	}

	/**
	 * Popula la watchlist de un usuario ya obtenido
	 * @param {Object} user - Objeto de usuario
	 * @returns {Promise<Object|null>} Usuario con watchlist populada
	 */
	async populateUserWatchlist(user) {
		if (this.#debug) {
			console.log(`[Repository] Populating watchlist for user: ${user._id}`);
		}
		return (await this.adapter).populateUserWatchlist(user);
	}

	/**
	 * Agrega una película a la watchlist del usuario
	 * @param {string} userId - ID del usuario
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<boolean|null>} true si se agregó, false si ya existía, null si no se encontró el usuario
	 */
	async addMovieToWatchlist(userId, movieId) {
		if (this.#debug) {
			console.log(`[Repository] Adding movie ${movieId} to watchlist of user ${userId}`);
		}
		return (await this.adapter).addMovieToWatchlist(userId, movieId);
	}

	/**
	 * Remueve una película de la watchlist del usuario
	 * @param {string} userId - ID del usuario
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<boolean|null>} true si se removió, false si no existía, null si no se encontró el usuario
	 */
	async removeMovieFromWatchlist(userId, movieId) {
		if (this.#debug) {
			console.log(`[Repository] Removing movie ${movieId} from watchlist of user ${userId}`);
		}
		return (await this.adapter).removeMovieFromWatchlist(userId, movieId);
	}

	/**
	 * Actualiza la imagen de perfil del usuario
	 * @param {string} userId - ID del usuario
	 * @param {string} imageUrl - URL de la nueva imagen de perfil
	 * @returns {Promise<Object|null>} Usuario actualizado o null si no existe
	 */
	async updateUserProfileImage(userId, imageUrl) {
		if (this.#debug) {
			console.log(`[Repository] Updating profile image for user ${userId}: ${imageUrl}`);
		}
		return (await this.adapter).updateUserProfileImage(userId, imageUrl);
	}

	// ========== PROVIDER METHODS ==========

	/**
	 * Busca un proveedor por filtro
	 * @param {Object} filter - Filtro de búsqueda (ej: { _id: '123' })
	 * @returns {Promise<Object|null>} Proveedor encontrado o null
	 */
	async findProvider(filter) {
		if (this.#debug) {
			console.log(`[Repository] Finding provider with filter:`, filter);
		}
		return (await this.adapter).findProvider(filter);
	}

	/**
	 * Busca todos los proveedores
	 * @returns {Promise<Array>} Lista de proveedores
	 */
	async findAllProviders() {
		if (this.#debug) {
			console.log(`[Repository] Finding all providers`);
		}
		return (await this.adapter).findAllProviders();
	}

	/**
	 * Cuenta proveedores que coincidan con el filtro
	 * @param {Object} filter - Filtro de búsqueda
	 * @returns {Promise<number>} Cantidad de proveedores
	 */
	async countProviders(filter) {
		if (this.#debug) {
			console.log(`[Repository] Counting providers with filter:`, filter);
		}
		return (await this.adapter).countProviders(filter);
	}

	/**
	 * Guarda un nuevo proveedor
	 * @param {Object} data - Datos del proveedor (nombre, logo, etc.)
	 * @returns {Promise<Object>} Proveedor creado
	 */
	async saveProvider(data) {
		if (this.#debug) {
			console.log(`[Repository] Saving new provider:`, data);
		}
		return (await this.adapter).saveProvider(data);
	}

	/**
	 * Actualiza un proveedor
	 * @param {string} id - ID del proveedor
	 * @param {Object} data - Datos a actualizar (nombre, logo, etc.)
	 * @returns {Promise<Object|null>} Proveedor actualizado o null
	 */
	async updateProvider(id, data) {
		if (this.#debug) {
			console.log(`[Repository] Updating provider ${id} with data:`, data);
		}
		return (await this.adapter).updateProvider(id, data);
	}

	/**
	 * Elimina un proveedor
	 * @param {string} id - ID del proveedor
	 * @returns {Promise<Object|null>} Proveedor eliminado o null
	 */
	async deleteProvider(id) {
		if (this.#debug) {
			console.log(`[Repository] Deleting provider: ${id}`);
		}
		return (await this.adapter).deleteProvider(id);
	}

	// ========== MOVIE METHODS ==========

	/**
	 * Busca películas con filtros y paginación
	 * @param {Object} filters - Filtros de búsqueda (opcional)
	 * @param {number} [page=1] - Número de página para la paginación
	 * @param {number} [limit=10] - Cantidad de resultados por página
	 * @returns {Promise<Object>} Objeto con las películas, total, página y límite
	 */
	async findMovies(filters = {}, page = 1, limit = 10) {
		if (this.#debug) {
			console.log(`[Repository] Finding movies with filters:`, filters, `Page: ${page}, Limit: ${limit}`);
		}
		return (await this.adapter).findMovies(filters, page, limit);
	}

	/**
	 * Busca una película por filtro
	 * @param {Object} filter - Filtro de búsqueda (ej: { tmdbId: 123 })
	 * @returns {Promise<Object|null>} Película encontrada o null
	 */
	async findMovie(filter) {
		if (this.#debug) {
			console.log(`[Repository] Finding movie with filter:`, filter);
		}
		return (await this.adapter).findMovie(filter);
	}

	/**
	 * Guarda una nueva película
	 * @param {Object} movieData - Datos de la película
	 * @returns {Promise<Object>} Película creada
	 */
	async saveMovie(movieData) {
		if (this.#debug) {
			console.log(`[Repository] Saving new movie:`, movieData.title || movieData.tmdbId);
		}
		return (await this.adapter).saveMovie(movieData);
	}

	// ========== REVIEW METHODS ==========

	/**
	 * Crea una nueva reseña
	 * @param {string} userId - ID del usuario
	 * @param {string} movieId - ID de la película
	 * @param {number} rating - Puntuación (1-10)
	 * @param {string} comment - Comentario opcional
	 * @returns {Promise<Object>} Reseña creada
	 */
	async saveReview(userId, movieId, rating, comment) {
		if (this.#debug) {
			console.log(`[Repository] Saving review: user ${userId}, movie ${movieId}, rating ${rating}`);
		}
		return (await this.adapter).saveReview(userId, movieId, rating, comment);
	}

	/**
	 * Busca una reseña por filtro
	 * @param {Object} filter - Filtro de búsqueda
	 * @returns {Promise<Object|null>} Reseña encontrada o null
	 */
	async findReview(filter) {
		if (this.#debug) {
			console.log(`[Repository] Finding review with filter:`, filter);
		}
		return (await this.adapter).findReview(filter);
	}

	/**
	 * Busca todas las reseñas de una película
	 * @param {string} movieId - ID de la película
	 * @param {number} [page=1] - Número de página para la paginación
	 * @param {number} [limit=10] - Cantidad de resultados por página
	 * @returns {Promise<Array>} Lista de reseñas
	 */
	async findReviewsByMovie(movieId, page = 1, limit = 10) {
		if (this.#debug) {
			console.log(`[Repository] Finding reviews for movie: ${movieId}`, `Page: ${page}, Limit: ${limit}`);
		}
		return (await this.adapter).findReviewsByMovie(movieId, page, limit);
	}

	/**
	 * Cuenta la cantidad total de reseñas de una película
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<number>} Cantidad total de reseñas
	 */
	async countReviewsByMovie(movieId) {
		if (this.#debug) {
			console.log(`[Repository] Counting reviews for movie: ${movieId}`);
		}
		return (await this.adapter).countReviewsByMovie(movieId);
	}

	/**
	 * Busca todas las reseñas de un usuario
	 * @param {string} userId - ID del usuario
	 * @returns {Promise<Array>} Lista de reseñas
	 */
	async findReviewsByUser(userId) {
		if (this.#debug) {
			console.log(`[Repository] Finding reviews by user: ${userId}`);
		}
		return (await this.adapter).findReviewsByUser(userId);
	}

	/**
	 * Actualiza una reseña
	 * @param {string} reviewId - ID de la reseña
	 * @param {number} rating - Nueva puntuación
	 * @param {string} comment - Nuevo comentario
	 * @returns {Promise<Object|null>} Reseña actualizada o null
	 */
	async updateReview(reviewId, rating, comment) {
		if (this.#debug) {
			console.log(`[Repository] Updating review ${reviewId}: rating ${rating}`);
		}
		return (await this.adapter).updateReview(reviewId, rating, comment);
	}

	/**
	 * Elimina una reseña
	 * @param {string} reviewId - ID de la reseña
	 * @returns {Promise<Object|null>} Reseña eliminada o null
	 */
	async deleteReview(reviewId) {
		if (this.#debug) {
			console.log(`[Repository] Deleting review: ${reviewId}`);
		}
		return (await this.adapter).deleteReview(reviewId);
	}

	/**
	 * Obtiene estadísticas de una película
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<Object>} Objeto con averageRating y totalReviews
	 */
	async getAverageRating(movieId) {
		if (this.#debug) {
			console.log(`[Repository] Getting average rating for movie: ${movieId}`);
		}
		return (await this.adapter).getAverageRating(movieId);
	}

	// ========== AVAILABILITY METHODS ==========

	/**
	 * Registra disponibilidad de una película en un servicio
	 * @param {string} userId - ID del usuario
	 * @param {string} movieId - ID de la película
	 * @param {string} providerId - ID del proveedor
	 * @returns {Promise<Object>} Registro creado
	 */
	async saveAvailability(userId, movieId, providerId) {
		if (this.#debug) {
			console.log(`[Repository] Saving availability: user ${userId}, movie ${movieId}, provider ${providerId}`);
		}
		return (await this.adapter).saveAvailability(userId, movieId, providerId);
	}

	/**
	 * Obtiene estadísticas de disponibilidad de una película
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<Array>} Estadísticas de disponibilidad
	 */
	async getMovieAvailabilityStats(movieId) {
		if (this.#debug) {
			console.log(`[Repository] Getting availability stats for movie: ${movieId}`);
		}
		return (await this.adapter).getMovieAvailabilityStats(movieId);
	}

	/**
	 * Verifica si existe un reporte de disponibilidad
	 * @param {string} userId - ID del usuario
	 * @param {string} movieId - ID de la película
	 * @param {string} providerId - ID del proveedor
	 * @returns {Promise<boolean>}
	 */
	async availabilityExists(userId, movieId, providerId) {
		if (this.#debug) {
			console.log(`[Repository] Checking availability: user ${userId}, movie ${movieId}, provider ${providerId}`);
		}
		return (await this.adapter).availabilityExists(userId, movieId, providerId);
	}

	/**
	 * Obtiene disponibilidad personalizada según los servicios del usuario
	 * @param {string} movieId - ID de la película
	 * @param {Array} userProviders - Proveedores del usuario
	 * @returns {Promise<Object>} Disponibilidad separada
	 */
	async getPersonalizedAvailability(movieId, userProviders) {
		if (this.#debug) {
			console.log(`[Repository] Getting personalized availability for movie: ${movieId}`);
		}
		return (await this.adapter).getPersonalizedAvailability(movieId, userProviders);
	}

	// ========== UTILITY METHODS ==========

	getType() {
		return this.#type;
	}

	isDebugEnabled() {
		return this.#debug;
	}
}

export default RepositoryManager;

