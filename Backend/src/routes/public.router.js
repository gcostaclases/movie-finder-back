//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo swagger-ui-express para servir la documentación
import swaggerUi from "swagger-ui-express";

// Importo el documento swagger
import swaggerDocument from "../../swagger.json" with { type: "json" };

// Importo las funciones del controlador
import { getPing } from "../controllers/public.controller.js";
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const publicRouter = express.Router();

// Ping
publicRouter.get("/ping", getPing);
// Swagger
publicRouter.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default publicRouter;
