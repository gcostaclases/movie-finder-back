//#region  ----------- IMPORTS -----------
// Importo Joi
import Joi from "joi";

// Importo las expresiones regulares
import { passwordRegex } from "../../utils/regex.js";
//#endregion ----------- IMPORTS -----------

// TODO: Chequear mejor lo de los mensajes de error personalizados
export const userSignUpSchema = Joi.object({
	username: Joi.string().min(3).max(20).required().messages({
		"string.base": "El nombre de usuario debe ser un texto.",
		"string.empty": "El nombre de usuario es obligatorio.",
		"string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
		"string.max": "El nombre de usuario no puede tener más de 20 caracteres.",
		"any.required": "El nombre de usuario es obligatorio.",
	}),
	email: Joi.string().email().required().messages({
		"string.base": "El email debe ser un texto.",
		"string.empty": "El email es obligatorio.",
		"string.email": "El email debe ser válido.",
		"any.required": "El email es obligatorio.",
	}),
	password: Joi.string().min(8).max(30).pattern(passwordRegex).required().messages({
		"string.base": "La contraseña debe ser un texto.",
		"string.empty": "La contraseña es obligatoria.",
		"string.min": "La contraseña debe tener al menos 8 caracteres.",
		"string.max": "La contraseña no puede tener más de 30 caracteres.",
		"string.pattern.base":
			"La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.",
		"any.required": "La contraseña es obligatoria.",
	}),
});

export const userLoginSchema = Joi.object({
	identifier: Joi.alternatives()
		.try(
			Joi.string().email().messages({
				"string.email": "El email debe ser válido.",
			}), // Si es email
			Joi.string().min(3).max(20).messages({
				"string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
				"string.max": "El nombre de usuario no puede tener más de 20 caracteres.",
			}) // Si es username
		)
		.required()
		.messages({
			"any.required": "El identificador (email o nombre de usuario) es obligatorio.",
		}),
	password: Joi.string().min(8).max(30).required().messages({
		"string.empty": "La contraseña es obligatoria.",
		"string.min": "La contraseña debe tener al menos 8 caracteres.",
		"string.max": "La contraseña no puede tener más de 30 caracteres.",
		"any.required": "La contraseña es obligatoria.",
	}),
});
