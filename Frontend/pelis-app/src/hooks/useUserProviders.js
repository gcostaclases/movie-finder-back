import { useEffect, useState } from "react";
import { getUserProviders } from "../services/userService";

export default function useUserProviders() {
	const [providers, setProviders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProviders = async () => {
			setLoading(true);
			try {
				const data = await getUserProviders();
				setProviders(data);
				setError(null);
			} catch (e) {
				setError("ERROR: Error al cargar proveedores");
			} finally {
				setLoading(false);
			}
		};
		fetchProviders();
	}, []);

	return { providers, loading, error };
}
