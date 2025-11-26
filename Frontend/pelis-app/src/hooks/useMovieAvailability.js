import { useEffect, useState } from "react";
import { getMovieAvailability } from "../services/movieService";
import { useDispatch } from "react-redux";
import { setMovieAvailability } from "../store/slices/availabilitySlice";

export default function useMovieAvailability(movieId) {
	const dispatch = useDispatch();
	const [availability, setAvailability] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!movieId) return;
		const fetchAvailability = async () => {
			setLoading(true);
			try {
				const data = await getMovieAvailability(movieId);
				setAvailability(data);
				dispatch(setMovieAvailability(data));
			} catch (err) {
				setError("ERROR: Error al cargar disponibilidad");
			} finally {
				setLoading(false);
			}
		};
		fetchAvailability();
	}, [movieId, dispatch]);

	return { availability, loading, error };
}