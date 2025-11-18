import { StyleSheet, Text, View } from "react-native";
import MovieFinderLogoBlack from "../assets/logo/MovieFinderLogoBlack";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";

const PantallaLoginORegistro = ({ navigation }) => {
	// Navegar al Registro
	const irARegistro = () => {
		navigation.push("PantallaRegistro");
	};

	// Navegar al Login
	const irALogin = () => {
		navigation.push("PantallaLogin");
	};

	return (
		<View style={styles.container}>
			<MovieFinderLogoBlack />

			<View style={styles.buttonContainer}>
				{/* Botón primario sin ícono */}
				<ButtonPrimary title="Registrarme" onPress={irARegistro} />

				{/* Botón secundario sin ícono */}
				<ButtonSecondary title="Iniciar sesión" color="#4CAF50" onPress={irALogin} />
			</View>
		</View>
	);
};

export default PantallaLoginORegistro;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		gap: 50,
	},
	buttonContainer: {
		// backgroundColor: "#c91616ff",
		width: "85%",
		alignItems: "center",
		justifyContent: "center",
		gap: 20,
	},
});

// {/* Botón con ícono */}
// 	<ButtonPrimary
// 		title="Agregar reseña"
// 		iconName="pencil" // Ícono de Font Awesome
// 		onPress={() => alert("Ir a agregar reseña")}
// 	/>

