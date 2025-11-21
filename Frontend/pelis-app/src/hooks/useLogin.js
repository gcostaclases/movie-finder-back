import { useState } from "react";
import { login } from "../services/authService";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/userSlice";

export default function useLogin() {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleLogin = async (identifier, password) => {
		setLoading(true);
		setError(null);
		try {
			const datos = await login(identifier, password);
			//console.log(datos);
			//Si 200 entro acá
			if (datos.token) {
				// Guardo el token en la SecureStore
				await SecureStore.setItemAsync("userToken", datos.token);
				// Cambio el estado global a logged in true
				dispatch(loginUser());
				return true;
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
			} else {
				setError("ERROR: Error de conexión");
			}
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { handleLogin, loading, error };
}

