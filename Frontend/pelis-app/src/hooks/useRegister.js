import { useState } from "react";
import { register } from "../services/authService";

export default function useRegister() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleRegister = async (userData) => {
		setLoading(true);
		setError(null);
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
				const msg = e.response.data.message;
				const details = e.response.data.details;
				const detailsText = Array.isArray(details) ? details.join(" ") : "";
				setError(`${msg}${detailsText ? ": " + detailsText : ""}`);
			} else {
				setError("ERROR: Error de conexión");
			}
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { handleRegister, loading, error, success };
}

