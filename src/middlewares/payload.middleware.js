//#region  ----------- IMPORTS -----------
// Importo constantes
import { INVALID_PAYLOAD_MESSAGE } from "../utils/constants.js";
//#endregion ----------- IMPORTS -----------

const payloadMiddleWare = (schema) => {
	return (req, res, next) => {
		const { body } = req;
		// Validación con abortEarly: false para obtener todos los errores
		const { error } = schema.validate(body, { abortEarly: false });

		if (error) {
			console.log("Error en la validación del payload:", error.message);
			res.status(400).json({
				message: INVALID_PAYLOAD_MESSAGE,
				details: error.details.map((detail) => detail.message),
			});
			return;
		}
		next();
	};
};

export default payloadMiddleWare;

