import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const ButtonCloseModal = ({ onPress, top = 18, right = 18, left, bottom, style }) => {
	return (
		<TouchableOpacity style={[styles.closeButton, { top, right, left, bottom }, style]} onPress={onPress}>
			<FontAwesome5 name="times" size={28} color="#888" />
		</TouchableOpacity>
	);
};

export default ButtonCloseModal;

const styles = StyleSheet.create({
	closeButton: {
		position: "absolute",
		zIndex: 2,
		padding: 8,
	},
});
