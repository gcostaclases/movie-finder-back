//#region  ----------- IMPORTS -----------
// Importo Joi
import Joi from "joi";
//#endregion ----------- IMPORTS -----------

export const userAddProviderSchema = Joi.object({
	providerId: Joi.string().length(24).required().messages({
		"string.base": "El ID del proveedor debe ser un string.",
		"string.length": "El ID del proveedor debe tener 24 caracteres.",
		"any.required": "El campo providerId es obligatorio.",
	}),
});

export const userReplaceProvidersSchema = Joi.array().items(Joi.string().length(24)).required().messages({
	"array.base": "Debes enviar un array de IDs de proveedores.",
	"any.required": "El array de IDs es obligatorio.",
});

export const userAddWatchlistSchema = Joi.object({
	movieId: Joi.string().length(24).required().messages({
		"string.base": "El ID de la película debe ser un string.",
		"string.length": "El ID de la película debe tener 24 caracteres.",
		"any.required": "El campo movieId es obligatorio.",
	}),
});

