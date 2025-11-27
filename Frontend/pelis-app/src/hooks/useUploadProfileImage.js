import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadProfileImage } from "../services/userService";
import { updateProfileImage } from "../store/slices/userSlice";

export default function useUploadProfileImage() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const uploadImage = async (imageUri) => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			const result = await uploadProfileImage(imageUri);
			dispatch(updateProfileImage(result.profileImage));
			setSuccess(true);
			return result;
		} catch (e) {
			// Uso el error del backend sino uno genérico
			if (e.response?.data?.message) {
				setError(e.response.data.message);
			} else {
				setError("ERROR: ERROR: No se pudo subir la imagen de perfil");
			}
			return null;
		} finally {
			setLoading(false);
		}
	};

	return { uploadImage, loading, error, success };
}
