//#region  ----------- IMPORTS -----------
// Importo express
import express from "express";

// Importo swagger-ui-express para servir la documentación
import swaggerUi from "swagger-ui-express";

// Importo el documento swagger
//import swaggerDocument from "../../swagger.json" with { type: "json" };

// Importo funciones de swagger-ui-dist para obtener la ruta absoluta de los recursos estáticos
import { getAbsoluteFSPath } from "swagger-ui-dist";

// Importo módulos para manejar archivos y rutas
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
//#endregion ----------- IMPORTS -----------

// Defino el conjunto de rutas dentro del router
const documentationRouter = express.Router();

// Fuente de la solución para servir Swagger UI en producción (Vercel):
// https://github.com/swagger-api/swagger-ui/issues/8461

/**
 * Ruta absoluta al archivo swagger.json
 *
 * - En local, el archivo swagger.json se encuentra en ../../swagger.json.
 * - En producción (Vercel), tuve que asegurarme de que el archivo se incluyera correctamente en el despliegue.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "../../swagger.json"), "utf8"));

/**
 * Ruta absoluta a los recursos estáticos de Swagger UI
 *
 * - Swagger UI necesita cargar archivos estáticos como CSS y JS para renderizar la documentación.
 * - Use `swagger-ui-dist` para obtener la ruta absoluta de estos recursos y servirlos manualmente.
 */
const swaggerUiDistPath = getAbsoluteFSPath();

/**
 * Opciones personalizadas para Swagger UI
 *
 * - Incluí un CSS personalizado para corregir el problema del texto en vertical en producción.
 * - Cargué el CSS principal desde un CDN para evitar problemas con archivos bloqueados en Vercel.
 * - Configuré el favicon desde el mismo CDN
 * !(aunque no se está cargando correctamente).
 */
const swaggerUiOptions = {
	explorer: true,
	customCss: `
    .swagger-ui .opblock .opblock-summary-path-description-wrapper {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: 0 10px;
      padding: 0 10px;
      width: 100%;
    }
  `,
	customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css",
	customfavIcon: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/favicon-32x32.png",
};

// Servir los recursos estáticos de Swagger UI
documentationRouter.use("/swagger-static", express.static(swaggerUiDistPath));

// Servir Swagger UI con las opciones personalizadas
documentationRouter.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));

export default documentationRouter;
