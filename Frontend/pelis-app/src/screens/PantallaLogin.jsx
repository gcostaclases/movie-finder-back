import { StyleSheet, TextInput, View, Image, KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import MovieFinderLogoBlack from "../assets/logo/MovieFinderLogoBlack";
import ButtonPrimary from "../components/ButtonPrimary";
import TextInputLoginSignUp from "../components/TextInputLoginSignUp";
import ButtonGoBack from "../components/ButtonGoBack";
import { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";
import { Dimensions } from "react-native";
import Toast from "react-native-toast-message";

const windowHeight = Dimensions.get("window").height;

const PantallaLogin = ({ navigation }) => {
	const { handleLogin, loading, error, errorDetails, success } = useLogin();

	// Nombre de usuario o correo electrónico
	const [identifier, setIdentifier] = useState("");
	// Contraseña
	const [password, setPassword] = useState("");

	// Mostrar cuando hay error o success
	useEffect(() => {
		if (success) {
			Toast.show({
				type: "success",
				text1: "Login exitoso",
				text2: success,
			});
		}
		if (error) {
			Toast.show({
				type: "error",
				text1: "Error de inicio de sesión",
				text2: error,
			});
		}
	}, [success, error]);

	const handleLoginAndNavigate = async () => {
		const ok = await handleLogin(identifier, password);
		if (ok) {
			navigation.navigate("MovieStack", { screen: "PantallaPeliculas" });
		}
	};

	const dynamicPaddingBottom = errorDetails.length > 0 ? 60 + errorDetails.length * 60 : 0;

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "undefined"}>
			<ScrollView
				contentContainerStyle={[styles.scrollContainer, { paddingBottom: dynamicPaddingBottom }]}
				keyboardShouldPersistTaps="handled">
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
				{/* {error && <Text style={{ color: "red" }}>{error}</Text>} */}
				{errorDetails.length > 0 && (
					<View style={{ justifyContent: "center", alignItems: "flex-start", width: "80%" }}>
						{errorDetails.map((detalle, idx) => (
							<View key={idx} style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
								<Text style={{ color: "red", fontSize: 16 }}>• </Text>
								<Text style={{ color: "red", fontSize: 14 }}>{detalle}</Text>
							</View>
						))}
					</View>
				)}

				{/* Botón primario sin ícono de iniciar sesión */}
				<ButtonPrimary
					title="Iniciar sesión"
					onPress={handleLoginAndNavigate}
					style={{ width: "85%", marginTop: 20 }}
				/>
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
		// backgroundColor: "#2bc151ff",
		flexGrow: 1,
		alignItems: "center",
		minHeight: windowHeight,
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

