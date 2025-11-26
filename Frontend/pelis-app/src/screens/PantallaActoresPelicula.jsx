//#region ----------- IMPORTS ------------
import { StyleSheet, View, Text, FlatList, Image, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import StitchDesconfiado from "../assets/img/Stitch-Desconfiado.png";
//#endregion ------------ IMPORTS ------------

const { width } = Dimensions.get("window");
const numColumns = 3;
// const itemSize = (width - 48) / numColumns; // 48 = paddingHorizontal + margen total
const itemSize = (width - 40) / numColumns; // 40 = paddingHorizontal + margen
const posterWidth = itemSize;
const posterHeight = Math.round(posterWidth * 1.5); // Proporción de poster

const ActorItem = ({ name, role, image }) => {
	const uri = image ? `https://image.tmdb.org/t/p/w500${image}` : null;

	return (
		<View style={styles.actorBox}>
			{/* Si hay imagen se muestra sino se muestra un placeholder con texto sin imagen */}
			{uri ? (
				<Image source={{ uri }} style={styles.actorImage} />
			) : (
				<View style={[styles.actorImage, styles.noImage]}>
					<Text style={styles.noImageText}>Sin imagen</Text>
				</View>
			)}
			<Text style={styles.actorName}>{name}</Text>
			<Text style={styles.actorRole}>{role}</Text>
		</View>
	);
};

const PantallaActoresPelicula = ({ route }) => {
	const actors = useSelector((state) => state.movie.actors);
	// console.log("Actores de la película:", actors);

	return (
		<View style={styles.container}>
			<FlatList
				data={actors}
				keyExtractor={(item, index) => item._id}
				numColumns={numColumns}
				renderItem={({ item }) => <ActorItem name={item.name} role={item.role} image={item.image} />}
				contentContainerStyle={styles.listContainer}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
						<Image
							source={StitchDesconfiado}
							style={{ width: 180, height: 180, marginBottom: 24 }}
							resizeMode="contain"
						/>
						<Text style={{ color: "#222", fontSize: 20, textAlign: "center", fontWeight: "500" }}>
							No se encontraron actores para esta película
						</Text>
					</View>
				}
			/>
		</View>
	);
};

export default PantallaActoresPelicula;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#d39292ff",
		padding: 15,
	},
	listContainer: {
		flexGrow: 1,
		// backgroundColor: "#4646bfff",
		gap: 15,
	},
	actorBox: {
		// width: itemSize,
		flex: 1 / 3,
		// backgroundColor: "#42d147ff",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 5,
		marginHorizontal: 4,
	},
	actorImage: {
		width: "100%",
		// height: 140,
		// width: itemSize,
		height: posterHeight,
		borderRadius: 5,
		marginBottom: 7,
		resizeMode: "cover",
	},
	actorName: {
		fontWeight: "bold",
		fontSize: 15,
		color: "#222",
		textAlign: "center",
		marginBottom: 2,
	},
	actorRole: {
		fontSize: 12,
		color: "#555",
		textAlign: "center",
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
});

