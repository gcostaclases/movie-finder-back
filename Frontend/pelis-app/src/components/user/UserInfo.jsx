import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useUserProfile from "../../hooks/useUserProfile";

const USER_PLACEHOLDER = require("../../assets/img/User-Placeholder.png");

export default function UserInfo() {
	const { profile, loading, error } = useUserProfile();

	return (
		<>
			{loading ? (
				<ActivityIndicator size="large" color="#27AAE1" style={{ marginVertical: 20 }} />
			) : error ? (
				<Text style={{ color: "red", marginBottom: 20 }}>{error}</Text>
			) : (
				<>
					<Image
						source={profile?.profileImage ? { uri: profile.profileImage } : USER_PLACEHOLDER}
						style={styles.avatar}
					/>
					<TouchableOpacity>
						<Text style={styles.editarFoto}>Editar foto</Text>
					</TouchableOpacity>
					<View style={styles.infoRow}>
						<View style={styles.iconAndLabelWrapper}>
							<FontAwesome5 name="user" size={20} color="#222" style={styles.icon} solid />
							<Text style={styles.infoLabel}>USUARIO:</Text>
						</View>
						<Text style={styles.infoValue}>{profile?.username}</Text>
					</View>
					<View style={styles.infoRow}>
						<View style={styles.iconAndLabelWrapper}>
							<FontAwesome5 name="envelope" size={20} color="#222" style={styles.icon} solid />
							<Text style={styles.infoLabel}>CORREO:</Text>
						</View>
						<Text style={styles.infoValue}>{profile?.email}</Text>
					</View>
				</>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	avatar: {
		width: 160,
		height: 160,
		borderRadius: 80,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: "center",
		backgroundColor: "#eee",
	},
	editarFoto: {
		color: "#27AAE1",
		fontSize: 15,
		marginBottom: 18,
		textAlign: "center",
		textDecorationLine: "underline",
	},
	infoRow: {
		// backgroundColor: "#e45757ff",
		width: "85%",
		flexDirection: "row",
		// alignItems: "center",
		marginBottom: 8,
		marginLeft: 10,
		justifyContent: "center",
		gap: 10,
	},
	icon: {
		marginRight: 10,
	},
	iconAndLabelWrapper: {
		flex: 0.5,
		// backgroundColor: "#7af461ff",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	infoLabel: {
		// backgroundColor: "#2a9d8fff",
		fontWeight: "bold",
		fontSize: 17,
		color: "#222",
	},
	infoValue: {
		flex: 1,
		fontWeight: "normal",
		fontSize: 16,
		color: "#222",
	},
});
