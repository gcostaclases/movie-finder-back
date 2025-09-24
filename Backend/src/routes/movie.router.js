//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo el middleware de autenticación
import authMiddleware from "../middlewares/auth.middleware.js";

// Importo las funciones del controlador
import { getMoviesController } from "../controllers/movie.controller.js";
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const v1MovieRouter = express.Router();

// Aplico el middleware de autenticación a todas las rutas definidas en este router
v1MovieRouter.use(authMiddleware);

// Obtener todas las películas (con filtro opcional por título)
v1MovieRouter.get("/", getMoviesController);

export default v1MovieRouter;
