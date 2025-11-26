//#region ----------- IMPORTS ------------
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByMovie } from "../services/reviewService";
// import { setMovieReviews, resetMovieReviews } from "../store/slices/movieReviewsSlice";
import { setMovieReviews, resetMovieReviews } from "../store/slices/movieSlice";
//#endregion ------------ IMPORTS ------------

export default function useMovieReviews(movieId) {
	const dispatch = useDispatch();
	const reviews = useSelector((state) => state.movie.reviews);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!movieId) {
			dispatch(resetMovieReviews());
			return;
		}
		const fetchReviews = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await getReviewsByMovie(movieId);
				dispatch(setMovieReviews(data));
			} catch (e) {
				// Uso el error del backend sino uno genérico
				if (e.response?.data?.message) {
					setError(e.response.data.message);
				} else {
					setError("ERROR: No se pudieron cargar las reseñas");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchReviews();
	}, [movieId, dispatch]);

	return { reviews, loading, error };
}

// export default function useMovieReviews(movieId) {
// 	const [reviews, setReviews] = useState([]);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState(null);

// 	useEffect(() => {
// 		if (!movieId) return;
// 		setLoading(true);
// 		setError(null);

// 		(async () => {
// 			try {
// 				const data = await getReviewsByMovie(movieId);
// 				setReviews(data);
// 			} catch (err) {
// 				setError("ERROR: No se pudieron cargar las reseñas.");
// 			} finally {
// 				setLoading(false);
// 			}
// 		})();
// 	}, [movieId]);

// 	return { reviews, loading, error };
// }

