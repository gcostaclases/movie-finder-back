//#region ----------- IMPORTS ------------
import { StyleSheet, View, FlatList, Image, TouchableOpacity, Dimensions, Text, ActivityIndicator } from "react-native";
import useMovies from "../hooks/useMovies";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import StitchDesconfiado from "../assets/img/Stitch-Desconfiado.png";
//#endregion ------------ IMPORTS ------------

// Dimensiones para calcular el tamaño de los posters
const { width } = Dimensions.get("window");
const numColumns = 3;
const itemSize = (width - 40) / numColumns; // 40 = paddingHorizontal + margen
const posterWidth = itemSize;
const posterHeight = Math.round(posterWidth * 1.5); // Proporción de poster

const PantallaPeliculas = ({ navigation }) => {
	// Custom hook para obtener películas
	const { movies, loading, error, loadMore, hasMore } = useMovies(12);

	// Navegar al Detalle de la película
	const irADetalle = (movie) => {
		// console.log("Movie:", movie);
		navigation.push("PantallaDetallePelicula", { movieId: movie._id, movieTitle: movie.title });
	};

	useEffect(() => {
		if (error) {
			Toast.show({
				type: "error",
				text1: "Error al cargar películas",
				text2: error,
			});
		}
	}, [error]);

	return (
		<View style={styles.container}>
			{/* Lista de películas */}
			<FlatList
				data={movies}
				keyExtractor={(movie) => movie._id}
				numColumns={numColumns}
				renderItem={({ item }) => (
					<View style={[styles.movieContainer, { width: itemSize }]}>
						<TouchableOpacity onPress={() => irADetalle(item)} style={{ width: "100%" }}>
							{item.posterPath ? (
								<Image
									source={{ uri: "https://image.tmdb.org/t/p/w500" + item.posterPath }}
									style={styles.movieImage}
								/>
							) : (
								<View style={styles.noImage}>
									<Text style={styles.noImageText}>Sin imagen</Text>
								</View>
							)}
						</TouchableOpacity>
					</View>
				)}
				contentContainerStyle={styles.listContainer}
				onEndReached={hasMore ? loadMore : null}
				onEndReachedThreshold={0.5}
				ListFooterComponent={
					loading && <ActivityIndicator size="large" color="#27AAE1" style={{ marginVertical: 20 }} />
				}
				ListEmptyComponent={
					!loading &&
					(error || movies.length === 0) && (
						<View style={styles.emptyContainer}>
							<Image source={StitchDesconfiado} style={styles.emptyImage} resizeMode="contain" />
							<Text style={styles.emptyText}>
								{error ? "Ocurrió un error al cargar las películas" : "No se encontraron películas"}
							</Text>
						</View>
					)
				}
			/>
		</View>
	);
};

export default PantallaPeliculas;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#c62e2eff",
	},
	listContainer: {
		// backgroundColor: "#21c9cfff",
		flexGrow: 1,
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	movieContainer: {
		// backgroundColor: "#c6b81fff",
		flex: 1 / 3,
		alignItems: "center",
		justifyContent: "center",
		margin: 5,
	},
	movieImage: {
		width: itemSize,
		height: posterHeight,
		borderRadius: 5,
		resizeMode: "cover",
	},
	noImage: {
		width: itemSize,
		height: posterHeight,
		borderRadius: 5,
		backgroundColor: "#ccc",
		alignItems: "center",
		justifyContent: "center",
	},
	noImageText: {
		color: "#888",
		fontSize: 12,
		textAlign: "center",
	},
	emptyContainer: {
		// backgroundColor: "#ba1d1dff",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		// marginTop: 30,
	},
	emptyImage: {
		width: 180,
		height: 180,
		marginBottom: 20,
	},
	emptyText: {
		fontSize: 18,
		color: "#222",
		textAlign: "center",
		fontWeight: "500", // Semi-bold
	},
});

