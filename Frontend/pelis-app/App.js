import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform, ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { NavigationContainer } from "@react-navigation/native";
import TabMenu from "./src/routes/TabMenu";
import useVerificarSesion from "./src/hooks/useVerificarSesion";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

// Hago esto para usar el store acá porque preciso el Provider
function MainApp() {
	const isLoading = useVerificarSesion();

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#27AAE1" />
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
		<SafeAreaProvider>
			<Provider store={store}>
				<MainApp />
				<ToastWithSafeArea />
			</Provider>
		</SafeAreaProvider>
	);
}

// Wrapper para Toast (porque para usar useSafeAreaInsets tiene que estar dentro de SafeAreaProvider) - y hago esto para que el Toast no quede tapado por el notch en iOS
function ToastWithSafeArea() {
	const insets = useSafeAreaInsets();
	return <Toast topOffset={Platform.OS === "ios" ? insets.top + 10 : 40} />;
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
