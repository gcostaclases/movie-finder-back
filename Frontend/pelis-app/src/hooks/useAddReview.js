import { useState } from "react";
import { addReview } from "../services/reviewService";

export default function useAddReview() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const createReview = async ({ movieId, rating, comment }) => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			await addReview({ movieId, rating, comment });
			setSuccess(true);
		} catch (e) {
			setError(e?.response?.data?.message || "Error al crear la reseña");
		} finally {
			setLoading(false);
		}
	};

	return { createReview, loading, error, success };
}
