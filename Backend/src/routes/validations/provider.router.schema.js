//#region  ----------- IMPORTS -----------
import Joi from "joi";
//#endregion

export const providerCreateSchema = Joi.object({
	name: Joi.string().min(2).max(20).required().messages({
		"string.base": "El nombre debe ser un texto.",
		"string.empty": "El nombre es obligatorio.",
		"string.min": "El nombre debe tener al menos 2 caracteres.",
		"string.max": "El nombre no puede tener más de 20 caracteres.",
		"any.required": "El nombre es obligatorio.",
	}),
	logo: Joi.string()
		.uri({ scheme: ["http", "https"] })
		.pattern(/\.(jpg|jpeg|png|gif|webp)$/i)
		.allow(null)
		.optional()
		.messages({
			"string.uri": "La URL del logotipo no es válida.",
			"string.pattern.base": "El logotipo debe ser una imagen válida (jpg, jpeg, png, gif, webp).",
		}),
});

export const providerUpdateSchema = Joi.object({
	name: Joi.string().min(2).max(20).optional().messages({
		"string.base": "El nombre debe ser un texto.",
		"string.empty": "El nombre es obligatorio.",
		"string.min": "El nombre debe tener al menos 2 caracteres.",
		"string.max": "El nombre no puede tener más de 20 caracteres.",
	}),
	logo: Joi.string()
		.uri({ scheme: ["http", "https"] })
		.pattern(/\.(jpg|jpeg|png|gif|webp)$/i)
		.allow(null)
		.optional()
		.messages({
			"string.uri": "La URL del logotipo no es válida.",
			"string.pattern.base": "El logotipo debe ser una imagen válida (jpg, jpeg, png, gif, webp).",
		}),
});

