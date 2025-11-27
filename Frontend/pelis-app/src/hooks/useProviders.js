//#region ----------- IMPORTS ------------
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProviders } from "../services/providerService";
import { setProviders } from "../store/slices/providersSlice";
//#endregion ------------ IMPORTS ------------

export default function useProviders() {
	const dispatch = useDispatch();
	const providers = useSelector((state) => state.providers.providers);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (providers.length > 0) return; // Si ya están en el store no los voy a buscar
		const fetchProviders = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await getProviders();
				// console.log("Proveedores cargados:", data);
				dispatch(setProviders(data));
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
	}, [dispatch, providers.length]);

	return { providers, loading, error };
}

