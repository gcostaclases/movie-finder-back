import { createStackNavigator } from "@react-navigation/stack";
import PantallasUsuario from "../screens/PantallasUsuario";

const Stack = createStackNavigator();

const UserStack = () => {
	return (
		<Stack.Navigator initialRouteName="PantallasUsuario" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="PantallasUsuario" component={PantallasUsuario} />
		</Stack.Navigator>
	);
};

export default UserStack;
