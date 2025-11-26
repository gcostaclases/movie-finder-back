import { useState } from "react";
import { useDispatch } from "react-redux";
import { reportMovieAvailability } from "../services/availabilityService";
import { updateAvailability } from "../store/slices/movieSlice";

export default function useReportMovieAvailability() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const reportAvailability = async (movieId, providerId) => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			const newReport = await reportMovieAvailability(movieId, providerId);
			return newReport;
		} catch (e) {
			setError("ERROR: Error al reportar disponibilidad");
			return null;
		} finally {
			setLoading(false);
		}
	};

	return { reportAvailability, loading, error };
}
