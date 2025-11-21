import { StyleSheet, Text, View } from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import { useDispatch } from "react-redux";
import { cerrarSesion } from "../utils/cerrarSesion";

const PantallaPerfilUsuario = () => {
	const dispatch = useDispatch();

	// const cerrarSesion = () => {
	// 	alert("Sesión cerrada");
	// };

	return (
		<View style={styles.container}>
			<Text>PantallaPerfilUsuario</Text>
			<ButtonPrimary title="Cerrar sesión" onPress={() => cerrarSesion(dispatch)} style={{ width: "80%" }} />
		</View>
	);
};

export default PantallaPerfilUsuario;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

