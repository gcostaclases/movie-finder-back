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

				// Géneros como objetos
				const genres = details.genres.map((genre) => ({
					tmdbId: genre.id,
					name: genre.name,
				}));

				// Filtrar actores y directores
				const actors = credits.cast.map((actor) => ({
					tmdbId: actor.id,
					name: actor.name,
					role: actor.character,
					image: actor.profile_path,
				}));

				const directors = credits.crew
					.filter((member) => member.job === "Director")
					.map((director) => ({
						tmdbId: director.id,
						name: director.name,
						image: director.profile_path,
					}));

				// Si no hay backdrop, salteá la película
				if (!details.backdrop_path) {
					console.log(`Película sin backdrop: ${tmdbMovie.title} (${tmdbMovie.id}), se omite.`);
					continue;
				}

				// Si no hay poster, salteá la película
				if (!tmdbMovie.poster_path) {
					console.log(`Película sin poster: ${tmdbMovie.title} (${tmdbMovie.id}), se omite.`);
					continue;
				}

				// Guardar la película en la base de datos
				await repository.saveMovie({
					tmdbId: tmdbMovie.id,
					title: tmdbMovie.title,
					originalTitle: details.original_title,
					overview: tmdbMovie.overview?.trim(),
					backdropPath: details.backdrop_path,
					posterPath: tmdbMovie.poster_path,
					releaseDate: tmdbMovie.release_date,
					originalLanguage: details.original_language,
					duration: details.runtime,
					genres,
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

