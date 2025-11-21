import { StyleSheet, View, Text, FlatList, Image, Dimensions } from "react-native";

const actores = [
	{
		id: "1",
		nombre: "Kikunosuke Toya",
		rol: "DENJI (VOICE)",
		imagen: require("../assets/img/prueba/actor1.jpg"),
	},
	{
		id: "2",
		nombre: "Kikunosuke Toya",
		rol: "DENJI (VOICE)",
		imagen: require("../assets/img/prueba/actor1.jpg"),
	},
	{
		id: "3",
		nombre: "Kikunosuke Toya",
		rol: "DENJI (VOICE)",
		imagen: require("../assets/img/prueba/actor1.jpg"),
	},
	{
		id: "4",
		nombre: "Kikunosuke Toya",
		rol: "DENJI (VOICE)",
		imagen: require("../assets/img/prueba/actor1.jpg"),
	},
	{
		id: "5",
		nombre: "Kikunosuke Toya",
		rol: "DENJI (VOICE)",
		imagen: require("../assets/img/prueba/actor1.jpg"),
	},
	{
		id: "6",
		nombre: "Kikunosuke Toya",
		rol: "DENJI (VOICE)",
		imagen: require("../assets/img/prueba/actor1.jpg"),
	},
];

const { width } = Dimensions.get("window");
const numColumns = 3;
const itemSize = (width - 48) / numColumns; // 48 = paddingHorizontal + margen total

const ActorItem = ({ nombre, rol, imagen }) => (
	<View style={styles.actorBox}>
		<Image source={imagen} style={styles.actorImage} />
		<Text style={styles.actorName}>{nombre}</Text>
		<Text style={styles.actorRole}>{rol}</Text>
	</View>
);

const PantallaActoresPelicula = () => {
	return (
		<View style={styles.container}>
			<FlatList
				data={actores}
				keyExtractor={(item) => item.id}
				numColumns={numColumns}
				renderItem={({ item }) => <ActorItem {...item} />}
				contentContainerStyle={styles.listContainer}
				showsVerticalScrollIndicator={false}
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
		width: itemSize,
		flex: 1,
		// backgroundColor: "#42d147ff",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 5,
		marginHorizontal: 4,
	},
	actorImage: {
		width: "100%",
		height: 140,
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
});

