//#region  ----------- IMPORTS -----------
// Importo y cargo las variables de entorno PRIMERO que nada
import "../config/env.js";

// Importo express
import express from "express";

// Importo el setup de middlewares
import setupMiddlewares from "../middlewares/index.js";

// Importo el setup de rutas
import setupRoutes from "../routes/index.js";
//#endregion ----------- IMPORTS -----------

/**
 * Create App
 * @returns app Express
 */
const createApp = () => {
	// Creo la app de express
	const app = express();

	// Setup common middlewares (middlewares generales)
	setupMiddlewares(app);

	// Setup routes
	setupRoutes(app);

	return app;
};

export default createApp;

