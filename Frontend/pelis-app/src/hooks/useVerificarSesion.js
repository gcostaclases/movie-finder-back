import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../store/slices/userSlice";

/*
  Cuando el usuario se loguea, guardo el token y el perfil en SecureStore y hago el dispatch en la pantalla de login.
	
  Cuando el usuario cierra y vuelve a abrir la app, el estado de Redux se reinicia, así que leo el token y el perfil desde SecureStore para restaurar el estado global.
*/

export default function useVerificarSesion() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const verificarSesion = async () => {
			try {
				const token = await SecureStore.getItemAsync("userToken");
				const userProfileStr = await SecureStore.getItemAsync("userProfile");
				const userProfile = userProfileStr ? JSON.parse(userProfileStr) : {};

				if (token) {
					dispatch(
						loginUser({
							username: userProfile.username || "",
							profileImage: userProfile.profileImage || null,
						})
					);
				} else {
					dispatch(logoutUser());
				}
			} catch (error) {
				dispatch(logoutUser());
			} finally {
				setIsLoading(false);
			}
		};
		verificarSesion();
	}, [dispatch]);

	return isLoading;
}

