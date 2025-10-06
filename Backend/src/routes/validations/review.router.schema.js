//#region  ----------- IMPORTS -----------
// Importo Joi
import Joi from "joi";
//#endregion ----------- IMPORTS -----------

export const reviewCreateSchema = Joi.object({
	movieId: Joi.string().required().messages({
		"string.empty": "El ID de la película es obligatorio.",
		"any.required": "El ID de la película es obligatorio.",
	}),
	rating: Joi.number().integer().min(1).max(10).required().messages({
		"number.base": "La puntuación debe ser un número.",
		"number.integer": "La puntuación debe ser un número entero.",
		"number.min": "La puntuación debe ser al menos 1.",
		"number.max": "La puntuación no puede ser mayor a 10.",
		"any.required": "La puntuación es obligatoria.",
	}),
	comment: Joi.string().max(500).optional().allow("").messages({
		"string.max": "El comentario no puede tener más de 500 caracteres.",
	}),
});

export const reviewUpdateSchema = Joi.object({
	rating: Joi.number().integer().min(1).max(10).optional().messages({
		"number.base": "La puntuación debe ser un número.",
		"number.integer": "La puntuación debe ser un número entero.",
		"number.min": "La puntuación debe ser al menos 1.",
		"number.max": "La puntuación no puede ser mayor a 10.",
	}),
	comment: Joi.string().max(500).optional().allow("").messages({
		"string.max": "El comentario no puede tener más de 500 caracteres.",
	}),
}).min(1);
