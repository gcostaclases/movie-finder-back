//#region  ----------- IMPORTS -----------
// Importo y cargo las variables de entorno PRIMERO que nada
import "./config/env.js";
//import "dotenv/config"; // Este comando importa y disponibiliza ya las variables de entorno (ejecuta automáticamente dotenv.config())

// Importo la función para conectar a MongoDB
import connectToMongoDB from "./services/mongo.client.js";

// Importo la función que crea la app de express
import createApp from "./app/app.js";
//#endregion ----------- IMPORTS -----------

// Conecto a MongoDB
// Si la conexión falla, salgo de la aplicación porque no tiene sentido levantar la API si no carga la base de datos
(async () => {
	try {
		await connectToMongoDB();
		console.log("Conexión a MongoDB OK");
	} catch (error) {
		console.log("Error conectando a MongoDB:", error);
		process.exit(1); // Salgo de la aplicación con código de error
	}
})();

// Creo la app de express
const app = createApp();

// Traigo el puerto que está definido las variables de entorno
const { PORT } = process.env;

// Pongo a escuchar el servidor en el puerto PORT
app.listen(PORT, () => {
	console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});
