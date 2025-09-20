// Importo express
import express from "express";

// Importo el setup de middlewares
import setupMiddlewares from "../middlewares/index.js";
import setupRoutes from "../routes/index.js";

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
