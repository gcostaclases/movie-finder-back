//#region ----------- IMPORTS ------------
import { useState } from "react";
import { useDispatch } from "react-redux";
import { reportMovieAvailability } from "../services/availabilityService";
import { updateAvailability } from "../store/slices/movieSlice";
//#endregion ------------ IMPORTS ------------

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
			// console.log("Nuevo reporte de disponibilidad:", newReport.movie.availability);
			dispatch(updateAvailability(newReport.movie.availability));
			setSuccess(true);
			return newReport;
		} catch (e) {
			// Uso el error del backend sino uno genérico
			if (e.response?.data?.message) {
				setError(e.response.data.message);
			} else {
				setError("ERROR: Error al reportar disponibilidad");
			}
			return null;
		} finally {
			setLoading(false);
		}
	};

	return { reportAvailability, loading, error, success };
}
