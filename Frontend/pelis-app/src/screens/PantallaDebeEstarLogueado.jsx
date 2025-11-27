import { Modal, View, Text, StyleSheet, Platform } from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import ButtonSecondary from "../components/general/ButtonSecondary";
import ButtonCloseModal from "../components/general/ButtonCloseModal";

const PantallaDebeEstarLogueado = ({ visible, onClose, titulo, onLogin, onRegister }) => (
	<Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
		<View style={styles.modalWrapper}>
			<View style={styles.modalContainer}>
				<ButtonCloseModal onPress={onClose} />
				<Text style={styles.titulo}>{titulo}</Text>
				<View style={styles.buttons}>
					<ButtonPrimary title="Iniciar sesión" onPress={onLogin} color="#1A7F37" style={{ marginBottom: 15 }} />
					<ButtonSecondary title="Registrarse" onPress={onRegister} />
				</View>
			</View>
		</View>
	</Modal>
);

export default PantallaDebeEstarLogueado;

const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		justifyContent: "flex-end",
	},
	modalContainer: {
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		paddingTop: 50,
		paddingBottom: 55,
		alignItems: "center",
		zIndex: 1,
		shadowColor: "#000000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: -5 },
	},
	titulo: {
		fontSize: Platform.OS === "ios" ? 16 : 14,
		// fontSize: 18,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 20,
		marginTop: 10,
		width: "85%",
		lineHeight: 25,
		// backgroundColor: "#5bbbd3ff",
	},
	buttons: {
		width: "85%",
		marginTop: 10,
	},
});

