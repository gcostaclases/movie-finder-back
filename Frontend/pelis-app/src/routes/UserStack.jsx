import { createStackNavigator } from "@react-navigation/stack";
import PantallaPerfilUsuario from "../screens/PantallaPerfilUsuario";

const Stack = createStackNavigator();

const UserStack = () => {
	return (
		<Stack.Navigator initialRouteName="PantallaPerfilUsuario" screenOptions={{ headerShown: false }}>
			{/* Pantallas relacionadas al usuario y sus cosas */}
			<Stack.Screen name="PantallaPerfilUsuario" component={PantallaPerfilUsuario} />
			{/* <Stack.Screen name="PantallaLogin" component={PantallaLogin} /> */}
			{/* <Stack.Screen name="PantallaRegistro" component={PantallaRegistro} /> */}
		</Stack.Navigator>
	);
};

export default UserStack;
