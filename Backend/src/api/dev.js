//#region  ----------- IMPORTS -----------
// Importo la función que crea la app de express
import createApp from "../app/app.js";
//#endregion ----------- IMPORTS -----------

// Creo la app de express
const app = createApp();

// Traigo el puerto que está definido las variables de entorno
const { PORT } = process.env;

// Pongo a escuchar el servidor en el puerto PORT
app.listen(PORT, () => {
	console.log(`El servidor esta corriendo en http://localhost:${PORT}`);
});