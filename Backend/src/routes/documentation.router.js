//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo swagger-ui-express para servir la documentación
import swaggerUi from "swagger-ui-express";

// Importo el documento swagger
import swaggerDocument from "../../swagger.json" with { type: "json" };
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const documentationRouter = express.Router();

// Swagger UI
documentationRouter.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default documentationRouter;
