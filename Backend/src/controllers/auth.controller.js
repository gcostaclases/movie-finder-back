//#region  ----------- IMPORTS -----------
// Importo las funciones del repositorio
import { findUser, countUsers, saveUser } from "../repositories/user.repository.js";

// Importo constantes
import { INTERNAL_SERVER_ERROR } from "../utils/constants.js";

// Importo la función para firmar el token
import { signToken } from "../utils/jwt.js";
//#endregion ----------- IMPORTS -----------

export const postLogin = async (req, res) => {
	// Desestructuro el body para obtener identifier y password
	const { identifier, password } = req.body; // identifier puede ser email o username

	try {
		// Busco el usuario por email o username
		const user = await findUser({
			$or: [{ email: identifier }, { username: identifier }],
		});

		// Si no lo encuentro, retorno error 403
		if (!user) {
			return res.status(403).json({
				message: "Usuario no encontrado",
			});
		}

		// Si llegué hasta acá, es porque encontré el usuario

		// Verifico que la contraseña sea correcta usando el método definido en el esquema
		const isPassOK = await user.isValidPassword(password);

		// Si la contraseña no es correcta, retorno error 403
		if (!isPassOK) {
			return res.status(403).json({
				message: "Credenciales inválidas",
			});
		}

		// Si está todo bien genero el token y mando mensaje exitoso

		// Genero el token
		console.log("Usuario ID:", user.id, " - Rol:", user.role);

		const token = signToken(user.id, user.role);

		// Retorno el token y un mensaje de éxito
		return res.json({
			token,
			message: "Inicio de sesión exitoso",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

export const postSignup = async (req, res) => {
	const { username, email, password } = req.body;

	// Verifico si el email ya existe
	const emailCount = await countUsers({ email });
	if (emailCount > 0) {
		return res.status(403).json({
			message: "El email ya está registrado",
		});
	}

	// Verifico si el username ya existe
	const usernameCount = await countUsers({ username });
	if (usernameCount > 0) {
		return res.status(403).json({
			message: "El nombre de usuario ya está registrado",
		});
	}

	try {
		// Validación de datos del usuario
		await saveUser(username, email, password);

		// Retorno 201 con mensaje de éxito
		return res.status(201).json({
			message: "Usuario creado exitosamente",
		});
	} catch (error) {
		console.error("Error en postSignup:", error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};
