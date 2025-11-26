//#region  ----------- IMPORTS -----------
// Importo el factory de repositorios
import repoFactory from "../repositories/repositories.service.js";

// Importo constantes
import { INTERNAL_SERVER_ERROR } from "../utils/constants.js";

// Importo la función para firmar el token
import { signToken } from "../utils/jwt.js";
//#endregion ----------- IMPORTS -----------

/**
 * Inicia sesión de usuario
 * POST /auth/login
 * @param {Object} req - Request de Express
 * @param {Object} req.body - Cuerpo de la petición
 * @param {string} req.body.identifier - Email o username del usuario
 * @param {string} req.body.password - Contraseña del usuario
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con token JWT y mensaje de éxito o error 403
 */
export const postLogin = async (req, res) => {
	// Desestructuro el body para obtener identifier y password
	const { identifier, password } = req.body; // identifier puede ser email o username

	try {
		// Busco el usuario por email o username
		const user = await repoFactory.findUser({
			$or: [{ email: identifier }, { username: identifier }],
		});

		// Si no lo encuentro, retorno error 404
		if (!user) {
			return res.status(404).json({
				message: "Usuario no encontrado",
			});
		}

		// Si llegué hasta acá, es porque encontré el usuario

		// Verifico que la contraseña sea correcta usando el método definido en el esquema
		const isPassOK = await user.isValidPassword(password);

		// Si la contraseña no es correcta, retorno error 400
		if (!isPassOK) {
			return res.status(400).json({
				message: "Credenciales inválidas",
			});
		}

		// Si está todo bien genero el token y mando mensaje exitoso
		//console.log("Usuario ID:", user.id, " - Rol:", user.role);

		// Genero el token
		const token = signToken(user.id, user.role);

		// Retorno el token y un mensaje de éxito
		// return res.status(200).json({
		// 	token,
		// 	message: "Inicio de sesión exitoso",
		// });
		return res.status(200).json({
			token,
			message: "Inicio de sesión exitoso",
			user: {
				username: user.username,
				profileImage: user.profileImage,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: INTERNAL_SERVER_ERROR,
		});
	}
};

/**
 * Registra un nuevo usuario
 * POST /auth/signup
 * @param {Object} req - Request de Express
 * @param {Object} req.body - Cuerpo de la petición
 * @param {string} req.body.username - Nombre de usuario (3-20 caracteres)
 * @param {string} req.body.email - Email del usuario
 * @param {string} req.body.password - Contraseña (min 8 caracteres, mayúscula, minúscula, número y símbolo)
 * @param {Object} res - Response de Express
 * @returns {Promise<void>} JSON con mensaje de éxito (201) o error 403/500
 */
export const postSignup = async (req, res) => {
	const { username, email, password } = req.body;

	// Verifico si el email ya existe
	const emailCount = await repoFactory.countUsers({ email });
	if (emailCount > 0) {
		return res.status(400).json({
			message: "El email ya está registrado",
		});
	}

	// Verifico si el username ya existe
	const usernameCount = await repoFactory.countUsers({ username });
	if (usernameCount > 0) {
		return res.status(400).json({
			message: "El nombre de usuario ya está registrado",
		});
	}

	try {
		// Validación de datos del usuario
		await repoFactory.saveUser(username, email, password);

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

