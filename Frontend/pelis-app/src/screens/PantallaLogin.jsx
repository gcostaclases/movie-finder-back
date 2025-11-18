import { StyleSheet, TextInput, View, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import MovieFinderLogoBlack from "../assets/logo/MovieFinderLogoBlack";
import ButtonPrimary from "../components/ButtonPrimary";
import TextInputLoginSignUp from "../components/TextInputLoginSignUp";
import ButtonGoBack from "../components/ButtonGoBack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/userSlice";
import * as SecureStore from "expo-secure-store";

const APIURL = "https://pelis-y-series-app.vercel.app/api/v1";

const PantallaLogin = ({ navigation }) => {
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const handleLogin = () => {
		const objUserLogin = {
			identifier,
			password,
		};

		fetch(`${APIURL}/auth/login`, {
			method: "POST",
			body: JSON.stringify(objUserLogin),
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		})
			.then((r) => r.json())
			.then(async (datos) => {
				if (datos.token) {
					await SecureStore.setItemAsync("userToken", datos.token);
					dispatch(loginUser({ token: datos.token }));
					navigation.navigate("Peliculas");
				} else {
					alert(datos.message || "Usuario o contraseña incorrectos");
				}
			})
			.catch(() => {
				alert("Error de conexión");
			});
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
				{/* Botón primario sin ícono de iniciar sesión */}
				<ButtonPrimary title="Iniciar sesión" onPress={handleLogin} style={{ width: "85%" }} />
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

