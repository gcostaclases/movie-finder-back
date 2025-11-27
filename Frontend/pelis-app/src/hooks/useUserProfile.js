//#region ----------- IMPORTS ------------
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../services/userService";
import { updateProfileInfo } from "../store/slices/userSlice";
//#endregion ------------ IMPORTS ------------

export default function useUserProfile() {
	const dispatch = useDispatch();
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			setLoading(true);
			try {
				const data = await getUserProfile();
				setProfile(data);
				// console.log("Perfil de usuario obtenido:", data);
				dispatch(
					updateProfileInfo({
						username: data.username,
						email: data.email,
						profileImage: data.profileImage,
					})
				);
				setError(null);
			} catch (e) {
				// Uso el error del backend sino uno genérico
				if (e.response?.data?.message) {
					setError(e.response.data.message);
				} else {
					setError("ERROR: Error al cargar perfil");
				}
			} finally {
				setLoading(false);
			}
		};
		fetchProfile();
	}, [dispatch]);

	return { profile, loading, error };
}

