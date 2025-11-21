import api from "../api/axios";

// Login
export async function login(identifier, password) {
	const response = await api.post("/auth/login", { identifier, password });
	return response.data;
}

// Registro
export async function register(userData) {
	const response = await api.post("/auth/register", userData);
	return response.data;
}
