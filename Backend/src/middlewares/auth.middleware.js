import { UNAUTHORIZED_MESSAGE } from "../utils/constants.js";
import { verifyToken } from "../utils/jwt.js";

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
	next();
};

export default authMiddleware;
