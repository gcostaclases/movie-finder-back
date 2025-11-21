import { StyleSheet, TextInput, View, Image, KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import MovieFinderLogoBlack from "../assets/logo/MovieFinderLogoBlack";
import ButtonPrimary from "../components/ButtonPrimary";
import TextInputLoginSignUp from "../components/TextInputLoginSignUp";
import ButtonGoBack from "../components/ButtonGoBack";
import { useState } from "react";
import useLogin from "../hooks/useLogin";

const PantallaLogin = ({ navigation }) => {
	const { handleLogin, loading, error } = useLogin();

	// Nombre de usuario o correo electrónico
	const [identifier, setIdentifier] = useState("");
	// Contraseña
	const [password, setPassword] = useState("");

	const handleLoginAndNavigate = async () => {
		const ok = await handleLogin(identifier, password);
		if (ok) {
			navigation.navigate("MovieStack", { screen: "PantallaPeliculas" });
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "undefined"}>
			<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
				{/* Botón para ir atrás */}
				<ButtonGoBack navigation={navigation} hasBackground={true} sobreImg={true} />

				{/* Imágen */}
				<View style={styles.imageContainer}>
					<Image source={require("../assets/img/peli-login.jpg")} style={styles.image} resizeMode="cover" />
				</View>

				{/* Logo */}
				<MovieFinderLogoBlack />
				{/* Inputs */}
				<View style={styles.containerInputs}>
					{/*//! A este le saque el borde de abajo para que no se superponga con el otro */}
					<TextInputLoginSignUp
						placeholder="Correo o nombre de usuario..."
						showBorderBottom={false}
						autoCapitalize="none"
						value={identifier}
						onChangeText={setIdentifier}
					/>
					<TextInputLoginSignUp
						placeholder="Contraseña..."
						secureTextEntry
						autoCapitalize="none"
						value={password}
						onChangeText={setPassword}
					/>
				</View>

				{loading && <Text>Cargando...</Text>}
				{error && <Text style={{ color: "red" }}>{error}</Text>}

				{/* Botón primario sin ícono de iniciar sesión */}
				<ButtonPrimary title="Iniciar sesión" onPress={handleLoginAndNavigate} style={{ width: "85%" }} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default PantallaLogin;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		// alignItems: "center",
		// gap: 15,
	},
	scrollContainer: {
		flexGrow: 1,
		alignItems: "center",
	},
	imageContainer: {
		width: "100%",
		height: "45%",
		overflow: "hidden",
		marginBottom: 40,
	},
	image: {
		width: "100%",
		height: "150%",
	},
	containerInputs: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 25,
		marginBottom: 50,
	},
	input: {
		width: "100%",
		height: 70,
		backgroundColor: "#D9EAF6",
		borderColor: "#27AAE1",
		borderWidth: 1,
		paddingHorizontal: 15,
		fontSize: 16,
		// marginBottom: 10,
	},
});

