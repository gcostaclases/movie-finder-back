import { useState } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const TextInputLoginSignUp = ({
	placeholder,
	secureTextEntry = false,
	value,
	onChangeText,
	error = false,
	...props
}) => {
	const [isSecure, setIsSecure] = useState(secureTextEntry);

	return (
		<View style={{ width: "100%" }}>
			{/* 
         Agrego {...props} para que pueda recibir otras props como keyboardType, autoCapitalize, entre otras
      */}
			<View style={[styles.inputContainer, error && { borderColor: "red" }]}>
				<TextInput
					style={styles.input}
					placeholder={placeholder}
					placeholderTextColor="#7F7F7F"
					secureTextEntry={isSecure}
					value={value}
					onChangeText={onChangeText}
					{...props}
				/>
				{/* Ícono de ojito para mostrar/ocultar contraseña */}
				{secureTextEntry && (
					<TouchableOpacity style={styles.iconContainer} onPress={() => setIsSecure(!isSecure)}>
						<FontAwesome5 name={isSecure ? "eye-slash" : "eye"} size={20} color="#7F7F7F" solid />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default TextInputLoginSignUp;

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#D9EAF6",
		borderColor: "#27AAE1",
		borderWidth: 1,
		paddingHorizontal: 15,
	},
	input: {
		flex: 4,
		height: 70,
		fontSize: 16,
	},
	iconContainer: {
		flex: 1,
		height: 70,
		alignItems: "flex-end",
		justifyContent: "center",
		marginRight: 10,
	},
});

