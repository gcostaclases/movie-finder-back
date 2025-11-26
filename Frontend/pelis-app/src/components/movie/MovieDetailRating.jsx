import { StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import { useSelector } from "react-redux";

const MovieDetailRating = () => {
	const averageRating = useSelector((state) => state.movie.reviewStats.averageRating);

	return (
		<View style={styles.container}>
			<Text style={styles.sectionTitle}>PUNTAJE</Text>
			<View style={styles.ratingRow}>
				<Rating
					type="custom"
					ratingCount={5}
					imageSize={40}
					readonly
					startingValue={averageRating}
					fractions={1}
					starStyle={{ marginHorizontal: 160 }}
					tintColor="#f3f3f3ff"
					ratingBackgroundColor="#ccc"
				/>
				{/* Si es entero no muestro los decimales sino si */}
				<Text style={styles.ratingText}>
					{Number.isInteger(averageRating) ? averageRating : averageRating.toFixed(1)}/5
				</Text>
			</View>
		</View>
	);
};

export default MovieDetailRating;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		// backgroundColor: "#e0acacff",
		borderBottomColor: "#000000ff",
		borderBottomWidth: 1,
	},
	sectionTitle: {
		fontWeight: "500",
		fontSize: 15,
		marginBottom: 15,
	},
	ratingRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	ratingText: {
		fontWeight: "500",
		marginLeft: 5,
		fontSize: 18,
		color: "#000000",
	},
});

