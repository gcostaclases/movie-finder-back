import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserProvider, getUserProviders } from "../services/userService";
import { setProviders } from "../store/slices/userSlice";

export default function useAddUserProvider() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const addProvider = async (providerId) => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			const result = await addUserProvider(providerId);
			//! 👀
			const updated = await getUserProviders();
			dispatch(setProviders(updated.providers || updated));
			setSuccess(true);
			return result;
		} catch (e) {
			// Uso el error del backend sino uno genérico
			if (e.response?.data?.message) {
				setError(e.response.data.message);
			} else {
				setError("ERROR: No se pudo agregar el proveedor");
			}
			return null;
		} finally {
			setLoading(false);
		}
	};

	return { addProvider, loading, error, success };
}

