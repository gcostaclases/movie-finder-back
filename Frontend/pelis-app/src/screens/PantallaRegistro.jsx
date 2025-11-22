import { StyleSheet, View, Image, KeyboardAvoidingView, Platform, ScrollView, Text, Button } from "react-native";
import MovieFinderLogoBlack from "../assets/logo/MovieFinderLogoBlack";
import ButtonPrimary from "../components/ButtonPrimary";
import TextInputLoginSignUp from "../components/TextInputLoginSignUp";
import ButtonGoBack from "../components/ButtonGoBack";
import { useEffect, useState } from "react";
import useRegister from "../hooks/useRegister";
import { Dimensions } from "react-native";
import Toast from "react-native-toast-message";

const windowHeight = Dimensions.get("window").height;

const PantallaRegistro = ({ navigation }) => {
	const { handleRegister, loading, error, errorDetails, success } = useRegister();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");

	const [localError, setLocalError] = useState(null);

	// Mostrar toast cuando hay error o success
	useEffect(() => {
		if (success) {
			Toast.show({
				type: "success",
				text1: "Registro exitoso",
				text2: success,
			});
		}
		if (error) {
			Toast.show({
				type: "error",
				text1: "Error de registro",
				text2: error,
			});
		}
		if (localError) {
			Toast.show({
				type: "error",
				text1: "Error de registro",
				text2: localError,
			});
		}
	}, [success, error, localError]);

	const handleRegisterAndNavigate = async () => {
		if (password !== password2) {
			setLocalError("Las contraseñas no coinciden");
			return;
		}
		setLocalError(null);
		const ok = await handleRegister({
			email,
			username,
			password,
		});
		if (ok) {
			navigation.replace("PantallaLogin");
		}
	};

	const dynamicPaddingBottom = errorDetails.length > 0 ? 40 + errorDetails.length * 50 : 0;

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "undefined"}>
			<ScrollView
				contentContainerStyle={[styles.scrollContainer, { paddingBottom: dynamicPaddingBottom }]}
				keyboardShouldPersistTaps="handled">
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
				{/* {success && <Text style={{ color: "green" }}>{success}</Text>} */}
				{/* {error && <Text style={{ color: "red" }}>{error}</Text>} */}
				{/* {localError && <Text style={{ color: "red" }}>{localError}</Text>} */}
				{errorDetails.length > 0 && (
					<View style={{ justifyContent: "center", alignItems: "flex-start", width: "85%" }}>
						{errorDetails.map((detalle, idx) => (
							<View key={idx} style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
								<Text style={{ color: "red", fontSize: 16 }}>• </Text>
								<Text style={{ color: "red", fontSize: 14 }}>{detalle}</Text>
							</View>
						))}
					</View>
				)}

				{/* Botón primario sin ícono de registrarse */}
				<ButtonPrimary
					title="Registrarme"
					onPress={handleRegisterAndNavigate}
					style={{ width: "85%", marginTop: 20 }}
				/>
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
		// backgroundColor: "#2bc151ff",
		flexGrow: 1,
		alignItems: "center",
		minHeight: windowHeight,
		// paddingBottom: 280,
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
		backgroundColor: "#32aac5ff",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 25,
		marginBottom: 20,
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

