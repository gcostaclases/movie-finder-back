//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo las funciones del controlador
import { getPing } from "../controllers/health.controller.js";
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const healthRouter = express.Router();

// Ping
healthRouter.get("/ping", getPing);

export default healthRouter;
