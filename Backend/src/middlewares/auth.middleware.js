//#region  ----------- IMPORTS -----------
// Importo constantes
import { UNAUTHORIZED_MESSAGE } from "../utils/constants.js";

// Importo la función para verificar el token
import { verifyToken } from "../utils/jwt.js";
//#endregion ----------- IMPORTS -----------

const authMiddleware = (req, res, next) => {
	const token = req.headers["authorization"];
	// Verificamos el token JWT
	const verified = verifyToken(token);

	if (!token || !verified) {
		res.status(401).json({
			message: UNAUTHORIZED_MESSAGE,
		});
		return;
	}
	req.user = verified;
	console.log("Verified user:", req.user);

	next();
};

export default authMiddleware;
