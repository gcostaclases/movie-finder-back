//#region  ----------- IMPORTS -----------
import Joi from "joi";
//#endregion

export const providerCreateSchema = Joi.object({
	nombre: Joi.string().min(2).max(20).required().messages({
		"string.base": "El nombre debe ser un texto.",
		"string.empty": "El nombre es obligatorio.",
		"string.min": "El nombre debe tener al menos 2 caracteres.",
		"string.max": "El nombre no puede tener más de 20 caracteres.",
		"any.required": "El nombre es obligatorio.",
	}),
});

export const providerUpdateSchema = Joi.object({
	nombre: Joi.string().min(2).max(20).optional().messages({
		"string.base": "El nombre debe ser un texto.",
		"string.empty": "El nombre es obligatorio.",
		"string.min": "El nombre debe tener al menos 2 caracteres.",
		"string.max": "El nombre no puede tener más de 20 caracteres.",
	}),
});
