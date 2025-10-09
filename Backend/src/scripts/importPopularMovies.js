//#region  ----------- IMPORTS -----------
// Importo y cargo las variables de entorno PRIMERO antes que nada
import "../config/env.js";

// Importo el adaptador de repositorio
import { createRepositoryAdapter } from "../repositories/adapters/index.js";

// Importo las funciones para interactuar con TMDB
import { fetchPopularMovies, fetchMovieDetails, fetchMovieCredits } from "../services/tmdb.js";
//#endregion ----------- IMPORTS -----------

const importPopularMovies = async () => {
	let repository;

	try {
		// Crear el adaptador de repositorio (conexión a la base de datos)
		repository = await createRepositoryAdapter("mongoose");

		// Obtener las películas populares (20 películas de la página 1)
		const movies = await fetchPopularMovies(1);
		let count = 0;

		// Recorro las películas y las guardo en la base de datos si no existen
		for (const tmdbMovie of movies) {
			const exists = await repository.findMovie({ tmdbId: tmdbMovie.id });

			if (!exists) {
				// Obtener detalles de la película
				const details = await fetchMovieDetails(tmdbMovie.id);
				const credits = await fetchMovieCredits(tmdbMovie.id);

				// Filtrar actores y directores
				const actors = credits.cast.map((actor) => ({
					name: actor.name,
					role: actor.character,
				}));

				const directors = credits.crew
					.filter((member) => member.job === "Director")
					.map((director) => ({
						name: director.name,
					}));

				// Guardar la película en la base de datos
				await repository.saveMovie({
					tmdbId: tmdbMovie.id,
					title: tmdbMovie.title,
					originalTitle: details.original_title,
					overview: tmdbMovie.overview?.trim() || "Sin descripción disponible", // Manejo del overview vacío
					posterPath: tmdbMovie.poster_path,
					releaseDate: tmdbMovie.release_date,
					originalLanguage: details.original_language,
					duration: details.runtime,
					genres: details.genres.map((genre) => genre.name),
					actors,
					directors,
				});
				count++;
			}
		}
		console.log(`Películas importadas correctamente: ${count}`);
	} catch (error) {
		console.error("Error importando películas:", error);
	} finally {
		// Desconectar la base de datos al finalizar
		if (repository && repository.disconnect) {
			await repository.disconnect();
			console.log("[MongoDB] Desconectado correctamente.");
		}
		process.exit(0);
	}
};

// Ejecuto la función de importación
importPopularMovies();

