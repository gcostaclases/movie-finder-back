//#region ----------- IMPORTS ------------
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
//#endregion ------------ IMPORTS ------------

const SECCIONES = ["Perfil", "Reseñas", "Watchlist"];

const UserMenuTabs = ({ active, onChange }) => (
	<View style={styles.tabsContainer}>
		{SECCIONES.map((section) => (
			<TouchableOpacity
				key={section}
				style={[styles.tab, active === section && styles.tabActive]}
				onPress={() => onChange(section)}
				activeOpacity={0.8}>
				<Text style={[styles.tabText, active === section && styles.tabTextActive]}>{section}</Text>
			</TouchableOpacity>
		))}
	</View>
);

export default UserMenuTabs;

const styles = StyleSheet.create({
	tabsContainer: {
		flexDirection: "row",
		alignSelf: "center",
		// marginBottom: 20,
		borderRadius: 5,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#27AAE1",
	},
	tab: {
		paddingVertical: 8,
		paddingHorizontal: 18,
		width: 115,
		alignItems: "center",
		justifyContent: "center",
	},
	tabActive: {
		backgroundColor: "#27AAE1",
	},
	tabText: {
		color: "#27AAE1",
		fontWeight: "500",
		fontSize: 15,
	},
	tabTextActive: {
		color: "#fff",
	},
});

