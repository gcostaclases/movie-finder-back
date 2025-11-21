import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { store } from "../store/store";
import { cerrarSesion } from "../utils/cerrarSesion";

// Instancia principal
const api = axios.create({
	baseURL: "https://pelis-y-series-app.vercel.app/api/v1",
	headers: {
		Accept: "application/json", // Esperamos JSON
		// No seteamos Content-Type aquí
	},
	timeout: 7000,
});

// Función para obtener el token desde SecureStore
const getAuthToken = async () => {
	return await SecureStore.getItemAsync("userToken");
};

// Interceptor para agregar el token automáticamente
api.interceptors.request.use(
	async (config) => {
		const token = await getAuthToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Interceptor para manejar errores 401 (token vencido)
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			// Si tu backend tiene refresh token, acá lo usarías.
			// Si no, simplemente cerrás sesión (borrás el token y redirigís al login).
			await cerrarSesion(store.dispatch); // Cierra sesión globalmente
			// Podés despachar logoutUser si usás Redux, o redirigir al login.
			return Promise.reject(error);
		}
		return Promise.reject(error);
	}
);

export default api;

