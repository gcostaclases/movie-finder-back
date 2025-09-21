// Importo las rutas
import publicRouter from "./public.router.js";
import v1AuthRouter from "./auth.router.js";
import v1ProviderRouter from "./provider.router.js";

const setupRoutes = (app) => {
	// Public Routes (NO requieren autenticación)
	app.use("/api/v1", publicRouter);
	app.use("/api/v1/auth", v1AuthRouter);

	// Private Routes (SÍ requieren autenticación)
	app.use("/api/v1/providers", v1ProviderRouter);
};

export default setupRoutes;
