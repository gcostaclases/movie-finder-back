//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, ScrollView } from "react-native";
//#endregion ------------ IMPORTS ------------

const PantallaWatchlistUsuario = () => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={{ marginTop: 40 }}>
				<Text>PantallaWatchlistUsuario</Text>
			</View>
		</ScrollView>
	);
};

export default PantallaWatchlistUsuario;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: 30,
		paddingBottom: 40,
	},
});

