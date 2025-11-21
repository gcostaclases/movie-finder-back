import { StyleSheet, View, Image, KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import MovieFinderLogoBlack from "../assets/logo/MovieFinderLogoBlack";
import ButtonPrimary from "../components/ButtonPrimary";
import TextInputLoginSignUp from "../components/TextInputLoginSignUp";
import ButtonGoBack from "../components/ButtonGoBack";
import { useState } from "react";
import useRegister from "../hooks/useRegister";

const PantallaRegistro = ({ navigation }) => {
	const { handleRegister, loading, error, success } = useRegister();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");

	const handleRegisterAndNavigate = async () => {
		if (password !== password2) {
			setError("Las contraseñas no coinciden");
			return;
		}
		const ok = await handleRegister({
			email,
			username,
			password,
			password2,
		});
		if (ok) {
			navigation.navigate("PantallaLogin");
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "undefined"} // Ajusta el comportamiento según el sistema operativo
		>
			<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
				{/* Botón para ir atrás */}
				<ButtonGoBack navigation={navigation} hasBackground={true} sobreImg={true} />

				{/* Imágen */}
				<View style={styles.imageContainer}>
					<Image source={require("../assets/img/peli-registro.jpg")} style={styles.image} resizeMode="cover" />
				</View>

				{/* Logo */}
				<MovieFinderLogoBlack />
				{/* Inputs */}
				<View style={styles.containerInputs}>
					{/*//! A varios les saco el borde de abajo para que no se superpongan con el otro */}
					<TextInputLoginSignUp
						placeholder="Correo electrónico..."
						showBorderBottom={false}
						autoCapitalize="none"
						value={email}
						onChangeText={setEmail}
					/>
					<TextInputLoginSignUp
						placeholder="Nombre de usuario..."
						showBorderBottom={false}
						autoCapitalize="none"
						value={username}
						onChangeText={setUsername}
					/>
					<TextInputLoginSignUp
						placeholder="Contraseña..."
						showBorderBottom={false}
						secureTextEntry
						autoCapitalize="none"
						value={password}
						onChangeText={setPassword}
					/>
					<TextInputLoginSignUp
						placeholder="Verificar contraseña..."
						secureTextEntry
						autoCapitalize="none"
						value={password2}
						onChangeText={setPassword2}
					/>
				</View>

				{loading && <Text>Cargando...</Text>}
				{success && <Text style={{ color: "green" }}>{success}</Text>}
				{error && <Text style={{ color: "red" }}>{error}</Text>}

				{/* Botón primario sin ícono de registrarse */}
				<ButtonPrimary title="Registrarme" onPress={handleRegisterAndNavigate} style={{ width: "85%" }} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default PantallaRegistro;

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
		height: "30%",
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

