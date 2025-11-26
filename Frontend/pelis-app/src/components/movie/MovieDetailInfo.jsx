import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const numColumns = 3;
const itemSize = (width - 40) / numColumns;
const smallPosterWidth = itemSize;
const smallPosterHeight = Math.round(smallPosterWidth * 1.5);
const mainPosterHeight = 160;
const mainPosterWidth = "100%";
// const smallPosterWidth = 100;
// const smallPosterHeight = 150;

const MovieDetailInfo = ({ movie }) => {
	return (
		<>
			{/* Imagen principal */}
			{movie.backdropPath ? (
				<Image source={{ uri: "https://image.tmdb.org/t/p/w780" + movie.backdropPath }} style={styles.mainImage} />
			) : (
				<View style={[styles.mainImage, styles.noImage]}>
					<Text style={styles.noImageText}>Sin imagen</Text>
				</View>
			)}

			{/* Contenedor principal */}
			<View style={styles.container}>
				{/* Contenedor de info y poster */}
				<View style={styles.infoAndPosterContainer}>
					{/* Datos principales */}
					<View style={styles.infoContainer}>
						<Text style={styles.title}>{movie.title}</Text>
						<Text style={styles.originalTitle}>{movie.originalTitle}</Text>
						<View style={styles.row}>
							<FontAwesome5 name="calendar" size={14} color="#555" style={{ marginRight: 6 }} />
							<Text style={styles.year}>{movie.releaseDate?.slice(0, 4) || "?"}</Text>
							<FontAwesome5 name="clock" size={14} color="#555" style={{ marginHorizontal: 6 }} />
							<Text style={styles.duration}>{movie.duration ? `${movie.duration}min` : "?"}</Text>
						</View>
						<Text style={styles.director}>
							DIRECTOR:{" "}
							<Text style={{ fontWeight: "bold" }}>
								{movie.directors && movie.directors.length > 0 ? movie.directors[0].name : "Desconocido"}
							</Text>
						</Text>
					</View>

					{/* Poster */}
					{movie.posterPath ? (
						<Image source={{ uri: "https://image.tmdb.org/t/p/w500" + movie.posterPath }} style={styles.posterImage} />
					) : (
						<View style={[styles.posterImage, styles.noImage]}>
							<Text style={styles.noImageText}>Sin imagen</Text>
						</View>
					)}
				</View>

				{/* Géneros */}
				<Text style={styles.genreTitle}>Géneros:</Text>
				<View style={styles.genres}>
					{movie.genres && movie.genres.length > 0 ? (
						movie.genres.map((g) => (
							<Text key={g.tmdbId} style={styles.genre}>
								{g.name}
							</Text>
						))
					) : (
						<Text style={styles.genre}>Sin géneros</Text>
					)}
				</View>

				{/* Descripción */}
				<Text style={styles.description}>{movie.overview || "Sin descripción disponible."}</Text>
			</View>
		</>
	);
};

export default MovieDetailInfo;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		// backgroundColor: "#e0acacff",
		// borderBottomColor: "#000000ff",
		// borderBottomWidth: 1,
	},
	infoAndPosterContainer: {
		// backgroundColor: "#444fcccc",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 7,
	},
	infoContainer: {
		// backgroundColor: "#c1cc44cc",
		flex: 1,
		// paddingRight: 10,
		gap: 7,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	originalTitle: {
		fontSize: 16,
		color: "#555",
		marginBottom: 4,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
	},
	year: {
		fontSize: 14,
		color: "#555",
	},
	duration: {
		fontSize: 14,
		color: "#555",
		fontStyle: "italic",
	},
	director: {
		fontSize: 14,
		marginBottom: 4,
	},
	genreTitle: {
		fontSize: 12,
		fontWeight: "600",
		marginBottom: 5,
		textTransform: "uppercase",
	},
	genres: {
		flexDirection: "row",
		flexWrap: "wrap",
		// marginBottom: 8,
		textAlign: "center",
		alignItems: "center",
		marginBottom: 15,
		// backgroundColor: "#a06a9cff",
	},
	genre: {
		borderWidth: 1,
		borderColor: "#27AAE1",
		color: "#27AAE1",
		paddingHorizontal: 5,
		paddingVertical: 5,
		borderRadius: 5,
		fontSize: 10,
		marginRight: 10,
		marginBottom: 5,
		fontWeight: "500",
	},
	description: {
		fontSize: 14,
		color: "#000000",
		// marginBottom: 20,
	},
	mainImage: {
		// flex: 1,
		width: mainPosterWidth,
		height: mainPosterHeight,
		resizeMode: "cover",
	},
	noImage: {
		backgroundColor: "#ccc",
		alignItems: "center",
		justifyContent: "center",
	},
	noImageText: {
		color: "#888",
		fontSize: 12,
		textAlign: "center",
	},
	posterImage: {
		width: smallPosterWidth,
		height: smallPosterHeight,
		borderRadius: 8,
		resizeMode: "cover",
	},
});

