import { StyleSheet, Text, View, Modal, TextInput } from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import ButtonCloseModal from "../components/general/ButtonCloseModal";
import MovieAddRating from "../components/movie/MovieAddRating";
import MovieAddReview from "../components/movie/MovieAddReview";
import { useSelector, useDispatch } from "react-redux";
import { resetRating } from "../store/slices/ratingSlice";
import { resetReview } from "../store/slices/reviewSlice";
import useAddReview from "../hooks/useAddReview";

const PantallaAgregarReseniaPelicula = ({ visible, onClose }) => {
	const dispatch = useDispatch();

	const { createReview, loading, error, success } = useAddReview();

	const puntaje = useSelector((state) => state.rating.value);
	const resenia = useSelector((state) => state.review.value);

	const handleClose = () => {
		dispatch(resetRating());
		dispatch(resetReview());
		onClose();
	};

	const handleReview = async () => {
		await createReview({
			movieId,
			rating: puntaje * 2, // Convierto a escala 10 (porque asi lo hice en el back)
			comment: resenia,
		});
		handleClose();
	};

	return (
		<Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
			<View style={styles.modalWrapper}>
				<View style={styles.modalContainer}>
					{/* Botón cerrar */}
					<ButtonCloseModal onPress={handleClose} />

					{/* Puntaje */}
					<MovieAddRating />

					{/* Reseña */}
					<MovieAddReview />

					{/* Botón Reseñar */}
					<ButtonPrimary
						title="Reseñar"
						onPress={handleReview}
						style={{ width: "80%", marginTop: 10, opacity: puntaje && resenia ? 1 : 0.5 }}
						disabled={!puntaje || !resenia}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default PantallaAgregarReseniaPelicula;

const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		justifyContent: "flex-end",
	},
	modalContainer: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		paddingTop: 20,
		paddingBottom: 50,
		alignItems: "center",
		zIndex: 1,
		shadowColor: "#000000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: -5 },
		minHeight: 420,
	},
});

