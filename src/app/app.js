//#region  ----------- IMPORTS -----------
// Importo y cargo las variables de entorno PRIMERO que nada
import "../config/env.js";

// Importo Sentry para monitoreo y manejo de errores
import Sentry from "../utils/instrument.js";

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

	// Sentry error handler (debe ir al final de todo)
	// Funciona como middleware, recoge métricas y las envía
	Sentry.setupExpressErrorHandler(app);

	return app;
};

export default createApp;

