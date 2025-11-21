import { logoutUser } from "../store/slices/userSlice";
import * as SecureStore from "expo-secure-store";

export async function cerrarSesion(dispatch) {
	await SecureStore.deleteItemAsync("userToken");
	dispatch(logoutUser());
}
