//#region ----------- IMPORTS -----------
// Importo axios para hacer las peticiones HTTP
import axios from "axios";
//#endregion ----------- IMPORTS -----------

const { TMDB_API_KEY } = process.env;

export const fetchPopularMovies = async (page = 1) => {
	const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=${page}`;
	const response = await axios.get(url);
	return response.data.results;
};
