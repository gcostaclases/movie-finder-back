//#region ----------- IMPORTS ------------
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useState } from "react";
import useUserProviders from "../../hooks/useUserProviders";
import { useSelector } from "react-redux";
//#endregion ------------ IMPORTS ------------

// Componente para mostrar la imagen del proveedor con placeholder si falla
const PlaceholderProveedor = () => <View style={styles.proveedorImgPlaceholder} />;

const ProveedorImg = ({ uri }) => {
	const [error, setError] = useState(false);
	if (error || !uri) return <PlaceholderProveedor />;
	return <Image source={{ uri }} style={styles.proveedorImg} onError={() => setError(true)} />;
};

export default function UserProviders() {
	const { loading, error } = useUserProviders();

	const providers = useSelector((state) => state.user.providers);

	return (
		<>
			<Text style={styles.proveedoresTitulo}>PROVEEDORES:</Text>
			{loading ? (
				<ActivityIndicator size="large" color="#27AAE1" style={{ marginVertical: 20 }} />
			) : error ? (
				<Text style={{ color: "red", marginBottom: 20 }}>{error}</Text>
			) : (
				<View style={styles.proveedoresGrid}>
					{providers && providers.length > 0 ? (
						providers.map((prov) => <ProveedorImg key={prov._id} uri={prov.logo} />)
					) : (
						<Text style={{ color: "#888", fontSize: 15 }}>No tenés proveedores cargados.</Text>
					)}
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	proveedoresTitulo: {
		marginTop: 18,
		marginBottom: 8,
		fontWeight: "bold",
		fontSize: 15,
		color: "#222",
	},
	proveedoresGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 15,
		marginBottom: 20,
		// backgroundColor: "#c44949ff",
		width: "85%",
	},
	proveedorImg: {
		width: 50,
		height: 50,
		borderRadius: 5,
		resizeMode: "contain",
		margin: 6,
	},
	proveedorImgPlaceholder: {
		width: 50,
		height: 50,
		borderRadius: 5,
		backgroundColor: "#ccc",
		margin: 6,
	},
});

