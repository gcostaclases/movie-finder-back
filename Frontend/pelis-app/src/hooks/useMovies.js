import { useState, useEffect } from "react";
import { getMovies } from "../services/movieService";

export default function useMovies(initialPage = 1, initialLimit = 12) {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMovies = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await getMovies(initialPage, initialLimit);
				// console.log("useMovies: | Datos recibidos de getMovies:", data);
				// console.log("useMovies: | Películas recibidas:", data.movies);
				setMovies(data.movies);
			} catch (e) {
				console.log("ERROR: Error en fetchMovies:", e);
				setError("ERROR: Error al cargar películas");
			} finally {
				setLoading(false);
			}
		};
		fetchMovies();
	}, [initialLimit]);

	return { movies, loading, error };
}

