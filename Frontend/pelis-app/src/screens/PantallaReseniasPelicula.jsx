//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import useMovieReviews from "../hooks/useMovieReviews";
import StitchExpectante from "../assets/img/Stitch-Expectante.png";
import StitchDesconfiado from "../assets/img/Stitch-Desconfiado.png";
import ButtonPrimary from "../components/general/ButtonPrimary";
import { useState, useEffect } from "react";
import PantallaAgregarReseniaPelicula from "./PantallaAgregarReseniaPelicula";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
//#endregion ----------- IMPORTS ------------

const ReseñaItem = ({ user, rating, comment }) => (
	<View style={styles.itemContainer}>
		<View style={styles.userAndRating}>
			<Image
				source={user?.profileImage ? { uri: user.profileImage } : require("../assets/img/User-Placeholder.png")}
				style={styles.avatar}
			/>
			<Text style={styles.userName}>{user?.username || "Usuario"}</Text>
			<View style={styles.stars}>
				<Rating
					type="custom"
					ratingCount={5}
					imageSize={25}
					readonly
					startingValue={rating}
					fractions={1}
					tintColor="#f3f3f3ff"
					ratingBackgroundColor="#ccc"
				/>
			</View>
		</View>
		<Text style={styles.review}>{comment}</Text>
	</View>
);

const PantallaReseniasPelicula = ({ navigation, route }) => {
	const movieId = useSelector((state) => state.movie.id);

	// Custom hook que obtiene las reseñas
	const { reviews, loading, error } = useMovieReviews(movieId);

	const [modalAgregarReseniaVisible, setModalAgregarReseniaVisible] = useState(false);

	const handleAgregarResenia = () => {
		setModalAgregarReseniaVisible(true);
	};

	useEffect(() => {
		if (error) {
			Toast.show({
				type: "error",
				text1: "Error al cargar reseñas",
				text2: error,
			});
		}
	}, [error]);

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#27AAE1" />
				<Text>Cargando reseñas...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
				<Image source={StitchDesconfiado} style={{ width: 180, height: 180, marginBottom: 24 }} resizeMode="contain" />
				<Text style={{ color: "#222", fontSize: 20, textAlign: "center", fontWeight: "500" }}>
					Hubo un error al cargar las reseñas de la película
				</Text>
			</View>
		);
	}

	return (
		<>
			<FlatList
				data={reviews}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => <ReseñaItem {...item} />}
				contentContainerStyle={reviews.length === 0 ? { flex: 1, justifyContent: "center" } : null}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Image source={StitchExpectante} style={styles.emptyImage} resizeMode="contain" />
						<Text style={styles.emptyText}>No se encontraron reseñas{"\n"}para esta película</Text>
						<Text style={styles.emptySubText}>¿Quieres realizar una reseña?</Text>
						<ButtonPrimary
							title="Agregar reseña"
							iconName="edit"
							onPress={handleAgregarResenia}
							style={{ width: "85%", marginTop: 8 }}
						/>
					</View>
				}
			/>
			{/* Botón para agregar reseña - cuando hay listado de reseñas */}
			{reviews.length > 0 && (
				<TouchableOpacity style={styles.fab} activeOpacity={0.7} onPress={handleAgregarResenia}>
					<FontAwesome5 name="plus" size={24} color="#fff" solid />
				</TouchableOpacity>
			)}

			<PantallaAgregarReseniaPelicula
				visible={modalAgregarReseniaVisible}
				onClose={() => setModalAgregarReseniaVisible(false)}
			/>
		</>
	);
};

export default PantallaReseniasPelicula;

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	emptyContainer: {
		// backgroundColor: "#38bc45ff",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
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
		fontWeight: "500",
		marginBottom: 4,
	},
	emptySubText: {
		fontSize: 14,
		color: "#888",
		textAlign: "center",
		marginBottom: 16,
	},
	fab: {
		position: "absolute",
		right: 24,
		bottom: 32,
		backgroundColor: "#27AE60",
		width: 56,
		height: 56,
		borderRadius: 28,
		alignItems: "center",
		justifyContent: "center",
		elevation: 5, // sombra Android
		shadowColor: "#000", // sombra iOS
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		zIndex: 10,
	},
});

