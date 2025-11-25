import { useEffect, useState } from "react";
import { getUserProfile } from "../services/userService";

export default function useUserProfile() {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			setLoading(true);
			try {
				const data = await getUserProfile();
				setProfile(data);
				setError(null);
			} catch (e) {
				setError("ERROR: Error al cargar perfil");
			} finally {
				setLoading(false);
			}
		};
		fetchProfile();
	}, []);

	return { profile, loading, error };
}
