//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo el middleware de autenticación
import authMiddleware from "../middlewares/auth.middleware.js";

// Importo las funciones del controlador
import {
	createReviewController,
	getMovieReviewsController,
	getMyReviewsController,
	updateReviewController,
	deleteReviewController,
} from "../controllers/review.controller.js";

// Importo el middleware para validar el payload
import payloadMiddleWare from "../middlewares/payload.middleware.js";

// Importo los schemas de validación de Joi
import { reviewCreateSchema, reviewUpdateSchema } from "./validations/review.router.schema.js";
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const v1ReviewRouter = express.Router();

//#region ----------- RUTAS PÚBLICAS -----------
// Obtener todas las reseñas de una película (público)
v1ReviewRouter.get("/movies/:movieId", getMovieReviewsController);
//#endregion ----------- RUTAS PÚBLICAS -----------

//#region ----------- RUTAS PROTEGIDAS -----------
// Aplico el middleware de autenticación a las siguientes rutas
v1ReviewRouter.use(authMiddleware);

// Crear una reseña
v1ReviewRouter.post("/", payloadMiddleWare(reviewCreateSchema), createReviewController);

// Obtener mis reseñas
v1ReviewRouter.get("/me", getMyReviewsController);

// Actualizar una reseña
v1ReviewRouter.patch("/:reviewId", payloadMiddleWare(reviewUpdateSchema), updateReviewController);

// Eliminar una reseña
v1ReviewRouter.delete("/:reviewId", deleteReviewController);
//#endregion ----------- RUTAS PROTEGIDAS -----------

export default v1ReviewRouter;
