//#region  ----------- IMPORTS -----------
// Importo constantes
import { INVALID_PAYLOAD_MESSAGE } from "../utils/constants.js";
//#endregion ----------- IMPORTS -----------

const payloadMiddleWare = (schema) => {
	return (req, res, next) => {
		const { body } = req;
		const { error } = schema.validate(body);

		if (error) {
			console.log("Error en la validación del payload:", error.message);
			res.status(403).json({
				message: INVALID_PAYLOAD_MESSAGE,
				// TODO: Chequear mejor como levantar los errores de Joi customizados para poner aca
				//details: error.details,
			});
			return;
		}
		next();
	};
};

export default payloadMiddleWare;
