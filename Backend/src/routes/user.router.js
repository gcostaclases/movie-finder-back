//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo las funciones del controlador
import {
	getMyProvidersController,
	addProviderToUserController,
	removeProviderFromUserController,
} from "../controllers/user.controller.js";

// Importo el middleware de autenticación
import authMiddleware from "../middlewares/auth.middleware.js";
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const v1UserRouter = express.Router();

// Aplico el middleware de autenticación a todas las rutas definidas en este router
v1UserRouter.use(authMiddleware);

// Obtener los proveedores del usuario autenticado
v1UserRouter.get("/providers", getMyProvidersController);

// Agregar un proveedor a la lista del usuario autenticado
v1UserRouter.post("/providers", addProviderToUserController);

// Quitar un proveedor de la lista del usuario autenticado
v1UserRouter.delete("/providers/:providerId", removeProviderFromUserController);

export default v1UserRouter;
