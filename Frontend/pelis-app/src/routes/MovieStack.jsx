import { createStackNavigator } from "@react-navigation/stack";
import PantallaPeliculas from "../screens/PantallaPeliculas";
import PantallaDetallePelicula from "../screens/PantallaDetallePelicula";
import ButtonGoBack from "../components/ButtonGoBack";
import { Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Stack = createStackNavigator();

const MovieStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="PantallaPeliculas"
			screenOptions={{
				headerShown: false,
				headerStyle: { backgroundColor: "#345780", height: 120 },
				headerTitleStyle: {
					color: "#FFFFFF",
					fontSize: 22,
					fontWeight: "600",
					marginLeft: 15,
				},
				headerTitleAlign: "left",
			}}>
			{/* Pantallas relacionadas a las películas */}
			<Stack.Screen name="PantallaPeliculas" component={PantallaPeliculas} />
			<Stack.Screen
				name="PantallaDetallePelicula"
				component={PantallaDetallePelicula}
				options={({ route, navigation }) => ({
					headerShown: true,
					headerTitle: route.params?.titulo || "Detalle",
					headerLeft: () => <ButtonGoBack navigation={navigation} size={28} />,
				})}
			/>
		</Stack.Navigator>
	);
};

export default MovieStack;
