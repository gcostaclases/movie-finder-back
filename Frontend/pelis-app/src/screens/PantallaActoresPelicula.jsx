import { StyleSheet, View, Text, FlatList, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const numColumns = 3;
// const itemSize = (width - 48) / numColumns; // 48 = paddingHorizontal + margen total
const itemSize = (width - 40) / numColumns; // 40 = paddingHorizontal + margen
const posterWidth = itemSize;
const posterHeight = Math.round(posterWidth * 1.5); // Proporción de poster

const ActorItem = ({ nombre, rol, imagen }) => {
	const uri = imagen ? `https://image.tmdb.org/t/p/w500${imagen}` : null;

	return (
		<View style={styles.actorBox}>
			{uri ? (
				<Image source={{ uri }} style={styles.actorImage} />
			) : (
				<View style={[styles.actorImage, styles.noImage]}>
					<Text style={styles.noImageText}>Sin imagen</Text>
				</View>
			)}
			<Text style={styles.actorName}>{nombre}</Text>
			<Text style={styles.actorRole}>{rol}</Text>
		</View>
	);
};

const PantallaActoresPelicula = ({ route }) => {
	const actores = route.params?.actores || [];

	return (
		<View style={styles.container}>
			<FlatList
				data={actores}
				keyExtractor={(item, index) => (item._id ? item._id.toString() : index.toString())}
				numColumns={numColumns}
				renderItem={({ item }) => <ActorItem nombre={item.name} rol={item.role} imagen={item.image} />}
				contentContainerStyle={styles.listContainer}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 30 }}>Sin actores para esta película.</Text>}
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
