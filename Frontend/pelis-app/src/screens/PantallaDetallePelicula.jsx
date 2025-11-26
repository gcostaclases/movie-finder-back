import { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import ButtonSecondary from "../components/general/ButtonSecondary";
import ButtonGoBack from "../components/general/ButtonGoBack";
import ButtonCard from "../components/general/ButtonCard";
import PantallaReportarDisponibilidadPelicula from "./PantallaReportarDisponibilidadPelicula";
import PantallaAgregarReseniaPelicula from "./PantallaAgregarReseniaPelicula";
import useMovieDetail from "../hooks/useMovieDetail";
import MovieDetailInfo from "../components/movie/MovieDetailInfo";
import MovieDetailProviders from "../components/movie/MovieDetailProviders";
import MovieDetailRating from "../components/movie/MovieDetailRating";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMovieDetail } from "../store/slices/movieSlice";

const PantallaDetallePelicula = ({ navigation, route }) => {
	const movieId = route.params?.movieId;

	const dispatch = useDispatch();

	// Custom hook para obtener los detalles de la película
	const { movie, loading, error } = useMovieDetail(movieId);

	// Estados para controlar la visibilidad de las modales
	const [modalReportarDisponibilidadVisible, setModalReportarDisponibilidadVisible] = useState(false);
	const [modalAgregarReseniaVisible, setModalAgregarReseniaVisible] = useState(false);

	// Navegar a las Reseñas de la película
	const irAResenias = () => {
		const titulo = movie?.title || "Reseñas";
		console.log("Navegando a reseñas de la película:", movie?._id);
		navigation.push("PantallaReseniasPelicula", { titulo, movieId: movie?._id });
	};

	// Navegar a los Actores de la película
	const irAActores = () => {
		const titulo = movie?.title || "Actores";
		navigation.push("PantallaActoresPelicula", {
			titulo,
			actores: movie.actors || [],
		});
	};

	// Acá seteo la info necesaria de la película en el store
	useEffect(() => {
		if (movie) {
			dispatch(setMovieDetail(movie));
		}
	}, [movie]);

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
				{/* Info principal de la película */}
				<MovieDetailInfo movie={movie} />

				{/* Contenedor */}
				<View style={styles.container}>
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
				<MovieDetailRating />

				{/* Proveedores */}
				<MovieDetailProviders />

				{/* Actores y Reseñas */}
				<View style={[styles.container, { borderBottomWidth: 0 }]}>
					<View style={styles.cardButtonContainer}>
						<ButtonCard iconName="users" text="Actores" onPress={irAActores} />
						<ButtonCard iconName="newspaper" text="Reseñas" onPress={irAResenias} />
					</View>
				</View>
			</ScrollView>

			{/* Modal Reportar Disponibilidad */}
			<PantallaReportarDisponibilidadPelicula
				visible={modalReportarDisponibilidadVisible}
				onClose={() => setModalReportarDisponibilidadVisible(false)}
				movieId={movieId}
			/>
			{/* Modal Agregar Reseña */}
			<PantallaAgregarReseniaPelicula
				visible={modalAgregarReseniaVisible}
				onClose={() => setModalAgregarReseniaVisible(false)}
				movieId={movieId}
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
	buttonsContainer: {
		gap: 15,
		// alignItems: "center",
		marginBottom: 15,
	},
	cardButtonContainer: {
		// backgroundColor: "#b0dab2ff",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 20,
	},
});

