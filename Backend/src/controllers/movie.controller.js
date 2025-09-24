//#region  ----------- IMPORTS -----------
// Importo las funciones del repositorio
import { findAllMovies } from "../repositories/movie.repository.js";

// Importo constantes
import { INTERNAL_SERVER_ERROR } from "../utils/constants.js";
//#endregion --------- IMPORTS -----------

export const getMoviesController = async (req, res) => {
	try {
		const { title } = req.query;
		const filter = {};
		if (title) {
			filter.title = { $regex: title, $options: "i" }; // Búsqueda insensible a mayúsculas
		}
		const movies = await findAllMovies(filter);
		res.status(200).json(movies);
	} catch (error) {
		console.error("Error al obtener películas:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};
