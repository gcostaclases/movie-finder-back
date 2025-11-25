import { createStackNavigator } from "@react-navigation/stack";
import PantallaPeliculas from "../screens/PantallaPeliculas";
import PantallaDetallePelicula from "../screens/PantallaDetallePelicula";
import ButtonGoBack from "../components/general/ButtonGoBack";
import PantallaReseniasPelicula from "../screens/PantallaReseniasPelicula";
import PantallaActoresPelicula from "../screens/PantallaActoresPelicula";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createStackNavigator();

const MovieStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="PantallaPeliculas"
			screenOptions={{
				headerStyle: { height: 120 },
				headerTitleStyle: {
					color: "#FFFFFF",
					fontSize: 22,
					fontWeight: "600",
					marginLeft: 15,
				},
				headerTitleAlign: "left",
				headerBackground: () => (
					<LinearGradient colors={["#345780", "#1A2E46"]} start={[0.5, 0]} end={[0.5, 1]} style={{ flex: 1 }} />
				),
			}}>
			{/* Pantallas relacionadas a las películas */}
			<Stack.Screen
				name="PantallaPeliculas"
				component={PantallaPeliculas}
				options={({ route, navigation }) => ({
					headerShown: false,
				})}
			/>
			<Stack.Screen
				name="PantallaDetallePelicula"
				component={PantallaDetallePelicula}
				options={({ route, navigation }) => ({
					headerTitle: route.params?.movieTitle || "Detalle",
					headerLeft: () => <ButtonGoBack navigation={navigation} size={28} />,
				})}
			/>
			<Stack.Screen
				name="PantallaReseniasPelicula"
				component={PantallaReseniasPelicula}
				options={({ route, navigation }) => ({
					headerTitle: `Reseñas de ${route.params?.titulo}`,
					headerLeft: () => <ButtonGoBack navigation={navigation} size={28} />,
				})}
			/>
			<Stack.Screen
				name="PantallaActoresPelicula"
				component={PantallaActoresPelicula}
				options={({ route, navigation }) => ({
					headerTitle: `Actores de ${route.params?.titulo}`,
					headerLeft: () => <ButtonGoBack navigation={navigation} size={28} />,
				})}
			/>
		</Stack.Navigator>
	);
};

export default MovieStack;

