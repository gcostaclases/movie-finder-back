import { useEffect, useState } from "react";
import { getMovieAvailability } from "../services/movieService";

export default function useMovieAvailability(movieId) {
	const [availability, setAvailability] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!movieId) return;
		setLoading(true);
		getMovieAvailability(movieId)
			.then(setAvailability)
			.catch((err) => setError("Error al cargar disponibilidad"))
			.finally(() => setLoading(false));
	}, [movieId]);

	return { availability, loading, error };
}
