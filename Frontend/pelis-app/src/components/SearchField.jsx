import { View, Text, TextInput, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const SearchField = ({ label, placeholder, value, onChangeText, keyboardType = "default" }) => (
	<>
		<Text style={styles.label}>{label}</Text>
		<View style={styles.inputRow}>
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				placeholderTextColor="#7F7F7F"
				value={value}
				onChangeText={onChangeText}
				keyboardType={keyboardType}
			/>
			<FontAwesome5 name="search" size={20} color="#7F7F7F" />
		</View>
	</>
);

export default SearchField;

const styles = StyleSheet.create({
	label: {
		fontSize: 13,
		fontWeight: "600",
		marginTop: 12,
		marginBottom: 4,
		color: "#000000",
		textTransform: "uppercase",
	},
	inputRow: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#D9E7EF",
		borderRadius: 8,
		paddingHorizontal: 12,
		marginBottom: 8,
	},
	input: {
		flex: 1,
		height: 45,
		fontSize: 15,
		color: "#222222",
	},
});

