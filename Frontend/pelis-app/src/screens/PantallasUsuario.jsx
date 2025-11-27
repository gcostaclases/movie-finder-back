//#region ----------- IMPORTS ------------
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import UserMenuTabs from "../components/user/UserMenuTabs";
import PantallaPerfilUsuario from "./PantallaPerfilUsuario";
import PantallaReseniasUsuario from "./PantallaReseniasUsuario";
import PantallaWatchlistUsuario from "./PantallaWatchlistUsuario";
//#endregion ------------ IMPORTS ------------

const PantallasUsuario = () => {
	const [activeScreen, setActiveScreen] = useState("Perfil");

	const renderContent = () => {
		if (activeScreen === "Perfil") return <PantallaPerfilUsuario />;
		if (activeScreen === "Reseñas") return <PantallaReseniasUsuario />;
		if (activeScreen === "Watchlist") return <PantallaWatchlistUsuario />;
	};

	return (
		<View style={styles.container}>
			<UserMenuTabs active={activeScreen} onChange={setActiveScreen} />
			<ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
				{renderContent()}
			</ScrollView>
		</View>
	);
};

export default PantallasUsuario;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		marginTop: 20,
	},
	scroll: {
		flex: 1,
		width: "100%",
	},
	scrollContent: {
		minWidth: "100%",
		// paddingBottom: 40,
	},
});
