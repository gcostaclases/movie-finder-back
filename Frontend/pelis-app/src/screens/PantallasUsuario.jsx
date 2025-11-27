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
		<ScrollView contentContainerStyle={styles.container}>
			<UserMenuTabs active={activeScreen} onChange={setActiveScreen} />
			<View style={{ width: "100%" }}>{renderContent()}</View>
		</ScrollView>
	);
};

export default PantallasUsuario;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		alignItems: "center",
		// paddingTop: 30,
    marginTop: 20,
		// paddingBottom: 40,
	},
});

