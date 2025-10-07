//#region  ----------- IMPORTS -----------
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
//#endregion ----------- IMPORTS -----------

// Ruta absoluta al archivo swagger.json
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const swaggerFilePath = path.join(__dirname, "../../swagger.json");

// Controlador para servir el archivo swagger.json
export const getSwaggerJson = (req, res) => {
	res.setHeader("Content-Type", "application/json");
	fs.readFile(swaggerFilePath, "utf8", (err, data) => {
		if (err) {
			res.status(500).json({ error: "Error al leer el archivo swagger.json" });
		} else {
			res.send(JSON.parse(data));
		}
	});
};
