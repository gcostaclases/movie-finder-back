import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const ButtonSecondary = ({ title, onPress, iconName, color = "#345780", style, disabled = false }) => {
	return (
		<TouchableOpacity
			style={[styles.buttonContainer, { borderColor: color }, disabled && styles.disabled, style]}
			onPress={onPress}
			activeOpacity={0.8}
			disabled={disabled}>
			{iconName && <FontAwesome5 name={iconName} size={20} color={color} style={styles.icon} solid />}
			<Text style={[styles.buttonText, { color }, disabled && styles.textDisabled]}>{title}</Text>
		</TouchableOpacity>
	);
};

export default ButtonSecondary;

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "transparent",
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
		marginRight: 10,
	},
	disabled: {
		opacity: 0.5,
	},
	textDisabled: {
		opacity: 0.7,
	},
});

