import { useState, useEffect } from "react";
import { getProviders } from "../services/providerService";

export default function useProviders() {
	const [providers, setProviders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProviders = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await getProviders();
				setProviders(data);
			} catch (e) {
				setError("Error al cargar proveedores");
			} finally {
				setLoading(false);
			}
		};
		fetchProviders();
	}, []);

	return { providers, loading, error };
}
