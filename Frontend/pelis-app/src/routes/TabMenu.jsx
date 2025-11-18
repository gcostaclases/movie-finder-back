import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import PantallaLoginORegistro from "../screens/PantallaLoginORegistro";
import PantallaPeliculas from "../screens/PantallaPeliculas";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MovieFinderLogoWhite from "../assets/logo/MovieFinderLogoWhite";
import AuthStack from "./AuthStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import MovieStack from "./MovieStack";

const Tab = createBottomTabNavigator();

const Menu = () => {
	// const insets = useSafeAreaInsets();
	// const tabBarHeight = 70 + insets.bottom;
	const tabBarHeight = Platform.OS === "ios" ? 95 : 85;

	return (
		<Tab.Navigator
			initialRouteName="MovieStack"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "AuthStack" || route.name === "UserStack") {
						iconName = "user";
					} else if (route.name === "MovieStack") {
						iconName = "film";
					} else if (route.name === "Buscar") {
						iconName = "search";
					}
					return <FontAwesome5 name={iconName} size={40} color={color} solid />;
				},
				tabBarStyle: {
					backgroundColor: "#CCDEE5",
					// height: 80,
					height: tabBarHeight,
				},
				tabBarItemStyle: {
					// backgroundColor: "#2a96c1ff",
					// height: 80,
					height: tabBarHeight,
				},
				tabBarIconStyle: {
					// flex: 1,
					width: "100%",
					height: "70%",
					alignItems: "center",
					justifyContent: "center",
					// backgroundColor: "#79b780ff",
				},
				tabBarLabelStyle: {
					width: "100%",
					// backgroundColor: "#bf81bbff",
					fontSize: 13,
					fontWeight: "500",
					// paddingBottom: 20,
				},
				tabBarLabelPosition: "below-icon",
				tabBarActiveTintColor: "#FFFFFF",
				tabBarInactiveTintColor: "#656565",
				tabBarActiveBackgroundColor: "#345780",
				// headerShown: false,
				headerStyle: { height: 140 },
				headerBackground: () => (
					<LinearGradient colors={["#345780", "#1A2E46"]} start={[0.5, 0]} end={[0.5, 1]} style={{ flex: 1 }} />
				),
				headerTitle: () => <MovieFinderLogoWhite />,
				headerTitleAlign: "center",
				headerTitleContainerStyle: {
					paddingBottom: Platform.OS === "ios" ? 15 : 0,
				},
				animation: "fade",
			})}>
			<Tab.Screen
				name="AuthStack"
				component={AuthStack}
				options={({ route }) => {
					// Con esto detecto la pantalla activa y si es Login o Registro oculto el tab bar
					const routeName = getFocusedRouteNameFromRoute(route);
					const hideTabBar = routeName === "PantallaLogin" || routeName === "PantallaRegistro";
					return {
						tabBarLabel: "Usuario",
						headerShown: false,
						tabBarStyle: hideTabBar
							? { display: "none" }
							: {
									backgroundColor: "#CCDEE5",
									height: tabBarHeight,
							  },
					};
				}}
			/>
			<Tab.Screen
				name="MovieStack"
				component={MovieStack}
				options={({ route }) => {
					// Con esto detecto la pantalla activa y si es Login o Registro oculto el tab bar
					const routeName = getFocusedRouteNameFromRoute(route);
					const hideTabHeader = routeName === "PantallaDetallePelicula";
					return {
						tabBarLabel: "Películas",
						headerShown: !hideTabHeader,
					};
				}}
			/>
			<Tab.Screen name="Buscar" component={PantallaPeliculas} />
		</Tab.Navigator>
	);
};

export default Menu;

