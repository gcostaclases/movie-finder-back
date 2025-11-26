import { StyleSheet, Text, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUserReview } from "../../store/slices/reviewSlice";

const MovieAddReview = () => {
	const dispatch = useDispatch();

	const resenia = useSelector((state) => state.review.userReview);

	return (
		<>
			{/* Título reseña */}
			<Text style={styles.titulo}>Escriba su reseña:</Text>

			{/* Campo de texto */}
			<TextInput
				style={styles.textInput}
				multiline
				placeholder="Escriba aquí..."
				value={resenia}
				onChangeText={(text) => dispatch(setUserReview(text))}
				maxLength={400}
			/>
		</>
	);
};

export default MovieAddReview;

const styles = StyleSheet.create({
	titulo: {
		fontSize: 16,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 18,
		marginTop: 10,
	},
	textInput: {
		width: 320,
		height: 170,
		backgroundColor: "#D9E7EF",
		borderRadius: 10,
		padding: 12,
		fontSize: 15,
		color: "#222",
		textAlignVertical: "top",
		marginBottom: 18,
	},
});

