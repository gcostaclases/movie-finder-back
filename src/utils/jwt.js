//#region  ----------- IMPORTS -----------
//Importo jsonwebtoken para crear y verificar tokens
import jwt from "jsonwebtoken";
//#endregion ----------- IMPORTS -----------

// Traigo la secret key desde las variables de entorno
const { SECRET_KEY } = process.env;

export const signToken = (id, role) => {
	const token = jwt.sign(
		{
			userId: id,
			userRole: role,
		},
		SECRET_KEY,
		{
			expiresIn: "1h",
		}
	);
	return token;
};

export const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		return decoded;
	} catch (error) {
		return null;
	}
};
