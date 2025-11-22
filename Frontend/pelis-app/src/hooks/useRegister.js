import { useState } from "react";
import { register } from "../services/authService";

export default function useRegister() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [errorDetails, setErrorDetails] = useState([]);
	const [success, setSuccess] = useState(null);

	const handleRegister = async (userData) => {
		setLoading(true);
		setError(null);
		setErrorDetails([]);
		setSuccess(null);
		try {
			const datos = await register(userData);
			if (datos.message) {
				setSuccess(datos.message);
				return true;
			} else {
				setError("ERROR: Error en el registro");
				return false;
			}
		} catch (e) {
			if (e.response?.data?.message) {
				setError(e.response.data.message);
				const details = Array.isArray(e.response.data.details) ? e.response.data.details : [];
				setErrorDetails(details);
			} else {
				setError("ERROR: Error de conexión");
				setErrorDetails([]);
			}
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { handleRegister, loading, error, errorDetails, success };
}
