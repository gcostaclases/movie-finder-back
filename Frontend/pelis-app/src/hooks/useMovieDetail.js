import { useState, useEffect } from "react";
import { getMovieById } from "../services/movieService";

export default function useMovieDetail(id) {
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return;
		const fetchMovie = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await getMovieById(id);
				setMovie(data);
			} catch (e) {
				// Devuelvo el mensaje personalizado del backend si existe
				if (e.response?.data?.message) {
					setError(e.response.data.message);
				} else {
					// console.log(e);
					setError("ERROR: Error al cargar el detalle de la película");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchMovie();
	}, [id]);

	return { movie, loading, error };
}

