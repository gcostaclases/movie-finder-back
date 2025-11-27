import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import useProviders from "../../hooks/useProviders";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProvider } from "../../store/slices/userSlice";

const UserAddProvider = () => {
	const dispatch = useDispatch();

	// Custom hook para obtener proveedores
	const { loading, error } = useProviders();

	const providers = useSelector((state) => state.providers.providers);
	const seleccionado = useSelector((state) => state.user.selectedProvider);

	// Si el proveedor ya está seleccionado, lo deselecciono; si no, lo selecciono
	const handleSelect = (id) => {
		dispatch(setSelectedProvider(seleccionado === id ? null : id));
	};

	return (
		<>
			{/* Título */}
			<Text style={styles.titulo}>¿Cuáles proveedores tienes contratados?</Text>

			{/* Proveedores */}
			<View style={styles.proveedoresGrid}>
				{loading ? (
					<Text>Cargando proveedores...</Text>
				) : error ? (
					<Text style={{ color: "red" }}>{error}</Text>
				) : (
					providers.map((prov) => (
						<TouchableOpacity
							key={prov._id}
							style={[styles.proveedorBox, seleccionado === prov._id && styles.proveedorBoxActivo]}
							activeOpacity={1}
							onPress={() => handleSelect(prov._id)}>
							<Image
								source={prov.logo ? { uri: prov.logo } : undefined}
								style={[
									styles.proveedorImg,
									{ opacity: seleccionado === prov._id ? 1 : 0.4 },
									!prov.logo && { backgroundColor: "#ccc" },
								]}
							/>
							<Text style={[styles.proveedorNombre, { opacity: seleccionado === prov._id ? 1 : 0.6 }]}>
								{prov.name}
							</Text>
						</TouchableOpacity>
					))
				)}
			</View>
		</>
	);
};

export default UserAddProvider;

const styles = StyleSheet.create({
	titulo: {
		fontSize: Platform.OS === "ios" ? 16 : 14,
		// fontSize: 18,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 28,
		marginTop: 20,
		width: "70%",
		// backgroundColor: "#cd4949ff",
	},
	proveedoresGrid: {
		// backgroundColor: "#2987becc",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 18,
		marginBottom: 10,
	},
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

