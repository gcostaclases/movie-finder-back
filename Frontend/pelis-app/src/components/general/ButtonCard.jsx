import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const ButtonCard = ({ iconName, text, onPress }) => (
	<TouchableOpacity style={styles.cardButton} onPress={onPress}>
		<FontAwesome5 name={iconName} size={32} color="#27AAE1" style={styles.cardIcon} solid />
		<Text style={styles.cardButtonText}>{text}</Text>
	</TouchableOpacity>
);

export default ButtonCard;

const styles = StyleSheet.create({
	cardButton: {
		flex: 1,
		borderWidth: 2,
		borderColor: "#27AAE1",
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 18,
		marginHorizontal: 5,
	},
	cardIcon: {
		marginBottom: 10,
	},
	cardButtonText: {
		color: "#27AAE1",
		fontSize: 16,
		fontWeight: "500",
		textTransform: "uppercase",
		// letterSpacing: 1,
	},
});

