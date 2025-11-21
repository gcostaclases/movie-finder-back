import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, Platform } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import ButtonPrimary from "../components/ButtonPrimary";

// --- Proveedores ---
const proveedores = [
	{ id: "netflix", nombre: "NETFLIX", imagen: require("../assets/img/prueba/provider1.png") },
	{ id: "prime", nombre: "PRIME VIDEO", imagen: require("../assets/img/prueba/provider1.png") },
	{ id: "disney", nombre: "DISNEY+", imagen: require("../assets/img/prueba/provider1.png") },
	{ id: "hbomax", nombre: "HBO MAX", imagen: require("../assets/img/prueba/provider1.png") },
	{ id: "crunchyroll", nombre: "CRUNCHYROLL", imagen: require("../assets/img/prueba/provider1.png") },
	{ id: "paramount", nombre: "PARAMOUNT+", imagen: require("../assets/img/prueba/provider1.png") },
	{ id: "otro", nombre: "OTRO", imagen: require("../assets/img/prueba/provider1.png") },
];

const PantallaReportarDisponibilidadPelicula = ({ visible, onClose }) => {
	const [seleccionado, setSeleccionado] = useState(null);

	// --- Selección de proveedor ---
	const handleSelect = (id) => {
		if (seleccionado === id) {
			setSeleccionado(null); // Si ya está seleccionado, lo desselecciono
		} else {
			setSeleccionado(id); // Si no, lo selecciono
		}
	};

	return (
		<Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
			{/* --- Modal principal --- */}
			<View style={[styles.modalWrapper]}>
				<View style={styles.modalContainer}>
					{/* --- Botón cerrar --- */}
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<FontAwesome5 name="times" size={28} color="#888" />
					</TouchableOpacity>
					{/* --- Título --- */}
					<Text style={styles.titulo}>¿En dónde viste esta película?</Text>
					{/* --- Grid de proveedores --- */}
					<View style={styles.proveedoresGrid}>
						{proveedores.map((prov) => (
							<TouchableOpacity
								key={prov.id}
								style={[styles.proveedorBox, seleccionado === prov.id && styles.proveedorBoxActivo]}
								activeOpacity={1}
								onPress={() => handleSelect(prov.id)}>
								<Image
									source={prov.imagen}
									style={[styles.proveedorImg, { opacity: seleccionado === prov.id ? 1 : 0.4 }]}
								/>
								<Text style={[styles.proveedorNombre, { opacity: seleccionado === prov.id ? 1 : 0.6 }]}>
									{prov.nombre}
								</Text>
							</TouchableOpacity>
						))}
					</View>
					{/* Botón Reportar */}
					<ButtonPrimary
						title="Reportar"
						onPress={() => {
							//TODO: Acción de reportar
							onClose();
						}}
						style={{ width: "85%", marginTop: 10, opacity: seleccionado ? 1 : 0.5 }}
						disabled={!seleccionado}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default PantallaReportarDisponibilidadPelicula;

// --- Estilos ---
const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		justifyContent: "flex-end",
	},
	// Modal principal
	modalContainer: {
		backgroundColor: "#FFFFFF",
		// backgroundColor: "#45b843ff",
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		paddingTop: 20,
		paddingBottom: 40,
		// paddingHorizontal: 24,
		alignItems: "center",
		zIndex: 1,
		shadowColor: "#000000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: -5 },
	},
	// Botón cerrar
	closeButton: {
		position: "absolute",
		top: 18,
		right: 18,
		zIndex: 2,
		padding: 8,
	},
	// Título
	titulo: {
		fontSize: Platform.OS === "ios" ? 16 : 14,
		// fontSize: 18,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 28,
		marginTop: 10,
	},
	// Grid de proveedores
	proveedoresGrid: {
		// backgroundColor: "#2987becc",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 18,
		marginBottom: 10,
	},
	// Proveedor individual
	proveedorBox: {
		width: 90,
		height: 90,
		backgroundColor: "#F5F5F5",
		// backgroundColor: "#c5ce43ff",
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
		margin: 8,
		borderWidth: 2,
		borderColor: "transparent",
	},
	proveedorBoxActivo: {
		borderColor: "#27AAE1",
		backgroundColor: "#E3F7FF",
	},
	proveedorImg: {
		width: 40,
		height: 40,
		borderRadius: 5,
		marginBottom: 8,
		resizeMode: "contain",
	},
	proveedorNombre: {
		// fontSize: Platform.OS === "ios" ? 10 : 8,
		fontSize: 8,
		fontWeight: "600",
		color: "#222",
		textAlign: "center",
		textTransform: "uppercase",
	},
});

