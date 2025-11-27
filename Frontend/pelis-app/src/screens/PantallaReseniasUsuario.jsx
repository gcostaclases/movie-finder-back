//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View, ScrollView } from "react-native";
//#endregion ------------ IMPORTS ------------

const PantallaReseniasUsuario = () => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={{ marginTop: 40 }}>
				<Text>PantallaReseniasUsuario</Text>
			</View>
		</ScrollView>
	);
};

export default PantallaReseniasUsuario;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingTop: 30,
		paddingBottom: 40,
	},
});

