import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Importa Font Awesome 5 desde react-native-vector-icons

const ButtonPrimary = ({ title, onPress, iconName, color = "#345780", style, disabled = false }) => {
	return (
		<TouchableOpacity
			style={[styles.buttonContainer, { backgroundColor: color }, disabled && styles.disabled, style]}
			onPress={onPress}
			activeOpacity={0.8}
			disabled={disabled}>
			{iconName && <FontAwesome5 name={iconName} size={20} color="#FFFFFF" style={styles.icon} solid />}
			<Text style={[styles.buttonText, disabled && styles.textDisabled]}>{title}</Text>
		</TouchableOpacity>
	);
};

export default ButtonPrimary;

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
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
		marginRight: 10,
	},
	disabled: {
		opacity: 0.5,
	},
	textDisabled: {
		color: "#FFFFFF",
		opacity: 0.7,
	},
});

