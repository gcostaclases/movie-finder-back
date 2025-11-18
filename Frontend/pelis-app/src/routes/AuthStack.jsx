import { createStackNavigator } from "@react-navigation/stack";
import PantallaLoginORegistro from "../screens/PantallaLoginORegistro";
import PantallaLogin from "../screens/PantallaLogin";
import PantallaRegistro from "../screens/PantallaRegistro";

const Stack = createStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator initialRouteName="PantallaLoginORegistro" screenOptions={{ headerShown: false }}>
			{/* Pantallas relacionadas al login/registro */}
			<Stack.Screen name="PantallaLoginORegistro" component={PantallaLoginORegistro} />
			<Stack.Screen name="PantallaLogin" component={PantallaLogin} />
			<Stack.Screen name="PantallaRegistro" component={PantallaRegistro} />
		</Stack.Navigator>
	);
};

export default AuthStack;

