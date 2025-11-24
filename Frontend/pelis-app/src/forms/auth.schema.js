import * as Yup from "yup";
import { emailRegex, passwordRegex } from "../utils/regex";

export const loginSchema = Yup.object().shape({
	identifier: Yup.string()
		.required("El email o nombre de usuario es obligatorio")
		// Creo una validación personalizada
		.test(
			"is-email-or-username", // Nombre interno
			"Debe ser un email válido o un nombre de usuario (3-20 caracteres)", // Mensaje de error si falla
			/*
         !!value: para asegurarse de que no es nulo o indefinido
         emailRegex.test(value): verifica si es un email válido
         (value.length >= 3 && value.length <= 20): verifica si es un nombre de usuario válido
      */
			(value) => !!value && (emailRegex.test(value) || (value.length >= 3 && value.length <= 20))
		),
	password: Yup.string()
		.required("La contraseña es obligatoria")
		.min(8, "La contraseña debe tener al menos 8 caracteres")
		.max(30, "La contraseña no puede tener más de 30 caracteres")
		.matches(passwordRegex, "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un símbolo"),
});

export const signUpSchema = Yup.object().shape({
	email: Yup.string()
		.required("El correo electrónico es obligatorio")
		.matches(emailRegex, "Debe ser un correo electrónico válido"),
	username: Yup.string()
		.required("El nombre de usuario es obligatorio")
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres")
		.max(20, "El nombre de usuario no puede tener más de 20 caracteres"),
	password: Yup.string()
		.required("La contraseña es obligatoria")
		.min(8, "La contraseña debe tener al menos 8 caracteres")
		.max(30, "La contraseña no puede tener más de 30 caracteres")
		.matches(passwordRegex, "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un símbolo"),
	verifyPassword: Yup.string()
		.required("Debes repetir la contraseña")
		.oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
});

