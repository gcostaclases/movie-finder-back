import { StyleSheet, Text, View } from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import SearchField from "../components/search/SearchField";
import { useState } from "react";

const PantallaBuscar = () => {
	const [titulo, setTitulo] = useState("");
	const [actor, setActor] = useState("");
	const [genero, setGenero] = useState("");
	const [idioma, setIdioma] = useState("");
	const [anio, setAnio] = useState("");

	return (
		<View style={styles.content}>
			<Text style={styles.title}>Buscar películas por...</Text>

			{/* Título */}
			<SearchField label="Título" placeholder="Ej: Chainsaw Man..." value={titulo} onChangeText={setTitulo} />

			{/* Actor */}
			<SearchField label="Actor" placeholder="Ej: Kikunosuke Toya..." value={actor} onChangeText={setActor} />

			{/* Género */}
			<SearchField label="Género" placeholder="Ej: Animación..." value={genero} onChangeText={setGenero} />

			{/* Idioma original */}
			<SearchField label="Idioma original" placeholder="Ej: en, es..." value={idioma} onChangeText={setIdioma} />

			{/* Año de lanzamiento */}
			<SearchField
				label="Año de lanzamiento"
				placeholder="Ej: 2025..."
				value={anio}
				onChangeText={setAnio}
				keyboardType="numeric"
			/>

			{/* Botón */}
			<ButtonPrimary
				title="Buscar"
				style={styles.button}
				onPress={() => {
					alert("Se esta buscando");
				}}
			/>
		</View>
	);
};

export default PantallaBuscar;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 18,
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 18,
		color: "#222",
	},
	button: {
		marginTop: 24,
		width: "100%",
	},
});

