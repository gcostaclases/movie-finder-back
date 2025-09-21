//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo morgan para logging
/* Morgan es un middleware que nos permite hacer logging de las requests que llegan al servidor */
import morgan from "morgan";
//#endregion ----------- IMPORTS -----------

const setupMiddlewares = (app) => {
	// Common Middlewares
	app.use(express.json()); // Middleware para parsear JSON
	app.use(morgan("dev")); // Middleware morgan para logging
};

export default setupMiddlewares;
