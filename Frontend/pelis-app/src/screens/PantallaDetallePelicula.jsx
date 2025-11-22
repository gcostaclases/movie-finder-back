import { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonGoBack from "../components/ButtonGoBack";
import { FontAwesome5 } from "@expo/vector-icons";
import PantallaReportarDisponibilidadPelicula from "./PantallaReportarDisponibilidadPelicula";
import PantallaAgregarReseniaPelicula from "./PantallaAgregarReseniaPelicula";
import useMovieDetail from "../hooks/useMovieDetail";
import { Dimensions } from "react-native";

const proveedores = [
	{ id: "netflix", nombre: "Netflix", imagen: require("../assets/img/prueba/provider1.png"), porcentaje: "100%" },
	{ id: "prime", nombre: "Prime Video", imagen: require("../assets/img/prueba/provider1.png"), porcentaje: "80%" },
	{ id: "disney", nombre: "Disney+", imagen: require("../assets/img/prueba/provider1.png"), porcentaje: "60%" },
	{ id: "hbomax", nombre: "HBO Max", imagen: require("../assets/img/prueba/provider1.png"), porcentaje: "50%" },
	{
		id: "crunchyroll",
		nombre: "Crunchyroll",
		imagen: require("../assets/img/prueba/provider1.png"),
		porcentaje: "30%",
	},
	{ id: "paramount", nombre: "Paramount+", imagen: require("../assets/img/prueba/provider1.png"), porcentaje: "10%" },
];

const { width } = Dimensions.get("window");
const numColumns = 3;
const itemSize = (width - 40) / numColumns;
const smallPosterWidth = itemSize;
const smallPosterHeight = Math.round(smallPosterWidth * 1.5);
const mainPosterHeight = 150;
const mainPosterWidth = "100%";
// const smallPosterWidth = 100;
// const smallPosterHeight = 150;

const PantallaDetallePelicula = ({ navigation, route }) => {
	const movieId = route.params?.movieId;
	console.log("Movie ID recibido en PantallaDetallePelicula:", movieId);
	const { movie, loading, error } = useMovieDetail(movieId);

	const [modalReportarDisponibilidadVisible, setModalReportarDisponibilidadVisible] = useState(false);
	const [modalAgregarReseniaVisible, setModalAgregarReseniaVisible] = useState(false);

	// Navegar a las Reseñas de la película
	const irAResenias = () => {
		const titulo = movie?.title || "Sin título";
		navigation.push("PantallaReseniasPelicula", { titulo });
	};
	// Navegar a los Actores de la película
	const irAActores = () => {
		const titulo = movie?.title || "Sin título";
		navigation.push("PantallaActoresPelicula", { titulo });
	};

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#27AAE1" />
				<Text>Cargando...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
				<Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>{error}</Text>
				<ButtonGoBack onPress={() => navigation.goBack()} />
			</View>
		);
	}

	if (!movie) return null;

	return (
		<>
			<ScrollView contentContainerStyle={styles.scrollContent}>
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
							<Image
								source={{ uri: "https://image.tmdb.org/t/p/w500" + movie.posterPath }}
								style={styles.posterImage}
							/>
						) : (
							<View style={[styles.posterImage, styles.noImage]}>
								<Text style={styles.noImageText}>Sin imagen</Text>
							</View>
						)}
					</View>

					{/* Géneros */}
					<Text style={styles.genreTitle}>Géneros:</Text>
					<View style={styles.genres}>
						{console.log("Pelicula:", movie)}
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

					{/* Botones principales */}
					<View style={styles.buttonsContainer}>
						{/* Botón reportar disponibilidad */}
						<ButtonPrimary
							title="Reportar disponibilidad"
							iconName="desktop"
							onPress={() => setModalReportarDisponibilidadVisible(true)}
						/>
						{/* Botón agregar reseña */}
						<ButtonPrimary title="Agregar reseña" iconName="pen" onPress={() => setModalAgregarReseniaVisible(true)} />
						{/* Botón agregar a watchlist */}
						<ButtonSecondary
							title="Agregar a la watchlist"
							iconName="eye"
							color="#1A7F37"
							onPress={() => alert("Agregado a la watchlist")}
						/>
					</View>
				</View>

				{/* Puntaje */}
				<View style={styles.container}>
					<Text style={styles.sectionTitle}>PUNTAJE</Text>
					<View style={styles.ratingRow}>
						{[...Array(5)].map((_, i) => (
							<FontAwesome5 key={i} name="star" size={28} color="#FFD600" />
						))}
						<Text style={styles.ratingText}>{movie.averageRating ? movie.averageRating : 0}/5</Text>
					</View>
				</View>

				{/* Proveedores */}
				<View style={styles.container}>
					<Text style={styles.sectionTitle}>PROVEEDORES</Text>
					<View style={styles.providersRow}>
						{proveedores.map((prov) => (
							<View key={prov.id} style={styles.providerBox}>
								<Image source={prov.imagen} style={styles.providerImg} />
								<Text style={styles.providerText}>{prov.porcentaje}</Text>
							</View>
						))}
					</View>
				</View>

				{/* Actores y Reseñas */}
				<View style={[styles.container, { borderBottomWidth: 0 }]}>
					<View style={styles.cardButtonContainer}>
						<TouchableOpacity style={styles.cardButton} onPress={irAActores}>
							<FontAwesome5 name="users" size={32} color="#27AAE1" style={styles.cardIcon} solid />
							<Text style={styles.cardButtonText}>Actores</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.cardButton} onPress={irAResenias}>
							<FontAwesome5 name="newspaper" size={32} color="#27AAE1" style={styles.cardIcon} solid />
							<Text style={styles.cardButtonText}>Reseñas</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>

			{/* Modal Reportar Disponibilidad */}
			<PantallaReportarDisponibilidadPelicula
				visible={modalReportarDisponibilidadVisible}
				onClose={() => setModalReportarDisponibilidadVisible(false)}
			/>
			{/* Modal Agregar Reseña */}
			<PantallaAgregarReseniaPelicula
				visible={modalAgregarReseniaVisible}
				onClose={() => setModalAgregarReseniaVisible(false)}
			/>
		</>
	);
};

export default PantallaDetallePelicula;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		// backgroundColor: "#e0acacff",
		borderBottomColor: "#000000ff",
		borderBottomWidth: 1,
	},
	scrollContent: {
		// padding: 16,
	},
	mainImage: {
		// flex: 1,
		width: mainPosterWidth,
		height: mainPosterHeight,
		resizeMode: "cover",
	},
	posterImage: {
		width: smallPosterWidth,
		height: smallPosterHeight,
		borderRadius: 8,
		resizeMode: "cover",
	},
	infoAndPosterContainer: {
		// backgroundColor: "#444fcccc",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 7,
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
		marginBottom: 20,
	},
	buttonsContainer: {
		gap: 15,
		// alignItems: "center",
		marginBottom: 15,
	},
	section: {
		marginBottom: 18,
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
	providersRow: {
		// backgroundColor: "#2b2fa4ff",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 20,
	},
	providerBox: {
		width: 50,
		height: 70,
		// backgroundColor: "#b3eceaff",
		// borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 6,
	},
	providerImg: {
		width: 50,
		height: 50,
		borderRadius: 5,
		resizeMode: "contain",
		marginBottom: 5,
	},
	providerText: {
		fontSize: 14,
		color: "#555",
		textAlign: "center",
	},
	cardButtonContainer: {
		// backgroundColor: "#b0dab2ff",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 20,
	},
	cardButton: {
		flex: 1,
		borderWidth: 2,
		borderColor: "#27AAE1",
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 18,
		marginHorizontal: 5,
	},
	cardIcon: {
		marginBottom: 10,
	},
	cardButtonText: {
		color: "#27AAE1",
		fontSize: 16,
		fontWeight: "500",
		textTransform: "uppercase",
		// letterSpacing: 1,
	},
});

