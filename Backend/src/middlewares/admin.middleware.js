//#region  ----------- IMPORTS -----------
// Importo constantes
import { UNAUTHORIZED_MESSAGE } from "../utils/constants.js";
//#endregion ----------- IMPORTS -----------

const adminMiddleware = (req, res, next) => {
	const { userRole } = req.user;
	console.log(userRole);

	// Verificamos que el rol sea "admin"
	if (userRole !== "admin") {
		return res.status(401).json({
			message: UNAUTHORIZED_MESSAGE,
		});
	}
	next();
};

export default adminMiddleware;
