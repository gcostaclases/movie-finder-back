//#region  ----------- IMPORTS -----------
// Importo el factory de repositorios
import repoFactory from "../repositories/repositories.service.js";

// Importo el servicio de cache
import cacheService from "../services/cache/index.js";

// Importo constantes
import { INTERNAL_SERVER_ERROR } from "../utils/constants.js";
//#endregion --------- IMPORTS -----------

/**
 * Obtiene todas las películas con paginación y rating promedio
 * GET /movies?page=1&limit=10
 *
 * OPTIMIZACIÓN: Uso de Promise.all() para cálculo paralelo de ratings
 *
 * En lugar de calcular el rating de cada película secuencialmente:
 * - Secuencial: Película 1 → espera → Película 2 → espera → Película 3... (lento)
 * - Paralelo: Películas 1, 2, 3, 4... todas a la vez (rápido)
 *
 * Ejemplo con 10 películas:
 * - Sin Promise.all: 10 queries × 100ms = 1000ms (1 segundo)
 * - Con Promise.all: 10 queries en paralelo = 100ms (10 veces más rápido)
 *
 * @param {Object} req - Request de Express
 * @param {Object} req.query - Query parameters
 * @param {number} [req.query.page=1] - Número de página
 * @param {number} [req.query.limit=10] - Cantidad de resultados por página
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con películas paginadas incluyendo averageRating
 */
export const getAllMoviesController = async (req, res) => {
	try {
		const { page, limit } = req.query;
		const cacheKey = `movies:page:${page}:limit:${limit}`;

		// Intento obtener del cache
		let result = await cacheService.get(cacheKey);
		if (!result) {
			// Si no está en cache, consulto la base de datos
			// Llamo al repositorio sin filtros, solo con paginación
			result = await repoFactory.findMovies({}, parseInt(page, 10) || 1, parseInt(limit, 10) || 10);

			// Guardo en cache por 10 minutos
			await cacheService.set(cacheKey, result, 600);
		}

		// Agrego rating promedio a cada película
		// Promise.all ejecuta todas las queries de rating EN PARALELO
		// En lugar de esperar a que termine una para empezar la siguiente,
		// todas se ejecutan simultáneamente, reduciendo el tiempo de respuesta
		const moviesWithRatings = await Promise.all(
			result.movies.map(async (movie) => {
				const stats = await repoFactory.getAverageRating(movie._id);

				// movie.toObject() - Convierte el documento Mongoose a objeto plano
				// Si el método (typeof movie.toObject === "function") no existe, significa que el objeto proviene del cache y ya es un objeto plano, por lo que uso movie directamente.
				const movieData = typeof movie.toObject === "function" ? movie.toObject() : movie;

				return {
					...movieData,
					averageRating: Math.round(stats.averageRating * 10) / 10, // Redondeo a 1 decimal (ej: 8.5)
					totalReviews: stats.totalReviews,
				};
			})
		);

		res.status(200).json({
			movies: moviesWithRatings,
			total: result.total,
			page: result.page,
			limit: result.limit,
		});
	} catch (error) {
		console.error("Error al obtener todas las películas:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Busca películas con filtros combinados, paginación y rating promedio
 * GET /movies/search?title=Superman&genre=Acción&page=1&limit=10
 *
 * @param {Object} req - Request de Express
 * @param {Object} req.query - Query parameters
 * @param {string} [req.query.title] - Filtro por título (búsqueda parcial case-insensitive)
 * @param {string} [req.query.actor] - Filtro por nombre de actor
 * @param {string} [req.query.genre] - Filtro por género
 * @param {string} [req.query.language] - Filtro por idioma original
 * @param {number} [req.query.year] - Filtro por año de estreno
 * @param {number} [req.query.page=1] - Número de página
 * @param {number} [req.query.limit=10] - Cantidad de resultados por página
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con películas filtradas incluyendo averageRating
 */
export const searchMoviesController = async (req, res) => {
	try {
		const { title, actor, genre, language, year, page, limit } = req.query;

		// Construir los filtros dinámicamente
		const filters = {};

		if (title) {
			filters.title = { $regex: title, $options: "i" }; // Búsqueda parcial (case-insensitive)
		}

		if (actor) {
			filters["actors.name"] = { $regex: actor, $options: "i" }; // Buscar por nombre de actor
		}

		if (genre) {
			filters["genres.name"] = { $regex: genre, $options: "i" }; // ✅ Buscar por el campo name dentro de cada objeto del array genres
		}

		if (language) {
			filters.originalLanguage = language; // Buscar por idioma original
		}

		if (year) {
			const yearInt = parseInt(year, 10);
			filters.releaseDate = {
				$gte: new Date(`${yearInt}-01-01`),
				$lte: new Date(`${yearInt}-12-31`),
			}; // Buscar por año de estreno
		}

		// Llamar al repositorio con los filtros y opciones de paginación
		const result = await repoFactory.findMovies(filters, parseInt(page, 10) || 1, parseInt(limit, 10) || 10);

		// Agregar rating promedio a cada película
		// Promise.all ejecuta todas las queries de rating EN PARALELO
		// En lugar de esperar a que termine una para empezar la siguiente,
		// todas se ejecutan simultáneamente, reduciendo el tiempo de respuesta
		const moviesWithRatings = await Promise.all(
			result.movies.map(async (movie) => {
				const stats = await repoFactory.getAverageRating(movie._id);
				return {
					...movie.toObject(),
					averageRating: Math.round(stats.averageRating * 10) / 10, // Redondeo a 1 decimal (ej: 8.5)
					totalReviews: stats.totalReviews,
				};
			})
		);

		res.status(200).json({
			movies: moviesWithRatings,
			total: result.total,
			page: result.page,
			limit: result.limit,
		});
	} catch (error) {
		console.error("Error al buscar películas:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Obtiene una película por su ID con estadísticas de disponibilidad y reviews
 *
 * Este método utiliza cache para optimizar la carga de datos:
 * - Cachea los datos de la película por separado.
 * - Cachea las estadísticas de reviews (averageRating y totalReviews).
 * - Cachea las estadísticas de disponibilidad.
 *
 * @param {Object} req - Request de Express
 * @param {Object} req.params - Parámetros de la ruta
 * @param {string} req.params.id - ID de la película
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con la película, availability y stats de reviews
 *
 * @example
 * GET /movies/68d30243f5be4f51a4c4a9d3
 * Response:
 * {
 *   "_id": "68d30243f5be4f51a4c4a9d3",
 *   "title": "Superman",
 *   "availability": {
 *     "Netflix": 65,
 *     "Disney+": 35
 *   },
 *   "reviewStats": {
 *     "averageRating": 8.5,
 *     "totalReviews": 127
 *   }
 * }
 */
export const getMovieByIdController = async (req, res) => {
	try {
		const { id } = req.params;

		// Cache keys
		const movieCacheKey = `movie:${id}`;
		const ratingCacheKey = `movie:${id}:rating`;
		const availabilityCacheKey = `movie:${id}:availability`;

		// Intento obtener la película del cache
		let movie = await cacheService.get(movieCacheKey);
		if (!movie) {
			// Si no está en cache, la busco en la base de datos por su ID
			movie = await repoFactory.findMovie({ _id: id });
			if (!movie) {
				return res.status(404).json({ message: "Película no encontrada" });
			}
			// Guardo en cache por 1 hora (3600 segundos)
			await cacheService.set(movieCacheKey, movie, 3600);
		}

		// Intento obtener las estadísticas de reviews del cache
		let reviewStats = await cacheService.get(ratingCacheKey);
		if (!reviewStats) {
			// Si no está en cache, calculo las estadísticas
			reviewStats = await repoFactory.getAverageRating(id);
			// Guardo en cache por 5 minutos (300 segundos)
			await cacheService.set(ratingCacheKey, reviewStats, 300);
		}

		// Intento obtener las estadísticas de disponibilidad del cache
		let availability = await cacheService.get(availabilityCacheKey);
		if (!availability) {
			// Si no está en cache, calculo las estadísticas
			availability = await repoFactory.getMovieAvailabilityStats(id);
			// Guardo en cache por 10 minutos (600 segundos)
			await cacheService.set(availabilityCacheKey, availability, 600);
		}

		// movie.toObject() - Convierte el documento Mongoose a objeto plano
		// Si el método (typeof movie.toObject === "function") no existe, significa que el objeto proviene del cache y ya es un objeto plano, por lo que uso movie directamente.
		const movieData = typeof movie.toObject === "function" ? movie.toObject() : movie;

		// Construyo la respuesta completa
		const movieWithStats = {
			...movieData,
			availability,
			reviewStats: {
				averageRating: Math.round(reviewStats.averageRating * 10) / 10, // Redondeo a 1 decimal (ej: 8.5)
				totalReviews: reviewStats.totalReviews,
			},
		};

		res.status(200).json(movieWithStats);
	} catch (error) {
		console.error("Error al obtener la película:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

