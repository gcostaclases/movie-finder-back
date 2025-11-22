import api from "../api/axios";

// Traer películas paginadas
export async function getMovies(page = 1, limit = 12) {
	const response = await api.get("/movies", {
		params: { page, limit },
	});
	return response.data; // { movies, total, page, limit }
}

