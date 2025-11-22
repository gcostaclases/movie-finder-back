//#region ----------- IMPORTS -----------
// Importo axios para hacer las peticiones HTTP
import axios from "axios";
//#endregion ----------- IMPORTS -----------

const { TMDB_API_KEY } = process.env;

// Obtener películas populares
export const fetchPopularMovies = async (page = 1) => {
	const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}`;
	const response = await axios.get(url);
	return response.data.results;
};

// Obtener películas variadas
export const fetchDiscoverMovies = async (page = 1) => {
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}`;
	const response = await axios.get(url);
	return response.data.results;
};

// Obtener películas variadas en inglés, español o japonés
export const fetchDiscoverMoviesMultiLang = async (page = 1) => {
	const idiomas = ["en", "es", "ja"];
	const results = [];

	for (const lang of idiomas) {
		const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}&with_original_language=${lang}`;
		const response = await axios.get(url);
		results.push(...response.data.results);
	}

	// Eliminar duplicados por id de TMDB
	const unique = [];
	const ids = new Set();
	for (const movie of results) {
		if (!ids.has(movie.id)) {
			unique.push(movie);
			ids.add(movie.id);
		}
	}

	return unique;
};

export const fetchMostKnownMovies = async (page = 1) => {
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}&sort_by=popularity.desc&vote_count.gte=500`;
	const response = await axios.get(url);
	return response.data.results;
};

// Obtener detalles de una película
export const fetchMovieDetails = async (movieId) => {
	const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=es-ES`;
	const response = await axios.get(url);
	return response.data;
};

// Obtener créditos de una película (actores y directores)
export const fetchMovieCredits = async (movieId) => {
	const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=es-ES`;
	const response = await axios.get(url);
	return response.data;
};

