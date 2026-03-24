//#region  ----------- IMPORTS -----------
// Importo Joi
import Joi from "joi";
//#endregion ----------- IMPORTS -----------

/**
 * Schema de validación para reportar la disponibilidad
 */
export const reportAvailabilitySchema = Joi.object({
	providerId: Joi.string().required().messages({
		"string.empty": "El ID del proveedor es obligatorio.",
		"any.required": "El ID del proveedor es obligatorio.",
	}),
});
