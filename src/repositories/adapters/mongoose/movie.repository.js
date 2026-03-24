//#region  ----------- IMPORTS -----------
// Importamos el modelo de película
import Movie from "./models/movie.model.js";
//#endregion  ----------- IMPORTS -----------

/**
 * Busca una película por filtro
 * @param {Object} filter - Filtro de búsqueda (ej: { tmdbId: 123 })
 * @returns {Promise<Object|null>} Película encontrada o null
 */
export const findMovie = async (filter) => {
	return await Movie.findOne(filter).select("-__v -createdAt -updatedAt");
};

/**
 * Busca películas con filtros y paginación
 * @param {Object} [filters={}] - Filtros de búsqueda (opcional)
 * @param {number} [page=1] - Número de página para la paginación
 * @param {number} [limit=10] - Cantidad de resultados por página
 * @returns {Promise<Object>} Objeto con las películas, total, página y límite
 */
export const findMovies = async (filters = {}, page = 1, limit = 10) => {
	// Ejecuto la consulta con filtros y paginación
	const movies = await Movie.find(filters)
		.skip((page - 1) * limit) // Salto resultados para paginación
		.limit(limit) // Limito la cantidad de resultados
		.select("-__v -createdAt -updatedAt");

	// Contar el total de resultados
	const total = await Movie.countDocuments(filters);

	return { movies, total, page, limit };
};

// Guardar una película
export const saveMovie = async (movieData) => {
	const movie = new Movie(movieData);
	return await movie.save();
};

