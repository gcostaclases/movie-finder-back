//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo swagger-ui-express para servir la documentación
import swaggerUi from "swagger-ui-express";

// Importo el documento swagger
//import swaggerDocument from "../../swagger.json" with { type: "json" };

import { getAbsoluteFSPath } from "swagger-ui-dist";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const documentationRouter = express.Router();

// Ruta absoluta al archivo swagger.json
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "../../swagger.json"), "utf8"));

// Ruta absoluta a los recursos estáticos de Swagger UI
const swaggerUiDistPath = getAbsoluteFSPath();

// Opciones personalizadas para Swagger UI
const swaggerUiOptions = {
	explorer: true,
	customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css",
};

// Servir los recursos estáticos de Swagger UI
documentationRouter.use("/swagger-static", express.static(swaggerUiDistPath));

// Servir Swagger UI con las opciones personalizadas
documentationRouter.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));

export default documentationRouter;
