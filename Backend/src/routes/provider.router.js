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

// Importo el middleware para validar el payload
import payloadMiddleWare from "../middlewares/payload.middleware.js";

// Importo los schemas de validación de Joi
import { providerCreateSchema, providerUpdateSchema } from "./validations/provider.router.schema.js";
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const v1ProviderRouter = express.Router();

// ========== RUTAS PÚBLICAS ==========

// Obtener todos los proveedores (todos los usuarios)
v1ProviderRouter.get("/", getAllProvidersController);

// Obtener proveedor por id (todos los usuarios)
v1ProviderRouter.get("/:id", getProviderByIdController);

// ========== RUTAS PROTEGIDAS (requieren autenticación) ==========

// Aplico el middleware de autenticación a todas las rutas siguientes definidas en este router
v1ProviderRouter.use(authMiddleware);

// Crear proveedor (solo admin)
v1ProviderRouter.post("/", adminMiddleware, payloadMiddleWare(providerCreateSchema), createProviderController);

// Editar proveedor (solo admin)
v1ProviderRouter.patch("/:id", adminMiddleware, payloadMiddleWare(providerUpdateSchema), updateProviderController);

// Eliminar proveedor (solo admin)
v1ProviderRouter.delete("/:id", adminMiddleware, deleteProviderController);

export default v1ProviderRouter;
