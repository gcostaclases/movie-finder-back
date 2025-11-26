import { useState } from "react";
import { reportMovieAvailability } from "../services/availabilityService";

export default function useReportMovieAvailability() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const reportAvailability = async (movieId, providerId) => {
		setLoading(true);
		setError(null);
		try {
			const data = await reportMovieAvailability(movieId, providerId);
			return data;
		} catch (e) {
			setError("ERROR: Error al reportar disponibilidad");
			return null;
		} finally {
			setLoading(false);
		}
	};

	return { reportAvailability, loading, error };
}
