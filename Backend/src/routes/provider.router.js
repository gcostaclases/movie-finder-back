//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo el middleware de autenticación
import authMiddleware from "../middlewares/auth.middleware.js";

// Importo el middleware de autorización (solo admin)
import adminMiddleware from "../middlewares/admin.middleware.js";

// Importo las funciones del controlador
import {
	getAllProvidersController,
	getProviderByIdController,
	createProviderController,
	updateProviderController,
	deleteProviderController,
} from "../controllers/provider.controller.js";
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const v1ProviderRouter = express.Router();

// Aplico el middleware de autenticación a todas las rutas definidas en este router
v1ProviderRouter.use(authMiddleware);

// Obtener todos los proveedores (todos los usuarios)
v1ProviderRouter.get("/", getAllProvidersController);

// Obtener proveedor por id (todos los usuarios)
v1ProviderRouter.get("/:id", getProviderByIdController);

// Crear proveedor (solo admin)
v1ProviderRouter.post("/", adminMiddleware, createProviderController);

// Editar proveedor (solo admin)
v1ProviderRouter.patch("/:id", adminMiddleware, updateProviderController);

// Eliminar proveedor (solo admin)
v1ProviderRouter.delete("/:id", adminMiddleware, deleteProviderController);

export default v1ProviderRouter;
