import api from "../api/axios";

export async function reportMovieAvailability(movieId, providerId) {
	const res = await api.post(`/movies/${movieId}/availability`, { providerId });
	return res.data;
}
