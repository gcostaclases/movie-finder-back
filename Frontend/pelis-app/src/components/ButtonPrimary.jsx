import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Importa Font Awesome 5 desde react-native-vector-icons

const ButtonPrimary = ({ title, onPress, iconName, color = "#345780", style }) => {
	return (
		<TouchableOpacity
			style={[styles.buttonContainer, { backgroundColor: color }, style]}
			onPress={onPress}
			activeOpacity={0.8}>
			{iconName && <FontAwesome5 name={iconName} size={20} color="#FFFFFF" style={styles.icon} solid />}
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};

export default ButtonPrimary;

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row", // Para que el ícono y el texto estén en línea
		alignItems: "center", // Centrar contenido verticalmente
		justifyContent: "center", // Centrar contenido horizontalmente
		// width: 334,
		width: "100%",
		height: 55,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "600", // Semibold
	},
	icon: {
		marginRight: 10, // Espaciado entre el ícono y el texto
	},
});

