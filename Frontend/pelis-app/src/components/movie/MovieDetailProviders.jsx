import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const MovieDetailProviders = () => {
	const availability = useSelector((state) => state.movie.availability);
	// console.log("Disponibilidad de proveedores:", availability);

	return (
		<View style={styles.container}>
			<Text style={styles.sectionTitle}>PROVEEDORES</Text>
			<View style={styles.providersRow}>
				{availability.length === 0 ? (
					<Text style={styles.providerText}>Sin reportes de disponibilidad</Text>
				) : (
					availability.map((prov) => (
						<View key={prov.providerId} style={styles.providerBox}>
							<Image source={{ uri: prov.providerLogo }} style={styles.providerImg} />
							<Text style={styles.providerText}>{prov.percentage}%</Text>
						</View>
					))
				)}
			</View>
		</View>
	);
};

export default MovieDetailProviders;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		// backgroundColor: "#e0acacff",
		borderBottomColor: "#000000ff",
		borderBottomWidth: 1,
	},
	sectionTitle: {
		fontWeight: "500",
		fontSize: 15,
		marginBottom: 15,
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
		height: 70,
		// backgroundColor: "#b3eceaff",
		// borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 6,
	},
	providerImg: {
		width: 50,
		height: 50,
		borderRadius: 5,
		resizeMode: "contain",
		marginBottom: 5,
	},
	providerText: {
		fontSize: 14,
		color: "#555",
		textAlign: "center",
	},
});

