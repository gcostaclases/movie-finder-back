//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo swagger-ui-express para servir la documentación
import swaggerUi from "swagger-ui-express";

// Importo el documento swagger
// import swaggerDocument from "../../swagger.json" with { type: "json" };

// Importo fs para leer archivos
import fs from "fs";

// Importo path para manejar rutas
import path from "path";

// Importo fileURLToPath para convertir la URL del archivo actual en una ruta del sistema
import { fileURLToPath } from "url";
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const documentationRouter = express.Router();

/**
 * Carga el archivo swagger.json dinámicamente y configura Swagger UI.
 * 
 * - Calcula el directorio actual usando `fileURLToPath` y `import.meta.url`.
 * - Construye la ruta absoluta al archivo swagger.json.
 * - Lee el archivo swagger.json y lo convierte en un objeto JavaScript.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "../../swagger.json"), "utf8"));

// Swagger UI
documentationRouter.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default documentationRouter;
