import { useState, useEffect } from "react";
import { getReviewsByMovie } from "../services/reviewService";

export default function useMovieReviews(movieId) {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!movieId) return;
		setLoading(true);
		setError(null);

		(async () => {
			try {
				const data = await getReviewsByMovie(movieId);
				setReviews(data);
			} catch (err) {
				setError("ERROR: No se pudieron cargar las reseñas.");
			} finally {
				setLoading(false);
			}
		})();
	}, [movieId]);

	return { reviews, loading, error };
}
