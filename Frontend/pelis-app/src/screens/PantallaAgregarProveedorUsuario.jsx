//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import ButtonCloseModal from "../components/general/ButtonCloseModal";
import { useSelector, useDispatch } from "react-redux";
import useReportMovieAvailability from "../hooks/useReportMovieAvailability";
import { useEffect } from "react";
import { resetSelectedProvider } from "../store/slices/userSlice";
import Toast from "react-native-toast-message";
import UserAddProvider from "../components/user/UserAddProvider";
import useAddUserProvider from "../hooks/useAddUserProvider";
//#endregion ------------ IMPORTS ------------

const PantallaAgregarProveedorUsuario = ({ visible, onClose }) => {
	const dispatch = useDispatch();

	// Custom hook para reportar disponibilidad
	const { addProvider, loading, error, success } = useAddUserProvider();

	const seleccionado = useSelector((state) => state.user.selectedProvider);

	const handleAddProvider = async () => {
		await addProvider(seleccionado);
		handleClose();
	};

	const handleClose = () => {
		dispatch(resetSelectedProvider());
		onClose();
	};

	// Toast de error
	useEffect(() => {
		if (error) {
			Toast.show({
				type: "error",
				text1: "Error al reportar disponibilidad",
				text2: error,
			});
		}
	}, [error]);

	// Toast de éxito
	useEffect(() => {
		if (success) {
			Toast.show({
				type: "success",
				text1: "¡Reporte creado exitosamente!",
			});
			handleClose();
		}
	}, [success]);

	return (
		<Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
			<View style={[styles.modalWrapper]}>
				<View style={styles.modalContainer}>
					{/* Botón cerrar */}
					<ButtonCloseModal onPress={handleClose} />

					{/* Selector de proveedores */}
					<UserAddProvider />

					{/* Botón Reportar */}
					<ButtonPrimary
						title="Agregar"
						onPress={handleAddProvider}
						style={{ width: "85%", marginTop: 10, opacity: seleccionado ? 1 : 0.5 }}
						disabled={!seleccionado}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default PantallaAgregarProveedorUsuario;

const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		justifyContent: "flex-end",
	},
	modalContainer: {
		backgroundColor: "#FFFFFF",
		// backgroundColor: "#45b843ff",
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		paddingTop: 20,
		paddingBottom: 40,
		// paddingHorizontal: 24,
		alignItems: "center",
		zIndex: 1,
		shadowColor: "#000000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: -5 },
	},
});

