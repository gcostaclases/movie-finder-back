import { useState } from "react";
import { login } from "../services/authService";
import * as SecureStore from "expo-secure-store";

export default function useLogin() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [errorDetails, setErrorDetails] = useState([]);
	const [success, setSuccess] = useState(null);

	const handleLogin = async (identifier, password) => {
		setLoading(true);
		setError(null);
		setErrorDetails([]);
		setSuccess(null);
		try {
			const datos = await login(identifier, password);
			//console.log(datos);
			//Si 200 entro acá
			if (datos.token) {
				setSuccess(datos.message);
				// Guardo el token y los datos del usuario en SecureStore
				console.log("Token Usuario:", datos.token);
				console.log("Datos Usuario:", datos.user);
				await SecureStore.setItemAsync("userToken", datos.token);
				await SecureStore.setItemAsync("userProfile", JSON.stringify(datos.user));
				return datos;
				// return true;
			} else {
				setError(datos.message);
				return false;
			}
		} catch (e) {
			// Si cualquier cosa menos 200 entro acá
			//console.log(e.response.data);

			// Muestro el error del backend
			if (e.response?.data?.message) {
				setError(e.response.data.message);
				const details = Array.isArray(e.response.data.details) ? e.response.data.details : [];
				setErrorDetails(details);
			} else {
				setError("ERROR: Error de conexión");
				setErrorDetails([]);
			}
			return null;
			// return false;
		} finally {
			setLoading(false);
		}
	};

	return { handleLogin, loading, error, errorDetails, success };
}

