import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const reseñas = [
	{
		id: "1",
		nombre: "Juancito",
		avatar: require("../assets/img/prueba/hombre1.png"),
		texto: "¡Está bastante bien!",
		puntaje: 4,
	},
	{
		id: "2",
		nombre: "Francisco",
		avatar: require("../assets/img/prueba/hombre1.png"),
		texto:
			"Lorem ipsum dolor sit amet consectetur. Egestas nunc ut eros massa est massa. Volutpat sollicitudin hendrerit pulvinar non vestibulum sed eget habitant. Ipsum eros commodo amet diam. Volutpat volutpat eget pellentesque ac. Sed lobortis ut arcu morbi imperdiet. Vestibulum pellentesque ut eget leo in sed.",
		puntaje: 5,
	},
	{
		id: "3",
		nombre: "Lorena",
		avatar: require("../assets/img/prueba/hombre1.png"),
		texto:
			"Lorem ipsum dolor sit amet consectetur. Egestas nunc ut eros massa est massa. Volutpat sollicitudin hendrerit pulvinar non vestibulum sed eget habitant. Ipsum eros commodo amet diam. Volutpat volutpat eget pellentesque ac. Sed lobortis ut arcu morbi imperdiet. Vestibulum pellentesque ut eget leo in sed.",
		puntaje: 3,
	},
	{
		id: "4",
		nombre: "Victoria",
		avatar: require("../assets/img/prueba/hombre1.png"),
		texto:
			"Lorem ipsum dolor sit amet consectetur. Egestas nunc ut eros massa est massa. Volutpat sollicitudin hendrerit pulvinar non vestibulum sed eget habitant. Ipsum eros commodo amet diam. Volutpat volutpat eget pellentesque ac. Sed lobortis ut arcu morbi imperdiet. Vestibulum pellentesque ut eget leo in sed.",
		puntaje: 4,
	},
	{
		id: "5",
		nombre: "Pablo",
		avatar: require("../assets/img/prueba/hombre1.png"),
		texto:
			"Lorem ipsum dolor sit amet consectetur. Egestas nunc ut eros massa est massa. Volutpat sollicitudin hendrerit pulvinar non vestibulum sed eget habitant. Ipsum eros commodo amet diam. Volutpat volutpat eget pellentesque ac. Sed lobortis ut arcu morbi imperdiet. Vestibulum pellentesque ut eget leo in sed.",
		puntaje: 2,
	},
];

const ReseñaItem = ({ nombre, avatar, texto, puntaje }) => (
	<View style={styles.itemContainer}>
		<View style={styles.userAndRating}>
			<Image source={avatar} style={styles.avatar} />
			<Text style={styles.userName}>{nombre}</Text>
			<View style={styles.stars}>
				{[...Array(5)].map((_, i) => (
					<FontAwesome5
						key={i}
						name="star"
						size={20}
						color={i < puntaje ? "#FFD600" : "#E0E0E0"}
						style={{ marginLeft: 2 }}
						solid
					/>
				))}
			</View>
		</View>
		<Text style={styles.review}>{texto}</Text>
	</View>
);

const PantallaReseniasPelicula = () => {
	return (
		<FlatList
			data={reseñas}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <ReseñaItem {...item} />}
			contentContainerStyle={styles.listContainer}
			ItemSeparatorComponent={() => <View style={styles.separator} />}
		/>
	);
};

export default PantallaReseniasPelicula;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContainer: {
		// backgroundColor: "#27ddc5ff",
		// paddingVertical: 0,
	},
	itemContainer: {
		// backgroundColor: "#d23131ff",
		paddingVertical: 14,
		paddingHorizontal: 16,
	},
	userAndRating: {
		// backgroundColor: "#299e38ff",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},
	avatar: {
		width: 32,
		height: 32,
		borderRadius: 16,
		marginRight: 8,
	},
	userName: {
		// backgroundColor: "#f2f142ff",
		color: "#27AAE1",
		fontWeight: "bold",
		fontSize: 16,
		marginRight: 8,
	},
	stars: {
		flexDirection: "row",
		marginLeft: "auto",
	},
	review: {
		fontSize: 14,
		color: "#222",
		lineHeight: 18,
	},
	separator: {
		height: 1,
		backgroundColor: "#E0E0E0",
	},
});

