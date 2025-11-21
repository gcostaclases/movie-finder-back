import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../store/slices/userSlice";

/*
  Cuando el usuario se loguea, guardo el token en la SecureStore y hago el dispatch en la pantalla de login.
  
  Pero cuando el usuario cierra y vuelve a abrir la app, el estado de Redux se reinicia (o sea se pierde), y tengo que volver a cargar el token desde la SecureStore para restaurar el estado global (isLogged -> en el slice de usuario).
  
  Por eso, con el custom hook leo el token guardado en la SecureStore y actualizo el estado de Redux al iniciar la app, así la sesión persiste aunque se cierre la app.
*/

export default function useVerificarSesion() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const verificarSesion = async () => {
			try {
				const token = await SecureStore.getItemAsync("userToken");
				if (token) {
					dispatch(loginUser());
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

