//#region ----------- IMPORTS ------------
import { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import ButtonSecondary from "../components/general/ButtonSecondary";
import { useDispatch } from "react-redux";
import { cerrarSesion } from "../utils/cerrarSesion";
import UserMenuTabs from "../components/user/UserMenuTabs";
import UserInfo from "../components/user/UserInfo";
import UserProviders from "../components/user/UserProviders";
//#endregion ------------ IMPORTS ------------

const PantallaPerfilUsuario = ({ navigation }) => {
	const dispatch = useDispatch();
	const [seccion, setSeccion] = useState("Perfil");

	const handleCerrarSesion = () => {
		cerrarSesion(dispatch);
	};

	const handleEditarProveedores = () => {
		Alert.alert("Editar proveedores", "Funcionalidad próximamente disponible.");
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<UserMenuTabs onChange={setSeccion} />

			{seccion === "Perfil" && (
				<>
					{/* Info de usuario */}
					<UserInfo />
					{/* Proveedores del usuario */}
					<UserProviders />
					{/* Botones */}
					<View style={styles.buttonsContainer}>
						<ButtonPrimary
							title="Editar proveedores"
							onPress={handleEditarProveedores}
							iconName="edit"
							style={{ width: "85%" }}
						/>
						<ButtonSecondary
							title="Cerrar sesión"
							onPress={handleCerrarSesion}
							iconName="power-off"
							color="#DC5658"
							style={{ width: "85%" }}
						/>
					</View>
				</>
			)}

			{seccion === "Reseñas" && (
				<View style={{ marginTop: 40 }}>
					<Text style={{ fontSize: 18, color: "#888" }}>Acá irán las reseñas del usuario.</Text>
				</View>
			)}
			{seccion === "Watchlist" && (
				<View style={{ marginTop: 40 }}>
					<Text style={{ fontSize: 18, color: "#888" }}>Acá irá la watchlist del usuario.</Text>
				</View>
			)}
		</ScrollView>
	);
};

export default PantallaPerfilUsuario;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: 30,
		paddingBottom: 40,
	},
	buttonsContainer: {
		width: "100%",
		alignItems: "center",
		gap: 15,
		marginBottom: 15,
	},
});

