//#region  ----------- IMPORTS -----------
// Importo las rutas
import healthRouter from "./health.router.js";
import documentationRouter from "./documentation.router.js";
import v1AuthRouter from "./auth.router.js";
import v1ProviderRouter from "./provider.router.js";
import v1UserRouter from "./user.router.js";
import v1MovieRouter from "./movie.router.js";
import v1ReviewRouter from "./review.router.js";
//#endregion ----------- IMPORTS -----------

const setupRoutes = (app) => {
	// Redirigir el endpoint raíz a la documentación de Swagger
	/* El guion bajo (_) es una convención para indicar que el parámetro no se usa (req), pero se mantiene para respetar la firma de la función. */
	app.get("/", (_, res) => {
		res.redirect("/api/v1/documentation/swagger/");
	});

	// Public Routes (NO requieren autenticación)
	app.use("/api/v1/health", healthRouter);
	app.use("/api/v1/documentation", documentationRouter);
	app.use("/api/v1/auth", v1AuthRouter);

	// Private Routes (SÍ requieren autenticación)
	app.use("/api/v1/providers", v1ProviderRouter);
	app.use("/api/v1/me", v1UserRouter);
	app.use("/api/v1/movies", v1MovieRouter);
	app.use("/api/v1/reviews", v1ReviewRouter);
};

export default setupRoutes;
