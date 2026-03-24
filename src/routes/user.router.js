//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo las funciones del controlador
import {
	getMyProvidersController,
	addProviderToUserController,
	removeProviderFromUserController,
	getMyWatchlistController,
	addMovieToWatchlistController,
	removeMovieFromWatchlistController,
	getMyProfileController,
	uploadProfileImageController,
	replaceUserProvidersController,
} from "../controllers/user.controller.js";

// Importo el middleware de autenticación
import authMiddleware from "../middlewares/auth.middleware.js";

// Importo el middleware para validar el payload
import payloadMiddleWare from "../middlewares/payload.middleware.js";

// Importo el middleware de uploads multer para la subida de archivos
import uploadMiddleware from "../middlewares/upload.middleware.js";
import {
	userAddProviderSchema,
	userAddWatchlistSchema,
	userReplaceProvidersSchema,
} from "./validations/user.router.schema.js";
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const v1UserRouter = express.Router();

// Aplico el middleware de autenticación a todas las rutas definidas en este router
v1UserRouter.use(authMiddleware);

//#region ----------- PROVIDERS -----------
// Obtener los proveedores del usuario autenticado
v1UserRouter.get("/providers", getMyProvidersController);

// Agregar un proveedor a la lista del usuario autenticado
v1UserRouter.post("/providers", payloadMiddleWare(userAddProviderSchema), addProviderToUserController);

// Reemplazar la lista de proveedores del usuario autenticado
v1UserRouter.put("/providers", payloadMiddleWare(userReplaceProvidersSchema), replaceUserProvidersController);

// Quitar un proveedor de la lista del usuario autenticado
v1UserRouter.delete("/providers/:providerId", removeProviderFromUserController);
//#endregion ----------- PROVIDERS -----------

//#region ----------- WATCHLIST -----------
// Obtener la watchlist del usuario autenticado
v1UserRouter.get("/watchlist", getMyWatchlistController);

// Agregar una película a la watchlist del usuario autenticado
v1UserRouter.post("/watchlist", payloadMiddleWare(userAddWatchlistSchema), addMovieToWatchlistController);

// Quitar una película de la watchlist del usuario autenticado
v1UserRouter.delete("/watchlist/:movieId", removeMovieFromWatchlistController);
//#endregion ----------- WATCHLIST -----------

//#region ----------- PROFILE -----------
// Obtener el perfil del usuario autenticado
v1UserRouter.get("/profile", getMyProfileController);

// Subir la imagen de perfil del usuario autenticado
v1UserRouter.put("/profile-image", uploadMiddleware("image"), uploadProfileImageController);
//#endregion ----------- PROFILE -----------

export default v1UserRouter;

