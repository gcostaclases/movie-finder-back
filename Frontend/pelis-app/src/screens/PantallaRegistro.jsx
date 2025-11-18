import { StyleSheet, View, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import MovieFinderLogoBlack from "../assets/logo/MovieFinderLogoBlack";
import ButtonPrimary from "../components/ButtonPrimary";
import TextInputLoginSignUp from "../components/TextInputLoginSignUp";
import ButtonGoBack from "../components/ButtonGoBack";

const PantallaRegistro = ({ navigation }) => {
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
					<TextInputLoginSignUp placeholder="Correo electrónico..." showBorderBottom={false} autoCapitalize="none" />
					<TextInputLoginSignUp placeholder="Nombre de usuario..." showBorderBottom={false} autoCapitalize="none" />
					<TextInputLoginSignUp
						placeholder="Contraseña..."
						showBorderBottom={false}
						secureTextEntry
						autoCapitalize="none"
					/>
					<TextInputLoginSignUp placeholder="Verificar contraseña..." secureTextEntry autoCapitalize="none" />
				</View>
				{/* Botón primario sin ícono de registrarse */}
				<ButtonPrimary title="Registrarme" onPress={() => alert("Se registra")} style={{ width: "85%" }} />
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

