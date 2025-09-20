import { UNAUTHORIZED_MESSAGE } from "../utils/constants.js";

const adminMiddleware = (req, res, next) => {
	const { userRole } = req.user;

	// Verificamos que el rol sea "admin"
	if (userRole !== "admin") {
		return res.status(401).json({
			message: UNAUTHORIZED_MESSAGE,
		});
	}
	next();
};

export default adminMiddleware;
