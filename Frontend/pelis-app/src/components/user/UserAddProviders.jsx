import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, ActivityIndicator } from "react-native";
import useProviders from "../../hooks/useProviders";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProviders } from "../../store/slices/userSlice";

const UserAddProvider = () => {
	const dispatch = useDispatch();

	// Custom hook para obtener proveedores
	const { loading, error } = useProviders();

	const providers = useSelector((state) => state.providers.providers);
	const userProviders = useSelector((state) => state.user.providers);
	const seleccionados = useSelector((state) => state.user.selectedProviders);

	// Inicializa seleccionados con los proveedores de usuario solo si está vacío (seleccionados) y ademas si el usuario tiene proveedores
	useEffect(() => {
		if (seleccionados.length === 0 && userProviders.length > 0) {
			const ids = userProviders.map((prov) => prov._id);
			dispatch(setSelectedProviders(ids));
		}
	}, [userProviders, seleccionados.length, dispatch]);

	const toggleSelect = (id) => {
		let nuevos;
		if (seleccionados.includes(id)) {
			nuevos = seleccionados.filter((pid) => pid !== id);
		} else {
			nuevos = [...seleccionados, id];
		}
		dispatch(setSelectedProviders(nuevos));
	};

	if (loading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color="#27AAE1" />
				<Text style={styles.loadingText}>Cargando proveedores...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.centered}>
				<Text style={styles.errorText}>{error}</Text>
			</View>
		);
	}

	return (
		<>
			{/* Título */}
			<Text style={styles.titulo}>¿Cuáles proveedores tienes contratados?</Text>

			{/* Proveedores */}
			<View style={styles.proveedoresGrid}>
				{providers.map((prov) => (
					<TouchableOpacity
						key={prov._id}
						style={[styles.proveedorBox, seleccionados.includes(prov._id) && styles.proveedorBoxActivo]}
						activeOpacity={1}
						onPress={() => toggleSelect(prov._id)}>
						<Image
							source={prov.logo ? { uri: prov.logo } : undefined}
							style={[
								styles.proveedorImg,
								{ opacity: seleccionados.includes(prov._id) ? 1 : 0.4 },
								!prov.logo && { backgroundColor: "#ccc" },
							]}
						/>
						<Text style={[styles.proveedorNombre, { opacity: seleccionados.includes(prov._id) ? 1 : 0.6 }]}>
							{prov.name}
						</Text>
					</TouchableOpacity>
				))}
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
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	loadingText: {
		marginTop: 10,
		color: "#222",
		fontSize: 14,
	},
	errorText: {
		color: "red",
		fontSize: 14,
		textAlign: "center",
	},
});

