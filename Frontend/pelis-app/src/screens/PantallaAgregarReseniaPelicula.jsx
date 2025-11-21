import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import ButtonPrimary from "../components/ButtonPrimary";

const PantallaAgregarReseniaPelicula = ({ visible, onClose }) => {
	const [puntaje, setPuntaje] = useState(0);
	const [resenia, setResenia] = useState("");

	const handleStarPress = (index) => {
		setPuntaje(index + 1);
	};

	return (
		<Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
			<View style={styles.modalWrapper}>
				<View style={styles.modalContainer}>
					{/* --- Botón cerrar --- */}
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<FontAwesome5 name="times" size={28} color="#888" />
					</TouchableOpacity>
					{/* --- Título calificación --- */}
					<Text style={styles.titulo}>Califica la película:</Text>
					{/* --- Estrellas --- */}
					<View style={styles.starsRow}>
						{[...Array(5)].map((_, i) => (
							<TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
								<FontAwesome5
									name="star"
									size={32}
									color={i < puntaje ? "#FFD600" : "#E0E0E0"}
									style={{ marginHorizontal: 4 }}
									solid
								/>
							</TouchableOpacity>
						))}
						<Text style={styles.ratingText}>{puntaje}/5</Text>
					</View>
					{/* --- Título reseña --- */}
					<Text style={styles.titulo}>Escriba su reseña:</Text>
					{/* --- Campo de texto --- */}
					<TextInput
						style={styles.textInput}
						multiline
						placeholder="Escriba aquí..."
						value={resenia}
						onChangeText={setResenia}
						maxLength={400}
					/>
					{/* --- Botón Reseñar --- */}
					<ButtonPrimary
						title="Reseñar"
						onPress={() => {
							// TODO: Acción de enviar reseña
							onClose();
						}}
						style={{ width: "80%", marginTop: 10, opacity: puntaje && resenia ? 1 : 0.5 }}
						disabled={!puntaje || !resenia}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default PantallaAgregarReseniaPelicula;

// --- Estilos ---
const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		justifyContent: "flex-end",
	},
	modalContainer: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		paddingTop: 20,
		paddingBottom: 50, // Más alto
		alignItems: "center",
		zIndex: 1,
		shadowColor: "#000000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: -5 },
		minHeight: 420, // Altura mínima mayor
	},
	closeButton: {
		position: "absolute",
		top: 18,
		right: 18,
		zIndex: 2,
		padding: 8,
	},
	titulo: {
		fontSize: 16,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 18,
		marginTop: 10,
	},
	starsRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 18,
	},
	ratingText: {
		fontSize: 18,
		fontWeight: "500",
		marginLeft: 10,
		color: "#222",
	},
	textInput: {
		width: 320,
		height: 170, // Más alto
		backgroundColor: "#D9E7EF",
		borderRadius: 10,
		padding: 12,
		fontSize: 15,
		color: "#222",
		textAlignVertical: "top",
		marginBottom: 18,
	},
});

