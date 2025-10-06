//#region  ----------- IMPORTS -----------
// Importo el factory de repositorios
import repoFactory from "../repositories/repositories.service.js";

// Importo constantes
import { INTERNAL_SERVER_ERROR } from "../utils/constants.js";
//#endregion --------- IMPORTS -----------

/**
 * Obtiene películas con filtros opcionales
 * GET /movies
 * @param {Object} req - Request de Express
 * @param {Object} req.query - Query parameters
 * @param {string} [req.query.title] - Título de la película para búsqueda (opcional, case-insensitive)
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con array de películas
 */
export const getMoviesController = async (req, res) => {
	try {
		const { title } = req.query;
		const filter = {};

		// Si hay título, agrego búsqueda insensible a mayúsculas
		if (title) {
			filter.title = { $regex: title, $options: "i" };
		}

		const movies = await repoFactory.findAllMovies(filter);
		res.status(200).json(movies);
	} catch (error) {
		console.error("Error al obtener películas:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};
