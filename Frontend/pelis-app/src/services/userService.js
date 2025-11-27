import api from "../api/axios";

// Traer proveedores contratados por el usuario autenticado
export async function getUserProviders() {
	const response = await api.get("/me/providers");
	return response.data; // Array de proveedores
}

export async function getUserProfile() {
	const response = await api.get("/me/profile");
	return response.data; // { username, email, profileImage }
}

export async function addUserProvider(providerId) {
	const response = await api.post("/me/providers", { providerId });
	return response.data; // { message: "..."}
}

// Reemplazar la lista completa de proveedores del usuario autenticado
export async function replaceUserProviders(providerIds) {
	const response = await api.put("/me/providers", providerIds);
	return response.data; // Array de proveedores actualizados
}
