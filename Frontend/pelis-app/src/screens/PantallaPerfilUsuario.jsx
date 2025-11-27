//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import ButtonSecondary from "../components/general/ButtonSecondary";
import { useDispatch } from "react-redux";
import { cerrarSesion } from "../utils/cerrarSesion";
import UserInfo from "../components/user/UserInfo";
import UserProviders from "../components/user/UserProviders";
import { useState } from "react";
import PantallaAgregarProveedorUsuario from "./PantallaAgregarProveedorUsuario";
//#endregion ------------ IMPORTS ------------

const PantallaPerfilUsuario = () => {
	const dispatch = useDispatch();

	// Estados para controlar la visibilidad de las modales
	const [modalEditarProveedoresVisible, setModalEditarProveedoresVisible] = useState(false);

	const handleCerrarSesion = () => {
		cerrarSesion(dispatch);
	};

	const handleAbrirModalEditarProveedores = () => {
		setModalEditarProveedoresVisible(true);
	};

	// const handleEditarProveedores = () => {
	// 	Alert.alert("Editar proveedores", "Funcionalidad próximamente disponible.");
	// };

	return (
		<>
			<ScrollView contentContainerStyle={styles.container}>
				{/* Info de usuario */}
				<UserInfo />
				{/* Proveedores del usuario */}
				<UserProviders />
				{/* Botones */}
				<View style={styles.buttonsContainer}>
					<ButtonPrimary
						title="Editar proveedores"
						onPress={handleAbrirModalEditarProveedores}
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
			</ScrollView>

			{/* Modal agregar proveedor */}
			<PantallaAgregarProveedorUsuario
				visible={modalEditarProveedoresVisible}
				onClose={() => setModalEditarProveedoresVisible(false)}
			/>
		</>
	);
};

export default PantallaPerfilUsuario;

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "#19ae2aff",
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

