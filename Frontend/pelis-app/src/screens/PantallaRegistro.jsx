//#region ------------ IMPORTS ------------
import { StyleSheet, View, Image, KeyboardAvoidingView, Platform, ScrollView, Text, Button } from "react-native";
import MovieFinderLogoBlack from "../assets/logo/MovieFinderLogoBlack";
import ButtonPrimary from "../components/ButtonPrimary";
import TextInputLoginSignUp from "../components/TextInputLoginSignUp";
import ButtonGoBack from "../components/ButtonGoBack";
import { useEffect, useState } from "react";
import useRegister from "../hooks/useRegister";
import { Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../forms/auth.schema";
//#endregion ------------ IMPORTS ------------

const windowHeight = Dimensions.get("window").height;

const PantallaRegistro = ({ navigation }) => {
	// Custom hook de registro
	const { handleRegister, loading, error, errorDetails, success } = useRegister();

	// React Hook Form + Yup
	const {
		control, // Propiedad que usa cada uno de los elementos del form para conectarse con el elemento Controller
		handleSubmit,
		watch,
		reset,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(signUpSchema),
		mode: "onChange", // onBlur: valida al salir del input; onChange: valida al escribir; onSubmit: valida al enviar el formulario
		defaultValues: {
			email: "",
			username: "",
			password: "",
			verifyPassword: "",
		},
	});

	// Obtengo los mensajes de error de Yup
	const yupErrors = Object.values(errors).map((err) => err.message);

	// Calculo paddingBottom dinámico según la cantidad de errores para que el botón quede dentro del ScrollView (sino no se podía scrollear hasta el)
	const totalErrors = yupErrors.length + errorDetails.length;
	const dynamicPaddingBottom = totalErrors > 0 ? 60 + totalErrors * 50 : 0;

	// Muestro Toasts cuando hay error o success
	useEffect(() => {
		if (success) {
			Toast.show({
				type: "success",
				text1: "Registro exitoso",
				text2: success,
			});
		}
		if (error) {
			Toast.show({
				type: "error",
				text1: "Error de registro",
				text2: error,
			});
		}
	}, [success, error]);

	// Handler de submit del formulario
	const onSubmit = async (data) => {
		// console.log("SUBMIT!", data);
		const ok = await handleRegister({
			email: data.email,
			username: data.username,
			password: data.password,
		});
		if (ok) {
			reset();
			// Navego a PantallaLogin si el registro fue exitoso
			navigation.replace("PantallaLogin");
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
					<Image source={require("../assets/img/peli-registro.jpg")} style={styles.image} resizeMode="cover" />
				</View>

				{/* Logo */}
				<MovieFinderLogoBlack />

				{/* Inputs */}
				<View style={styles.containerInputs}>
					{/* Correo electrónico */}
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value } }) => (
							<View style={styles.inputWrapper}>
								<TextInputLoginSignUp
									placeholder="Correo electrónico..."
									autoCapitalize="none"
									value={value}
									onChangeText={onChange}
									error={!!errors.email}
								/>
							</View>
						)}
					/>
					{/* Nombre de usuario */}
					<Controller
						control={control}
						name="username"
						render={({ field: { onChange, value } }) => (
							<View style={styles.inputWrapper}>
								<TextInputLoginSignUp
									placeholder="Nombre de usuario..."
									autoCapitalize="none"
									value={value}
									onChangeText={onChange}
									error={!!errors.username}
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
					{/* Verificar contraseña */}
					<Controller
						control={control}
						name="verifyPassword"
						render={({ field: { onChange, value } }) => (
							<View style={styles.inputWrapper}>
								<TextInputLoginSignUp
									placeholder="Verificar contraseña..."
									secureTextEntry
									autoCapitalize="none"
									value={value}
									onChangeText={onChange}
									error={!!errors.verifyPassword}
								/>
							</View>
						)}
					/>
				</View>

				{loading && <Text>Cargando...</Text>}

				{(yupErrors.length > 0 || errorDetails.length > 0) && (
					<View style={{ justifyContent: "center", alignItems: "flex-start", width: "85%" }}>
						{[...yupErrors, ...errorDetails].map((detalle, idx) => (
							<View key={idx} style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
								<Text style={{ color: "red", fontSize: 16 }}>• </Text>
								<Text style={{ color: "red", fontSize: 14 }}>{detalle}</Text>
							</View>
						))}
					</View>
				)}

				{/* Botón primario sin ícono de registrarse */}
				<ButtonPrimary
					title="Registrarme"
					onPress={handleSubmit(onSubmit)}
					style={{ width: "85%", marginTop: 20 }}
					disabled={!isValid}
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default PantallaRegistro;

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
		// paddingBottom: 280,
	},
	imageContainer: {
		width: "100%",
		height: "30%",
		overflow: "hidden",
		marginBottom: 40,
	},
	image: {
		width: "100%",
		height: "150%",
	},
	containerInputs: {
		backgroundColor: "#32aac5ff",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 25,
		marginBottom: 20,
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
	inputWrapper: {
		marginTop: -1, // Pongo valor negativo igual al borderWidth para que no se duplique el borde
	},
});

