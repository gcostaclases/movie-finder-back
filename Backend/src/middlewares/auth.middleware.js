//#region  ----------- IMPORTS -----------
// Importo constantes
import { UNAUTHORIZED_MESSAGE } from "../utils/constants.js";

// Importo la función para verificar el token
import { verifyToken } from "../utils/jwt.js";
//#endregion ----------- IMPORTS -----------

const authMiddleware = (req, res, next) => {
	const authHeader = req.headers["authorization"];

	// Si no hay token, devuelvo un error 401 (no autorizado)
	if (!authHeader) {
		return res.status(401).json({
			message: UNAUTHORIZED_MESSAGE,
		});
	}

	// Extraigo el token del header (porque se espera que venga en el formato "Bearer token")
	/*
		split(" ") -> ["Bearer", "token"]
		Con split divido el string en un array, usando el espacio como separador
		Y lo desestructuro en dos variables: scheme y token
	*/
	const [scheme, token] = authHeader.split(" ");

	// Si el esquema no es "Bearer" o no hay token, devuelvo un error 401 (no autorizado)
	if (scheme !== "Bearer" || !token) {
		return res.status(401).json({
			message: UNAUTHORIZED_MESSAGE,
		});
	}

	// Verificamos el token JWT
	const verified = verifyToken(token);

	// Si el token no es válido, devuelvo un error 401 (no autorizado)
	if (!verified) {
		return res.status(401).json({
			message: UNAUTHORIZED_MESSAGE,
		});
	}

	// Si el token es válido, guardo la información del usuario en la request para usarla en los siguientes middlewares o en el controlador
	req.user = verified;
	console.log("Verified user:", req.user);

	next();
};

export default authMiddleware;
