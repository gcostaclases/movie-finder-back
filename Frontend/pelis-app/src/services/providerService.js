import api from "../api/axios";

// Traer todos los proveedores
export async function getProviders() {
	const response = await api.get("/providers");
	return response.data; // Devuelve un array de proveedores
}
