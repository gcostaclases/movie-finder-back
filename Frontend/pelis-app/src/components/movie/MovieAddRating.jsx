//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import { setMovieRating } from "../../store/slices/userSlice";
//#endregion ----------- IMPORTS ------------

const MovieAddRating = () => {
	const dispatch = useDispatch();
	const rating = useSelector((state) => state.user.movieReview.rating);

	const handleRating = (rating) => {
		dispatch(setMovieRating(rating));
		// console.log("Rating seleccionado:", rating);
	};

	return (
		<>
			{/* Título calificación */}
			<Text style={styles.titulo}>Califica la película:</Text>

			{/* Estrellas */}
			<View style={styles.starsRow}>
				<Rating
					type="custom"
					ratingCount={5}
					imageSize={48}
					startingValue={rating}
					fractions={1}
					onFinishRating={handleRating}
					tintColor="#ffffff"
					ratingBackgroundColor="#ccc"
				/>
				<Text style={styles.ratingText}>{rating}/5</Text>
			</View>
		</>
	);
};

export default MovieAddRating;

const styles = StyleSheet.create({
	titulo: {
		fontSize: 16,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 18,
		marginTop: 10,
	},
	starsRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 18,
	},
	ratingText: {
		fontSize: 18,
		fontWeight: "500",
		marginLeft: 10,
		color: "#222",
	},
});

