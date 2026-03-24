import RepositoryManager from "./repositories.manager.js";

/**
 * RepositoryFactory - Servicio singleton que proporciona acceso único a los repositorios
 * Implementa el patrón Singleton para asegurar una única instancia del RepositoryManager
 */
class RepositoryFactory {
	#repoManager;

	constructor() {
		this.#repoManager = null;
	}

	/**
	 * Obtiene la instancia única del RepositoryManager
	 * @returns {RepositoryManager} Instancia del RepositoryManager
	 */
	getInstance() {
		if (!this.#repoManager) {
			this.#repoManager = new RepositoryManager();
		}
		return this.#repoManager;
	}

	// ========== USER METHODS ==========

	/**
	 * Busca un usuario por filtro
	 * @param {Object} filter - Filtro de búsqueda
	 * @returns {Promise<Object|null>} Usuario encontrado o null
	 */
	async findUser(filter) {
		return await this.getInstance().findUser(filter);
	}

	/**
	 * Cuenta usuarios que coincidan con el filtro
	 * @param {Object} filter - Filtro de búsqueda
	 * @returns {Promise<number>} Cantidad de usuarios
	 */
	async countUsers(filter) {
		return await this.getInstance().countUsers(filter);
	}

	/**
	 * Guarda un nuevo usuario
	 * @param {string} username - Nombre de usuario
	 * @param {string} email - Email del usuario
	 * @param {string} password - Contraseña del usuario
	 * @returns {Promise<Object>} Usuario creado
	 */
	async saveUser(username, email, password) {
		return await this.getInstance().saveUser(username, email, password);
	}

	/**
	 * Popula los proveedores de un usuario
	 * @param {Object} user - Objeto de usuario
	 * @returns {Promise<Object|null>} Usuario con proveedores populados
	 */
	async populateUserProviders(user) {
		return await this.getInstance().populateUserProviders(user);
	}

	/**
	 * Agrega un proveedor a la lista del usuario
	 * @param {string} providerId - ID del proveedor
	 * @param {string} userId - ID del usuario
	 * @returns {Promise<boolean|null>} true si se agregó, false si ya existía, null si no se encontró
	 */
	async addProviderToUser(providerId, userId) {
		return await this.getInstance().addProviderToUser(providerId, userId);
	}

	/**
	 * Remueve un proveedor de la lista del usuario
	 * @param {string} userId - ID del usuario
	 * @param {string} providerId - ID del proveedor
	 * @returns {Promise<boolean|null>} true si se removió, false si no existía, null si no se encontró
	 */
	async removeProviderFromUser(userId, providerId) {
		return await this.getInstance().removeProviderFromUser(userId, providerId);
	}

	/**
	 * Popula la watchlist de un usuario
	 * @param {Object} user - Objeto de usuario
	 * @returns {Promise<Object|null>} Usuario con watchlist populada
	 */
	async populateUserWatchlist(user) {
		return await this.getInstance().populateUserWatchlist(user);
	}

	/**
	 * Agrega una película a la watchlist del usuario
	 * @param {string} userId - ID del usuario
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<boolean|null>} true si se agregó, false si ya existía, null si no se encontró
	 */
	async addMovieToWatchlist(userId, movieId) {
		return await this.getInstance().addMovieToWatchlist(userId, movieId);
	}

	/**
	 * Remueve una película de la watchlist del usuario
	 * @param {string} userId - ID del usuario
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<boolean|null>} true si se removió, false si no existía, null si no se encontró
	 */
	async removeMovieFromWatchlist(userId, movieId) {
		return await this.getInstance().removeMovieFromWatchlist(userId, movieId);
	}

	/**
	 * Actualiza la imagen de perfil del usuario
	 * @param {string} userId - ID del usuario
	 * @param {string} imageUrl - URL de la nueva imagen de perfil
	 * @returns {Promise<Object|null>} Usuario actualizado o null si no existe
	 */
	async updateUserProfileImage(userId, imageUrl) {
		return await this.getInstance().updateUserProfileImage(userId, imageUrl);
	}

	// ========== PROVIDER METHODS ==========

	/**
	 * Busca un proveedor por filtro
	 * @param {Object} filter - Filtro de búsqueda
	 * @returns {Promise<Object|null>} Proveedor encontrado o null
	 */
	async findProvider(filter) {
		return await this.getInstance().findProvider(filter);
	}

	/**
	 * Busca todos los proveedores
	 * @returns {Promise<Array>} Lista de proveedores
	 */
	async findAllProviders() {
		return await this.getInstance().findAllProviders();
	}

	/**
	 * Cuenta proveedores que coincidan con el filtro
	 * @param {Object} filter - Filtro de búsqueda
	 * @returns {Promise<number>} Cantidad de proveedores
	 */
	async countProviders(filter) {
		return await this.getInstance().countProviders(filter);
	}

	/**
	 * Guarda un nuevo proveedor
	 * @param {Object} data - Datos del proveedor (nombre, logo, etc.)
	 * @returns {Promise<Object>} Proveedor creado
	 */
	async saveProvider(data) {
		return await this.getInstance().saveProvider(data);
	}

	/**
	 * Actualiza un proveedor
	 * @param {string} id - ID del proveedor
	 * @param {Object} data - Datos a actualizar (nombre, logo, etc.)
	 * @returns {Promise<Object|null>} Proveedor actualizado o null
	 */
	async updateProvider(id, data) {
		return await this.getInstance().updateProvider(id, data);
	}

	/**
	 * Elimina un proveedor
	 * @param {string} id - ID del proveedor
	 * @returns {Promise<Object|null>} Proveedor eliminado o null
	 */
	async deleteProvider(id) {
		return await this.getInstance().deleteProvider(id);
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
		return await this.getInstance().findMovies(filters, page, limit);
	}

	/**
	 * Busca una película por filtro
	 * @param {Object} filter - Filtro de búsqueda (ej: { tmdbId: 123 })
	 * @returns {Promise<Object|null>} Película encontrada o null
	 */
	async findMovie(filter) {
		return await this.getInstance().findMovie(filter);
	}

	/**
	 * Guarda una nueva película
	 * @param {Object} movieData - Datos de la película
	 * @returns {Promise<Object>} Película creada
	 */
	async saveMovie(movieData) {
		return await this.getInstance().saveMovie(movieData);
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
		return await this.getInstance().saveReview(userId, movieId, rating, comment);
	}

	/**
	 * Busca una reseña por filtro
	 * @param {Object} filter - Filtro de búsqueda
	 * @returns {Promise<Object|null>} Reseña encontrada o null
	 */
	async findReview(filter) {
		return await this.getInstance().findReview(filter);
	}

	/**
	 * Busca todas las reseñas de una película con paginación
	 * @param {string} movieId - ID de la película
	 * @param {number} [page=1] - Número de página para la paginación
	 * @param {number} [limit=10] - Cantidad de resultados por página
	 * @returns {Promise<Array>} Lista de reseñas
	 */
	async findReviewsByMovie(movieId, page = 1, limit = 10) {
		return await this.getInstance().findReviewsByMovie(movieId, page, limit);
	}

	/**
	 * Cuenta la cantidad total de reseñas de una película
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<number>} Cantidad total de reseñas
	 */
	async countReviewsByMovie(movieId) {
		return await this.getInstance().countReviewsByMovie(movieId);
	}

	/**
	 * Busca todas las reseñas de un usuario
	 * @param {string} userId - ID del usuario
	 * @returns {Promise<Array>} Lista de reseñas
	 */
	async findReviewsByUser(userId) {
		return await this.getInstance().findReviewsByUser(userId);
	}

	/**
	 * Actualiza una reseña
	 * @param {string} reviewId - ID de la reseña
	 * @param {number} rating - Nueva puntuación
	 * @param {string} comment - Nuevo comentario
	 * @returns {Promise<Object|null>} Reseña actualizada o null
	 */
	async updateReview(reviewId, rating, comment) {
		return await this.getInstance().updateReview(reviewId, rating, comment);
	}

	/**
	 * Elimina una reseña
	 * @param {string} reviewId - ID de la reseña
	 * @returns {Promise<Object|null>} Reseña eliminada o null
	 */
	async deleteReview(reviewId) {
		return await this.getInstance().deleteReview(reviewId);
	}

	/**
	 * Obtiene estadísticas de una película
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<Object>} Objeto con averageRating y totalReviews
	 */
	async getAverageRating(movieId) {
		return await this.getInstance().getAverageRating(movieId);
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
		return await this.getInstance().saveAvailability(userId, movieId, providerId);
	}

	/**
	 * Obtiene estadísticas de disponibilidad de una película
	 * @param {string} movieId - ID de la película
	 * @returns {Promise<Array>} Estadísticas de disponibilidad
	 */
	async getMovieAvailabilityStats(movieId) {
		return await this.getInstance().getMovieAvailabilityStats(movieId);
	}

	/**
	 * Verifica si existe un reporte de availability
	 * @param {string} userId - ID del usuario
	 * @param {string} movieId - ID de la película
	 * @param {string} providerId - ID del proveedor
	 * @returns {Promise<boolean>}
	 */
	async availabilityExists(userId, movieId, providerId) {
		return await this.getInstance().availabilityExists(userId, movieId, providerId);
	}

	/**
	 * Obtiene disponibilidad personalizada según los servicios del usuario
	 * @param {string} movieId - ID de la película
	 * @param {Array} userProviders - Proveedores del usuario
	 * @returns {Promise<Object>} Disponibilidad separada
	 */
	async getPersonalizedAvailability(movieId, userProviders) {
		return await this.getInstance().getPersonalizedAvailability(movieId, userProviders);
	}
}

// Exportar instancia singleton
const repoFactory = new RepositoryFactory();
export default repoFactory;

