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
import { resetUserRating } from "../store/slices/ratingSlice";
import { resetUserReview } from "../store/slices/reviewSlice";
import { addMovieReview } from "../store/slices/movieReviewsSlice";
import useAddReview from "../hooks/useAddReview";
import { updateReviewStats } from "../store/slices/movieSlice";
import { useEffect } from "react";
import { getUpdatedReviewStats } from "../utils/review";
//#endregion ----------- IMPORTS ------------

const PantallaAgregarReseniaPelicula = ({ visible, onClose, movieId }) => {
	const dispatch = useDispatch();

	const { createReview, loading, error, success } = useAddReview();

	const user = useSelector((state) => state.user);
	const puntaje = useSelector((state) => state.rating.userRating);
	const resenia = useSelector((state) => state.review.userReview);
	const prevAverage = useSelector((state) => state.movie.reviewStats.averageRating);
	const prevTotal = useSelector((state) => state.movie.reviewStats.totalReviews);

	const handleClose = () => {
		dispatch(resetUserRating());
		dispatch(resetUserReview());
		onClose();
	};

	const handleReview = async () => {
		await createReview({
			movieId,
			rating: puntaje,
			comment: resenia,
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

	// Toast de éxito y actualización del store
	useEffect(() => {
		if (success) {
			const { averageRating, totalReviews } = getUpdatedReviewStats(prevAverage, prevTotal, puntaje);
			dispatch(updateReviewStats({ averageRating, totalReviews }));

			// Agrego la nueva reseña al store de movieReviews
			console.log(user);
			dispatch(
				addMovieReview({
					movieId,
					review: {
						user: {
							username: user?.username,
							profileImage: user?.profileImage,
						},
						rating: puntaje,
						comment: resenia,
						_id: Date.now().toString(),
					},
				})
			);

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
							style={{ width: "80%", marginTop: 10, opacity: puntaje && resenia ? 1 : 0.5 }}
							disabled={!puntaje || !resenia}
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

