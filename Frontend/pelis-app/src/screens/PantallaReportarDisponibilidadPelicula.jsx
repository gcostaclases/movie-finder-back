//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import ButtonCloseModal from "../components/general/ButtonCloseModal";
import MovieAddAvailabilityReport from "../components/movie/MovieAddAvailabilityReport";
import { useSelector, useDispatch } from "react-redux";
import { updateAvailability } from "../store/slices/movieSlice";
import useReportMovieAvailability from "../hooks/useReportMovieAvailability";
import { useState } from "react";
import useProviders from "../hooks/useProviders";
import { useEffect } from "react";
import { getUpdatedAvailability } from "../utils/availability";
//#endregion ------------ IMPORTS ------------

const PantallaReportarDisponibilidadPelicula = ({ visible, onClose, movieId }) => {
	const dispatch = useDispatch();

	// Custom hook para reportar disponibilidad
	const { reportAvailability } = useReportMovieAvailability();

	const [seleccionado, setSeleccionado] = useState(null);

	const prevAvailability = useSelector((state) => state.movie.availability);
	const providers = useSelector((state) => state.providers.providers);

	const handleClose = () => {
		setSeleccionado(null);
		onClose();
	};

	const handleReport = async () => {
		await reportAvailability(movieId, seleccionado);

		const finalAvailability = getUpdatedAvailability(prevAvailability, seleccionado, providers);

		dispatch(updateAvailability(finalAvailability));
		handleClose();
	};

	return (
		<Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
			<View style={[styles.modalWrapper]}>
				<View style={styles.modalContainer}>
					{/* Botón cerrar */}
					<ButtonCloseModal onPress={handleClose} />

					{/* Selector de proveedores */}
					<MovieAddAvailabilityReport seleccionado={seleccionado} setSeleccionado={setSeleccionado} />

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

