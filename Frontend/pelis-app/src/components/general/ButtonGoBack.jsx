import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const ButtonGoBack = ({
	navigation,
	hasBackground = false,
	backgroundColor = "rgba(0, 0, 0, 0.35)",
	iconColor = "#FFFFFF",
	size = 24,
	sobreImg = false,
}) => {
	return (
		<TouchableOpacity
			style={[sobreImg ? styles.sobreImgBackButton : styles.backButton, hasBackground && { backgroundColor }]}
			onPress={() => navigation.goBack()}>
			<FontAwesome5 name="chevron-left" size={size} color={iconColor} />
		</TouchableOpacity>
	);
};

export default ButtonGoBack;

const styles = StyleSheet.create({
	sobreImgBackButton: {
		position: "absolute",
		top: 60,
		left: 20,
		zIndex: 1,
		padding: 10,
		width: 50,
		height: 50,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	backButton: {
		marginLeft: 16,
		padding: 8,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
	},
});

