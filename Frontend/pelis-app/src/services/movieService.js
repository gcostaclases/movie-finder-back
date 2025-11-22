import api from "../api/axios";

// Traer películas paginadas
export async function getMovies(page = 1, limit = 12) {
	const response = await api.get("/movies", {
		params: { page, limit },
	});
	return response.data; // { movies, total, page, limit }
}

// Traer detalle de una película por ID
export async function getMovieById(id) {
	const response = await api.get(`/movies/${id}`);
	return response.data; // Devuelve el objeto película
}

