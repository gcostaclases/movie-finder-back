//#region ----------- IMPORTS ------------
import { useState, useEffect } from "react";
import { getMovies } from "../services/movieService";
//#endregion ------------ IMPORTS ------------

export default function useMovies(initialLimit = 12) {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [hasMore, setHasMore] = useState(true);

	const fetchMovies = async (nextPage = 1) => {
		// Si ya está cargando o no hay más, no hace nada
		if (loading || !hasMore) return;
		setLoading(true);
		setError(null);
		try {
			const data = await getMovies(nextPage, initialLimit);
			// Si es la primera página, reemplazo; si no, concateno
			setMovies((prev) => (nextPage === 1 ? data.movies : [...prev, ...data.movies]));
			// Si la cantidad recibida es igual al límite, puede haber más
			setHasMore(data.movies.length === initialLimit);
			// Actualizo la página actual
			setPage(nextPage);
		} catch (e) {
			// Uso el error del backend sino uno genérico
			if (e.response?.data?.message) {
				setError(e.response.data.message);
			} else {
				setError("ERROR: Error al cargar películas");
			}
		} finally {
			setLoading(false);
		}
	};

	// Al montar el componente o cambiar el límite, cargo la primera página de películas.
	useEffect(() => {
		fetchMovies(1);
	}, [initialLimit]);

	// Handler para la FlatList. Llama a fetchMovies con la siguiente página si es que corresponde.
	const loadMore = () => {
		if (!loading && hasMore) {
			fetchMovies(page + 1);
		}
	};

	return { movies, loading, error, loadMore, hasMore };
}

