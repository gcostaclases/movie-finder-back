import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../store/slices/userSlice";

/*
  Cuando el usuario se loguea, guardo el token en el SecureStore y hago el dispatch en la pantalla de login.
	
  Cuando el usuario cierra y vuelve a abrir la app, el estado de Redux se reinicia, así que leo el token desde el SecureStore para restaurar el estado global.
*/

export default function useVerificarSesion() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const verificarSesion = async () => {
			try {
				const token = await SecureStore.getItemAsync("userToken");
				const userProfileString = await SecureStore.getItemAsync("userProfile");
				const userProfile = JSON.parse(userProfileString);

				if (token) {
					dispatch(
						loginUser({
							username: userProfile.username,
							email: userProfile.email,
							profileImage: userProfile.profileImage,
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

