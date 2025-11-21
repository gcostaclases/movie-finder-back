import { createStackNavigator } from "@react-navigation/stack";
import PantallaBuscar from "../screens/PantallaBuscar";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createStackNavigator();

const SearchStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="PantallaBuscar"
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
			{/* Pantallas relacionadas a la búsqueda de películas */}
			<Stack.Screen
				name="PantallaBuscar"
				component={PantallaBuscar}
				options={({ route, navigation }) => ({
					headerShown: false,
				})}
			/>
			{/* <Stack.Screen name="PantallaLogin" component={PantallaLogin} /> */}
			{/* <Stack.Screen name="PantallaRegistro" component={PantallaRegistro} /> */}
		</Stack.Navigator>
	);
};

export default SearchStack;

