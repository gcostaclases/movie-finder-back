import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const ButtonSecondary = ({ title, onPress, iconName, color = "#345780", style }) => {
	return (
		<TouchableOpacity
			style={[styles.buttonContainer, { borderColor: color }, style]}
			onPress={onPress}
			activeOpacity={0.8}>
			{iconName && <FontAwesome5 name={iconName} size={20} color={color} style={styles.icon} solid />}
			<Text style={[styles.buttonText, { color }]}>{title}</Text>
		</TouchableOpacity>
	);
};

export default ButtonSecondary;

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row", // Para que el ícono y el texto estén en línea
		alignItems: "center", // Centrar contenido verticalmente
		justifyContent: "center", // Centrar contenido horizontalmente
		backgroundColor: "transparent",
		// width: 334,
		width: "100%",
		height: 55,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
		borderWidth: 2,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: "600", // Semibold
	},
	icon: {
		marginRight: 10, // Espaciado entre el ícono y el texto
	},
});

