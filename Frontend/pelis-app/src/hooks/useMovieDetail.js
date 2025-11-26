//#region ----------- IMPORTS ------------
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById } from "../services/movieService";
import { setMovieDetail, resetMovieDetail } from "../store/slices/movieSlice";
//#endregion ------------ IMPORTS ------------

export default function useMovieDetail(id) {
	const dispatch = useDispatch();
	const movie = useSelector((state) => state.movie);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) {
			dispatch(resetMovieDetail());
			return;
		}
		const fetchMovie = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await getMovieById(id);
				dispatch(setMovieDetail(data));
			} catch (e) {
				// Uso el error del backend sino uno genérico
				if (e.response?.data?.message) {
					setError(e.response.data.message);
				} else {
					setError("ERROR: Error al cargar el detalle de la película");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchMovie();
	}, [id, dispatch]);

	return { movie, loading, error };
}

// import { useState, useEffect } from "react";
// import { getMovieById } from "../services/movieService";

// export default function useMovieDetail(id) {
// 	const [movie, setMovie] = useState(null);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState(null);

// 	useEffect(() => {
// 		if (!id) return;
// 		const fetchMovie = async () => {
// 			setLoading(true);
// 			setError(null);
// 			try {
// 				const data = await getMovieById(id);
// 				setMovie(data);
// 			} catch (e) {
// 				// Devuelvo el mensaje personalizado del backend si existe
// 				if (e.response?.data?.message) {
// 					setError(e.response.data.message);
// 				} else {
// 					// console.log(e);
// 					setError("ERROR: Error al cargar el detalle de la película");
// 				}
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		fetchMovie();
// 	}, [id]);

// 	return { movie, loading, error };
// }

