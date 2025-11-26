//#region ----------- IMPORTS ------------
import {
	StyleSheet,
	Text,
	View,
	Modal,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import ButtonCloseModal from "../components/general/ButtonCloseModal";
import MovieAddRating from "../components/movie/MovieAddRating";
import MovieAddReview from "../components/movie/MovieAddReview";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";
import { resetMovieRating, resetMovieComment } from "../store/slices/userSlice";
import useAddReview from "../hooks/useAddReview";
import { updateReviewStats } from "../store/slices/movieSlice";
import { useEffect } from "react";
import { getUpdatedReviewStats } from "../utils/review";
//#endregion ----------- IMPORTS ------------

const PantallaAgregarReseniaPelicula = ({ visible, onClose }) => {
	const dispatch = useDispatch();

	const movieId = useSelector((state) => state.movie.id);
	const rating = useSelector((state) => state.user.movieReview.rating);
	const comment = useSelector((state) => state.user.movieReview.comment);

	const { createReview, loading, error, success } = useAddReview();

	const handleClose = () => {
		dispatch(resetMovieRating());
		dispatch(resetMovieComment());
		onClose();
	};

	const handleReview = async () => {
		await createReview({
			movieId,
			rating,
			comment,
		});
	};

	// Toast de error
	useEffect(() => {
		if (error) {
			Toast.show({
				type: "error",
				text1: "Error al enviar reseña",
				text2: error,
			});
		}
	}, [error]);

	// Toast de éxito
	useEffect(() => {
		if (success) {
			Toast.show({
				type: "success",
				text1: "¡Reseña creada exitosamente!",
			});
			handleClose();
		}
	}, [success]);

	return (
		<Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalWrapper}>
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
							style={{ width: "80%", marginTop: 10, opacity: rating && comment ? 1 : 0.5 }}
							disabled={!rating || !comment}
						/>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
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

