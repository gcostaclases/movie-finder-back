import { createRepositoryAdapter } from "./adapters/index.js";

/**
 * RepositoryManager - Gestiona el acceso a los repositorios a través del adaptador seleccionado
 * Actúa como intermediario entre los servicios/controladores y el adaptador de base de datos
 */
class RepositoryManager {
	#type;

	/**
	 * Crea una instancia del RepositoryManager
	 * @param {string|null} type - Tipo de adaptador a usar ('mongoose', etc.)
	 */
	constructor(type = null) {
		this.#type = type || process.env.STORAGE_TYPE || "mongoose";
		try {
			this.adapter = createRepositoryAdapter(this.#type);
		} catch (error) {
			throw error;
		}
	}

	// ========== USER METHODS ==========

	/**
	 * Busca un usuario por filtro
	 * @param {Object} filter - Filtro de búsqueda (ej: { email: 'test@example.com' })
	 * @returns {Promise<Object|null>} Usuario encontrado o null
	 */
	async findUser(filter) {
		return (await this.adapter).findUser(filter);
	}

	/**
	 * Cuenta usuarios que coincidan con el filtro
	 * @param {Object} filter - Filtro de búsqueda
	 * @returns {Promise<number>} Cantidad de usuarios
	 */
	async countUsers(filter) {
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
		return (await this.adapter).saveUser(username, email, password);
	}

	/**
	 * Popula los proveedores de un usuario ya obtenido
	 * @param {Object} user - Objeto de usuario
	 * @returns {Promise<Object|null>} Usuario con proveedores populados
	 */
	async populateUserProviders(user) {
		return (await this.adapter).populateUserProviders(user);
	}

	/**
	 * Agrega un proveedor a la lista del usuario
	 * @param {string} providerId - ID del proveedor
	 * @param {string} userId - ID del usuario
	 * @returns {Promise<boolean|null>} true si se agregó, false si ya existía, null si no se encontró el usuario
	 */
	async addProviderToUser(providerId, userId) {
		return (await this.adapter).addProviderToUser(providerId, userId);
	}

	/**
	 * Remueve un proveedor de la lista del usuario
	 * @param {string} userId - ID del usuario
	 * @param {string} providerId - ID del proveedor
	 * @returns {Promise<boolean|null>} true si se removió, false si no existía, null si no se encontró el usuario
	 */
	async removeProviderFromUser(userId, providerId) {
		return (await this.adapter).removeProviderFromUser(userId, providerId);
	}

	/**
	 * Popula la watchlist de un usuario ya obtenido
	 * @param {Object} user - Objeto de usuario
	 * @returns {Promise<Object|null>} Usuario con watchlist populada
	 */
	async populateUserWatchlist(user) {
		return (await this.adapter).populateUserWatchlist(user);
	}

	/**
	 * Agrega una película a la watchlist del usuario
	 * @param {string} userId - ID del usuario
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<boolean|null>} true si se agregó, false si ya existía, null si no se encontró el usuario
	 */
	async addMovieToWatchlist(userId, movieId) {
		return (await this.adapter).addMovieToWatchlist(userId, movieId);
	}

	/**
	 * Remueve una película de la watchlist del usuario
	 * @param {string} userId - ID del usuario
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<boolean|null>} true si se removió, false si no existía, null si no se encontró el usuario
	 */
	async removeMovieFromWatchlist(userId, movieId) {
		return (await this.adapter).removeMovieFromWatchlist(userId, movieId);
	}

	// ========== PROVIDER METHODS ==========

	/**
	 * Busca un proveedor por filtro
	 * @param {Object} filter - Filtro de búsqueda (ej: { _id: '123' })
	 * @returns {Promise<Object|null>} Proveedor encontrado o null
	 */
	async findProvider(filter) {
		return (await this.adapter).findProvider(filter);
	}

	/**
	 * Busca todos los proveedores
	 * @returns {Promise<Array>} Lista de proveedores
	 */
	async findAllProviders() {
		return (await this.adapter).findAllProviders();
	}

	/**
	 * Cuenta proveedores que coincidan con el filtro
	 * @param {Object} filter - Filtro de búsqueda
	 * @returns {Promise<number>} Cantidad de proveedores
	 */
	async countProviders(filter) {
		return (await this.adapter).countProviders(filter);
	}

	/**
	 * Guarda un nuevo proveedor
	 * @param {string} nombre - Nombre del proveedor
	 * @returns {Promise<Object>} Proveedor creado
	 */
	async saveProvider(nombre) {
		return (await this.adapter).saveProvider(nombre);
	}

	/**
	 * Actualiza un proveedor
	 * @param {string} id - ID del proveedor
	 * @param {string} nombre - Nuevo nombre del proveedor
	 * @returns {Promise<Object|null>} Proveedor actualizado o null
	 */
	async updateProvider(id, nombre) {
		return (await this.adapter).updateProvider(id, nombre);
	}

	/**
	 * Elimina un proveedor
	 * @param {string} id - ID del proveedor
	 * @returns {Promise<Object|null>} Proveedor eliminado o null
	 */
	async deleteProvider(id) {
		return (await this.adapter).deleteProvider(id);
	}

	// ========== MOVIE METHODS ==========

	/**
	 * Busca una película por filtro
	 * @param {Object} filter - Filtro de búsqueda (ej: { tmdbId: 123 })
	 * @returns {Promise<Object|null>} Película encontrada o null
	 */
	async findMovie(filter) {
		return (await this.adapter).findMovie(filter);
	}

	/**
	 * Busca todas las películas que coincidan con el filtro
	 * @param {Object} filter - Filtro de búsqueda (opcional)
	 * @returns {Promise<Array>} Lista de películas
	 */
	async findAllMovies(filter) {
		return (await this.adapter).findAllMovies(filter);
	}

	/**
	 * Guarda una nueva película
	 * @param {Object} movieData - Datos de la película
	 * @returns {Promise<Object>} Película creada
	 */
	async saveMovie(movieData) {
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
		return (await this.adapter).saveReview(userId, movieId, rating, comment);
	}

	/**
	 * Busca una reseña por filtro
	 * @param {Object} filter - Filtro de búsqueda
	 * @returns {Promise<Object|null>} Reseña encontrada o null
	 */
	async findReview(filter) {
		return (await this.adapter).findReview(filter);
	}

	/**
	 * Busca todas las reseñas de una película
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<Array>} Lista de reseñas
	 */
	async findReviewsByMovie(movieId) {
		return (await this.adapter).findReviewsByMovie(movieId);
	}

	/**
	 * Busca todas las reseñas de un usuario
	 * @param {string} userId - ID del usuario
	 * @returns {Promise<Array>} Lista de reseñas
	 */
	async findReviewsByUser(userId) {
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
		return (await this.adapter).updateReview(reviewId, rating, comment);
	}

	/**
	 * Elimina una reseña
	 * @param {string} reviewId - ID de la reseña
	 * @returns {Promise<Object|null>} Reseña eliminada o null
	 */
	async deleteReview(reviewId) {
		return (await this.adapter).deleteReview(reviewId);
	}

	/**
	 * Obtiene estadísticas de una película
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<Object>} Objeto con averageRating y totalReviews
	 */
	async getAverageRating(movieId) {
		return (await this.adapter).getAverageRating(movieId);
	}
}

export default RepositoryManager;
