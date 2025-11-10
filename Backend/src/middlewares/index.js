//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo morgan para logging
/* Morgan es un middleware que nos permite hacer logging de las requests que llegan al servidor */
import morgan from "morgan";

// Importo rate-limiter
import rateLimit from "express-rate-limit";

// Importo CORS
import cors from "cors";
//#endregion ----------- IMPORTS -----------

// Configuro el rate-limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	message: "Too many requests from this IP, please try again later.",
});

const setupMiddlewares = (app) => {
	// Common Middlewares
	app.use(express.json()); // Middleware para parsear JSON
	app.use(morgan("dev")); // Middleware morgan para logging
	app.use(limiter); // Middleware para limitar la cantidad de requests
	app.use(
		cors({
			origin: [
				"http://localhost:3000",
				"https://localhost:3000",
				"http://pelis-y-series-app.vercel.app",
				"https://pelis-y-series-app.vercel.app",
				"http://pelis-y-series-app-gcostaclases-projects.vercel.app/",
				"https://pelis-y-series-app-gcostaclases-projects.vercel.app/",
				"http://pelis-y-series-app-git-fix-swagger-vercel-gcostaclases-projects.vercel.app",
				"https://pelis-y-series-app-git-fix-swagger-vercel-gcostaclases-projects.vercel.app",
			], // Desarrollo y producción. Acepta requests solo de estos orígenes
		})
	); // Middleware para habilitar CORS
};

export default setupMiddlewares;
