import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import ButtonCloseModal from "../components/general/ButtonCloseModal";
import MovieAddAvailabilityReport from "../components/movie/MovieAddAvailabilityReport";
import { useSelector, useDispatch } from "react-redux";
import { resetProvider } from "../store/slices/providerSlice";

const PantallaReportarDisponibilidadPelicula = ({ visible, onClose }) => {
	const dispatch = useDispatch();

	const seleccionado = useSelector((state) => state.provider.value);

	const handleClose = () => {
		dispatch(resetProvider());
		onClose();
	};

	const handleReport = () => {
		Alert.alert("Reporte DE PRUEBA enviado", "¡Gracias por reportar la disponibilidad!");
		handleClose();
	};

	return (
		<Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
			<View style={[styles.modalWrapper]}>
				<View style={styles.modalContainer}>
					{/* Botón cerrar */}
					<ButtonCloseModal onPress={handleClose} />

					{/* Selector de proveedores */}
					<MovieAddAvailabilityReport />

					{/* Botón Reportar */}
					<ButtonPrimary
						title="Reportar"
						onPress={handleReport}
						style={{ width: "85%", marginTop: 10, opacity: seleccionado ? 1 : 0.5 }}
						disabled={!seleccionado}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default PantallaReportarDisponibilidadPelicula;

// --- Estilos ---
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

