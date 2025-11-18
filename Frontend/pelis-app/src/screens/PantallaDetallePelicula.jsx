import React from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonGoBack from "../components/ButtonGoBack";
import { FontAwesome5 } from "@expo/vector-icons";

const PantallaDetallePelicula = ({ navigation }) => {
	return (
		// <View style={styles.container}>
		<ScrollView contentContainerStyle={styles.scrollContent}>
			{/* Imagen principal */}
			<Image source={require("../assets/img/prueba/movie1.jpg")} style={styles.mainImage} />

			{/* Contenedor principal */}
			<View style={styles.container}>
				{/* Contenedor de info y poster */}
				<View style={styles.infoAndPosterContainer}>
					{/* Datos principales */}
					<View style={styles.infoContainer}>
						<Text style={styles.title}>Chainsaw Man – The Movie: Reze Arc</Text>
						<Text style={styles.originalTitle}>チェンソーマン レゼ篇</Text>
						<View style={styles.row}>
							<FontAwesome5 name="calendar" size={14} color="#555" style={{ marginRight: 6 }} />
							<Text style={styles.year}>2025</Text>
							<FontAwesome5 name="clock" size={14} color="#555" style={{ marginHorizontal: 6 }} />
							<Text style={styles.duration}>100min</Text>
						</View>
						<Text style={styles.director}>
							DIRECTOR: <Text style={{ fontWeight: "bold" }}>Tatsuya Yoshihara</Text>
						</Text>
					</View>

					{/* Poster */}
					<Image source={require("../assets/img/prueba/movie1.jpg")} style={styles.posterImage} />
				</View>

				{/* Géneros */}
				<Text style={styles.genreTitle}>Géneros:</Text>
				<View style={styles.genres}>
					<Text style={styles.genre}>Fantasía</Text>
					<Text style={styles.genre}>Romance</Text>
					<Text style={styles.genre}>Acción</Text>
					<Text style={styles.genre}>Animación</Text>
					<Text style={styles.genre}>Animación</Text>
					<Text style={styles.genre}>Animación</Text>
					<Text style={styles.genre}>Animación</Text>
					<Text style={styles.genre}>Animación</Text>
					<Text style={styles.genre}>Animación</Text>
				</View>

				{/* Descripción */}
				<Text style={styles.description}>
					EVERYONE’S AFTER MY CHAINSAW HEART! WHAT ABOUT DENJI’S HEART?!?
					{"\n\n"}
					In a brutal war between devils, humans, and secret enemies, a mysterious girl named Reze has stepped into
					Denji’s world, and he faces his deadliest battle yet, fueled by love in a world where survival knows no rules.
				</Text>

				{/* Botones principales */}
				<View style={styles.buttonsContainer}>
					<ButtonPrimary title="Reportar disponibilidad" iconName="desktop" onPress={() => {}} />
					<ButtonPrimary title="Agregar reseña" iconName="pen" onPress={() => {}} />
					<ButtonSecondary title="Agregar a la watchlist" iconName="eye" color="#1A7F37" onPress={() => {}} />
				</View>
			</View>

			{/* Puntaje */}
			<View style={styles.container}>
				<Text style={styles.sectionTitle}>PUNTAJE</Text>
				<View style={styles.ratingRow}>
					{[...Array(5)].map((_, i) => (
						<FontAwesome5 key={i} name="star" size={28} color="#FFD600" />
					))}
					<Text style={styles.ratingText}>0/5</Text>
				</View>
			</View>

			{/* Proveedores */}
			<View style={styles.container}>
				<Text style={styles.sectionTitle}>PROVEEDORES</Text>
				<View style={styles.providersRow}>
					{[...Array(8)].map((_, i) => (
						<View key={i} style={styles.providerBox}>
							<Text style={styles.providerText}>100%</Text>
						</View>
					))}
				</View>
			</View>

			{/* Actores y Reseñas */}
			<View style={[styles.container, { borderBottomWidth: 0 }]}>
				<View style={styles.cardButtonContainer}>
					<TouchableOpacity style={styles.cardButton} onPress={() => {}}>
						<FontAwesome5 name="users" size={32} color="#27AAE1" style={styles.cardIcon} solid />
						<Text style={styles.cardButtonText}>Actores</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cardButton} onPress={() => {}}>
						<FontAwesome5 name="newspaper" size={32} color="#27AAE1" style={styles.cardIcon} solid />
						<Text style={styles.cardButtonText}>Reseñas</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
		// </View>
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
		width: "100%",
		height: 150,
		resizeMode: "cover",
	},
	posterImage: {
		width: 100, // ancho fijo
		height: "100%",
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
		marginBottom: 12,
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
		height: 50,
		backgroundColor: "#b3eceaff",
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		// marginRight: 12,
	},
	providerText: {
		fontSize: 14,
		color: "#555",
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

