import axios from "axios";

const api = axios.create({
	baseURL: "https://pelis-y-series-app.vercel.app/api/v1",
	timeout: 7000,
	headers: {
		"Content-Type": "application/json", // Por defecto
	},
});

// Función flexible para hacer requests según mi API
export const makeRequest = async ({
	method = "GET",
	url,
	data = {},
	contentType = "application/json",
	token = null,
	params = {},
}) => {
	try {
		const headers = {
			"Content-Type": contentType,
		};
		// Si el endpoint requiere autenticación, agrega el token
		if (token) {
			headers["Authorization"] = `Bearer ${token}`;
		}
		const response = await api.request({
			method,
			url,
			data,
			params,
			headers,
		});
		return response.data;
	} catch (error) {
		const err = error.response?.data;
		throw err?.message || "Error de red";
	}
};

export default api;
