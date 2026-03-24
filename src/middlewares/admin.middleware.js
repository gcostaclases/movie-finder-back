//#region  ----------- IMPORTS -----------
// Importo constantes
import { FORBIDDEN_MESSAGE } from "../utils/constants.js";
//#endregion ----------- IMPORTS -----------

const adminMiddleware = (req, res, next) => {
	const { userRole } = req.user;
	console.log(userRole);

	// Verifico que el rol sea "admin"
	if (userRole !== "admin") {
		return res.status(403).json({
			message: FORBIDDEN_MESSAGE,
		});
	}
	next();
};

export default adminMiddleware;
