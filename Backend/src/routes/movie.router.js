//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo el middleware de autenticación
import authMiddleware from "../middlewares/auth.middleware.js";

// Importo el middleware para validar el payload
import payloadMiddleWare from "../middlewares/payload.middleware.js";

// Importo las funciones del controlador de películas
import {
	getAllMoviesController,
	getMovieByIdController,
	searchMoviesController,
} from "../controllers/movie.controller.js";

// Importo las funciones del controlador de disponibilidad
import {
	reportMovieAvailabilityController,
	getMovieAvailabilityController,
	getPersonalizedAvailabilityController,
} from "../controllers/availability.controller.js";

// Importo los schemas de validación de Joi
import { reportAvailabilitySchema } from "./validations/availability.router.schema.js";
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const v1MovieRouter = express.Router();

// ========== RUTAS PÚBLICAS ==========

// Listar y buscar películas
v1MovieRouter.get("/", getAllMoviesController);
v1MovieRouter.get("/search", searchMoviesController);

// Obtener disponibilidad de una película
v1MovieRouter.get("/:movieId/availability", getMovieAvailabilityController);

// Detalle de película
// ! (debe ir al final para evitar conflictos con /:movieId/availability)
v1MovieRouter.get("/:id", getMovieByIdController);

// ========== RUTAS PROTEGIDAS (requieren autenticación) ==========

// Aplico el middleware de autenticación a todas las rutas siguientes definidas en este router
v1MovieRouter.use(authMiddleware);

// Reportar disponibilidad
v1MovieRouter.post(
	"/:movieId/availability",
	payloadMiddleWare(reportAvailabilitySchema),
	reportMovieAvailabilityController
);

// Obtener disponibilidad personalizada
v1MovieRouter.get("/:movieId/availability/personalized", getPersonalizedAvailabilityController);

export default v1MovieRouter;
