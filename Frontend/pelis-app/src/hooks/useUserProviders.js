//#region ----------- IMPORTS ------------
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserProviders } from "../services/userService";
import { setProviders } from "../store/slices/userSlice";
//#endregion ------------ IMPORTS ------------

export default function useUserProviders() {
	const dispatch = useDispatch();
	const [providers, setProvidersLocal] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProviders = async () => {
			setLoading(true);
			try {
				const data = await getUserProviders();
				setProvidersLocal(data);
				dispatch(setProviders(data)); // Guardo en el store
				setError(null);
			} catch (e) {
				// Uso el error del backend sino uno genérico
				if (e.response?.data?.message) {
					setError(e.response.data.message);
				} else {
					setError("ERROR: Error al cargar proveedores");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchProviders();
	}, [dispatch]);

	return { providers, loading, error };
}
