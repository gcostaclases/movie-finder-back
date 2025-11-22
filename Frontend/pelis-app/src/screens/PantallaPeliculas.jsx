import { StyleSheet, View, FlatList, Image, TouchableOpacity, Dimensions, Text } from "react-native";
import useMovies from "../hooks/useMovies";
import { useEffect, useState } from "react";

const { width } = Dimensions.get("window");
const numColumns = 3;
const itemSize = (width - 40) / numColumns; // 40 = paddingHorizontal + margen

const posterWidth = itemSize; // o un valor fijo, ej: 100
const posterHeight = Math.round(posterWidth * 1.5); // proporción típica de poster

const PantallaPeliculas = ({ navigation }) => {
	const { movies, loading, error, loadMore, hasMore } = useMovies(12);
	// const { movies, loading, error } = useMovies(1, 12);

	// Navegar al Detalle de la película
	const irADetalle = (movie) => {
		// console.log("Movie:", movie);
		navigation.push("PantallaDetallePelicula", { movieId: movie._id, movieTitle: movie.title });
	};

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
					loading ? <Text style={{ textAlign: "center", justifyContent: "center" }}>Cargando...</Text> : null
				}
			/>
			{/* {loading && <Text style={{ textAlign: "center", justifyContent: "center" }}>Cargando...</Text>} */}
			{error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}
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
});

