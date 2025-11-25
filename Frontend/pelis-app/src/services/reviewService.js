import api from "../api/axios";

// Crear una nueva reseña
export async function addReview({ movieId, rating, comment }) {
	const response = await api.post("/reviews", {
		movieId,
		rating,
		comment,
	});
	return response.data;
}
