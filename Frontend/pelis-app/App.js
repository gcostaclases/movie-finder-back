import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { NavigationContainer } from "@react-navigation/native";
import PantallaLoginORegistro from "./src/screens/PantallaLoginORegistro";
import PantallaLogin from "./src/screens/PantallaLogin";
import PantallaRegistro from "./src/screens/PantallaRegistro";
import PantallaPeliculas from "./src/screens/PantallaPeliculas";
import TabMenu from "./src/routes/TabMenu";
import * as SecureStore from "expo-secure-store";

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<View style={styles.container}>
					<TabMenu />

					{/* <PantallaLoginORegistro /> */}
					{/* <PantallaLogin /> */}
					{/* <PantallaRegistro /> */}
					{/* <PantallaPeliculas /> */}

					<StatusBar style="auto" />
				</View>
			</NavigationContainer>
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

