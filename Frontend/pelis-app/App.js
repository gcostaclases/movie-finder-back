import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import TabMenu from "./src/routes/TabMenu";
import useVerificarSesion from "./src/hooks/useVerificarSesion";
import Toast from "react-native-toast-message";

// Hago esto para usar el store acá porque preciso el Provider
function MainApp() {
	const isLoading = useVerificarSesion();

	if (isLoading) {
		//TODO: Acá iría un splash screen o similar mientras se verifica la sesión
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>Cargando...</Text>
			</View>
		);
	}

	return (
		<NavigationContainer>
			<View style={styles.container}>
				<TabMenu />
				<StatusBar style="auto" />
			</View>
		</NavigationContainer>
	);
}

export default function App() {
	return (
		<Provider store={store}>
			<MainApp />
			<Toast />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
		// alignItems: "center",
		// justifyContent: "center",
		// gap: 20,
	},
});

