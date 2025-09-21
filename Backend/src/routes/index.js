// Importo las rutas
import healthRouter from "./health.router.js";
import documentationRouter from "./documentation.router.js";
import v1AuthRouter from "./auth.router.js";
import v1ProviderRouter from "./provider.router.js";
import v1UserRouter from "./user.router.js";

const setupRoutes = (app) => {
	// Public Routes (NO requieren autenticación)
	app.use("/api/v1/health", healthRouter);
	app.use("/api/v1/documentation", documentationRouter);
	app.use("/api/v1/auth", v1AuthRouter);

	// Private Routes (SÍ requieren autenticación)
	app.use("/api/v1/providers", v1ProviderRouter);
	app.use("/api/v1/me", v1UserRouter);
};

export default setupRoutes;
