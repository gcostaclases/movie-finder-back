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
