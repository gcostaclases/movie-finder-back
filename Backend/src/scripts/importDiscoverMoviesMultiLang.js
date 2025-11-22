//#region  ----------- IMPORTS -----------
import "../config/env.js";
import { createRepositoryAdapter } from "../repositories/adapters/index.js";
import { fetchDiscoverMoviesMultiLang, fetchMovieDetails, fetchMovieCredits } from "../services/tmdb.js";
//#endregion ----------- IMPORTS -----------

// Mezclar array (Fisher-Yates)
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

const TOTAL_DESEADO = 54;

const importDiscoverMoviesMultiLang = async () => {
	let repository;

	try {
		repository = await createRepositoryAdapter("mongoose");

		// Traer películas variadas en inglés, español o japonés (20 por idioma, página 1)
		let movies = await fetchDiscoverMoviesMultiLang(1);

		// Mezclar el array para que los idiomas queden entreverados
		shuffleArray(movies);

		let count = 0;

		for (const tmdbMovie of movies) {
			if (count >= TOTAL_DESEADO) break;

			const exists = await repository.findMovie({ tmdbId: tmdbMovie.id });
			if (exists) continue;

			const details = await fetchMovieDetails(tmdbMovie.id);
			const credits = await fetchMovieCredits(tmdbMovie.id);

			const genres = details.genres.map((genre) => ({
				tmdbId: genre.id,
				name: genre.name,
			}));

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

			// Salteá si no hay backdrop o poster
			if (!details.backdrop_path) {
				console.log(`Película sin backdrop: ${tmdbMovie.title} (${tmdbMovie.id}), se omite.`);
				continue;
			}
			if (!tmdbMovie.poster_path) {
				console.log(`Película sin poster: ${tmdbMovie.title} (${tmdbMovie.id}), se omite.`);
				continue;
			}

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
		console.log(`Películas importadas correctamente: ${count}`);
	} catch (error) {
		console.error("Error importando películas:", error);
	} finally {
		if (repository && repository.disconnect) {
			await repository.disconnect();
			console.log("[MongoDB] Desconectado correctamente.");
		}
		process.exit(0);
	}
};

importDiscoverMoviesMultiLang();

