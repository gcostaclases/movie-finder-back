import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../services/reviewService";
import { addMovieReview } from "../store/slices/movieSlice";

export default function useAddReview() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const createReview = async ({ movieId, rating, comment }) => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			const newReview = await addReview({ movieId, rating, comment });
			dispatch(addMovieReview(newReview));
			setSuccess(true);
		} catch (e) {
			// Uso el error del backend sino uno genérico
			if (e.response?.data?.message) {
				setError(e.response.data.message);
			} else {
				setError("ERROR: No se pudo crear la reseña");
			}
		} finally {
			setLoading(false);
		}
	};

	return { createReview, loading, error, success };
}

