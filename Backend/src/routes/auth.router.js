//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo las funciones del controlador
import { postLogin, postSignup } from "../controllers/auth.controller.js";

// Importo el middleware para validar el payload
import payloadMiddleWare from "../middlewares/payload.middleware.js";

// Importo los schemas de validación de Joi
import { userLoginSchema, userSignUpSchema } from "./validations/auth.router.schema.js";
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const v1AuthRouter = express.Router();

// Login
v1AuthRouter.post("/login", payloadMiddleWare(userLoginSchema), postLogin);
// Registro
v1AuthRouter.post("/register", payloadMiddleWare(userSignUpSchema), postSignup);

export default v1AuthRouter;
