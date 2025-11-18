import { StyleSheet, View, FlatList, Image, TouchableOpacity, Dimensions } from "react-native";

const movies = [
	{
		id: "1",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 1",
	},
	{
		id: "2",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 2",
	},
	{
		id: "3",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 3",
	},
	{
		id: "4",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 4",
	},
	{
		id: "5",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 5",
	},
	{
		id: "6",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 6",
	},
	{
		id: "7",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 7",
	},
	{
		id: "8",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 8",
	},
	{
		id: "9",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 9",
	},
	{
		id: "10",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 10",
	},
	{
		id: "11",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 11",
	},
	{
		id: "12",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 12",
	},
	{
		id: "13",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 13",
	},
	{
		id: "14",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 14",
	},
	{
		id: "15",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 15",
	},
	{
		id: "16",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 16",
	},
	{
		id: "17",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 17",
	},
	{
		id: "18",
		image: require("../assets/img/prueba/movie1.jpg"),
		titulo: "Movie 18",
	},
];

const { width } = Dimensions.get("window");
const numColumns = 3;
const itemSize = (width - 40) / numColumns; // 40 = paddingHorizontal + margen

const PantallaPeliculas = ({ navigation }) => {
	// Navegar al Detalle de la película
	const irADetalle = (item) => {
		navigation.push("PantallaDetallePelicula", { titulo: item.titulo });
	};

	return (
		<View style={styles.container}>
			{/* Lista de películas */}
			<FlatList
				data={movies}
				keyExtractor={(item) => item.id}
				numColumns={numColumns}
				renderItem={({ item }) => (
					<View style={[styles.movieContainer, { width: itemSize }]}>
						<TouchableOpacity onPress={() => irADetalle(item)} style={{ width: "100%" }}>
							<Image source={item.image} style={styles.movieImage} />
						</TouchableOpacity>
					</View>
				)}
				contentContainerStyle={styles.listContainer}
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
		width: "100%",
		height: 140,
		borderRadius: 5,
		resizeMode: "cover",
	},
});

