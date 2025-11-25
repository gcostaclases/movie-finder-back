//#region ------------ IMPORTS ------------
import { StyleSheet, TextInput, View, Image, KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import MovieFinderLogoBlack from "../assets/logo/MovieFinderLogoBlack";
import ButtonPrimary from "../components/general/ButtonPrimary";
import TextInputLoginSignUp from "../components/auth/TextInputLoginSignUp";
import ButtonGoBack from "../components/general/ButtonGoBack";
import { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";
import { Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../forms/auth.schema";
//#endregion ------------ IMPORTS ------------

const windowHeight = Dimensions.get("window").height;

const PantallaLogin = ({ navigation }) => {
	// Custom hook de login
	const { handleLogin, loading, error, errorDetails, success } = useLogin();

	// React Hook Form + Yup
	const {
		control, // Propiedad que usa cada uno de los elementos del form para conectarse con el elemento Controller
		handleSubmit,
		watch,
		reset,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(loginSchema),
		mode: "onChange", // onBlur: valida al salir del input; onChange: valida al escribir; onSubmit: valida al enviar el formulario
		defaultValues: {
			identifier: "",
			password: "",
		},
	});

	// Obtengo los mensajes de error de Yup
	const yupErrors = Object.values(errors).map((err) => err.message);

	// Calculo paddingBottom dinámico según la cantidad de errores para que el botón quede dentro del ScrollView (sino no se podía scrollear hasta el)
	const totalErrors = yupErrors.length + errorDetails.length;
	const dynamicPaddingBottom = totalErrors > 0 ? 60 + totalErrors * 30 : 0;

	// Muestro Toasts cuando hay error o success
	useEffect(() => {
		if (success) {
			Toast.show({
				type: "success",
				text1: "Login exitoso",
				text2: success,
			});
		}
		if (error) {
			Toast.show({
				type: "error",
				text1: "Error de inicio de sesión",
				text2: error,
			});
		}
	}, [success, error]);

	// Handler de submit del formulario
	const onSubmit = async (data) => {
		// console.log("SUBMIT!", data);
		const ok = await handleLogin(data.identifier, data.password);
		// Navego a PantallaPeliculas si el login fue exitoso
		if (ok) {
			reset();
			navigation.navigate("MovieStack", { screen: "PantallaPeliculas" });
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "undefined"}>
			<ScrollView
				contentContainerStyle={[styles.scrollContainer, { paddingBottom: dynamicPaddingBottom }]}
				keyboardShouldPersistTaps="handled">
				{/* Botón para ir atrás */}
				<ButtonGoBack navigation={navigation} hasBackground={true} sobreImg={true} />

				{/* Imágen */}
				<View style={styles.imageContainer}>
					<Image source={require("../assets/img/peli-login.jpg")} style={styles.image} resizeMode="cover" />
				</View>

				{/* Logo */}
				<MovieFinderLogoBlack />

				{/* Inputs */}
				<View style={styles.containerInputs}>
					{/* Identificador (nombre de usuario o correo) */}
					<Controller
						control={control}
						name="identifier"
						render={({ field: { onChange, value } }) => (
							<View style={styles.inputWrapper}>
								<TextInputLoginSignUp
									placeholder="Correo o nombre de usuario..."
									autoCapitalize="none"
									value={value}
									onChangeText={onChange}
									error={!!errors.identifier}
								/>
							</View>
						)}
					/>
					{/* Contraseña */}
					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value } }) => (
							<View style={styles.inputWrapper}>
								<TextInputLoginSignUp
									placeholder="Contraseña..."
									secureTextEntry
									autoCapitalize="none"
									value={value}
									onChangeText={onChange}
									error={!!errors.password}
								/>
							</View>
						)}
					/>
				</View>

				{loading && <Text>Cargando...</Text>}

				{/* {error && <Text style={{ color: "red" }}>{error}</Text>} */}

				{(yupErrors.length > 0 || errorDetails.length > 0) && (
					<View style={{ justifyContent: "center", alignItems: "flex-start", width: "80%" }}>
						{[...yupErrors, ...errorDetails].map((detalle, idx) => (
							<View key={idx} style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
								<Text style={{ color: "red", fontSize: 16 }}>• </Text>
								<Text style={{ color: "red", fontSize: 14 }}>{detalle}</Text>
							</View>
						))}
					</View>
				)}

				{/* Botón primario sin ícono de iniciar sesión */}
				<ButtonPrimary
					title="Iniciar sesión"
					onPress={handleSubmit(onSubmit)}
					style={{ width: "85%", marginTop: 20 }}
					disabled={!isValid}
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default PantallaLogin;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		// alignItems: "center",
		// gap: 15,
	},
	scrollContainer: {
		// backgroundColor: "#2bc151ff",
		flexGrow: 1,
		alignItems: "center",
		minHeight: windowHeight,
	},
	imageContainer: {
		width: "100%",
		height: "45%",
		overflow: "hidden",
		marginBottom: 40,
	},
	image: {
		width: "100%",
		height: "150%",
	},
	containerInputs: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 25,
		marginBottom: 30,
	},
	inputWrapper: {
		marginTop: -1, // Pongo valor negativo igual al borderWidth para que no se duplique el borde
	},
	input: {
		width: "100%",
		height: 70,
		backgroundColor: "#D9EAF6",
		borderColor: "#27AAE1",
		borderWidth: 1,
		paddingHorizontal: 15,
		fontSize: 16,
		// marginBottom: 10,
	},
});

