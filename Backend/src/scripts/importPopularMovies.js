//#region  ----------- IMPORTS -----------
// Importo y cargo las variables de entorno PRIMERO antes que nada
import "../config/env.js";

// Importo mongoose para poder desconectarme de la base de datos al finalizar
import mongoose from "mongoose";

// Importo la función para traer las películas populares desde TMDB
import { fetchPopularMovies } from "../services/tmdb.js";

// Importo las funciones para guardar y buscar películas del repositorio
import { saveMovie, findMovie } from "../repositories/movie.repository.js";

// Importo la función para conectar a MongoDB
import connectToMongoDB from "../services/mongo.client.js";
//#endregion ----------- IMPORTS -----------

const importPopularMovies = async () => {
	try {
		const movies = await fetchPopularMovies(1); // Solo página 1 (20 pelis)
		let count = 0;

		// Recorro las películas y las guardo en la base de datos si no existen
		for (const tmdbMovie of movies) {
			const exists = await findMovie({ tmdbId: tmdbMovie.id });

			if (!exists) {
				await saveMovie({
					tmdbId: tmdbMovie.id,
					title: tmdbMovie.title,
					overview: tmdbMovie.overview,
					posterPath: tmdbMovie.poster_path,
					releaseDate: tmdbMovie.release_date,
				});
				count++;
			}
		}
		console.log(`Películas importadas correctamente: ${count}`);
	} catch (error) {
		console.error("Error importando películas:", error);
	}
};

connectToMongoDB()
	.then(() => importPopularMovies())
	.then(() => mongoose.disconnect());
