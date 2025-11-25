import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const SECCIONES = ["Perfil", "Reseñas", "Watchlist"];

const UserMenuTabs = ({ onChange }) => {
	const [active, setActive] = useState(SECCIONES[0]);

	const handlePress = (section) => {
		setActive(section);
		onChange && onChange(section);
	};

	return (
		<View style={styles.tabsContainer}>
			{SECCIONES.map((section, idx) => (
				<TouchableOpacity
					key={section}
					style={[styles.tab, active === section && styles.tabActive]}
					onPress={() => handlePress(section)}
					activeOpacity={0.8}>
					<Text style={[styles.tabText, active === section && styles.tabTextActive]}>{section}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	tabsContainer: {
		flexDirection: "row",
		alignSelf: "center",
		marginBottom: 20,
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

export default UserMenuTabs;

