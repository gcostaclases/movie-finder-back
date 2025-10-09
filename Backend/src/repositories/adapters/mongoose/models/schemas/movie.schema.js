//#region  ----------- IMPORTS -----------
// Importo mongoose
import mongoose from "mongoose";
//#endregion ----------- IMPORTS -----------

const movieSchema = new mongoose.Schema(
	{
		tmdbId: { type: Number, required: true, unique: true }, // ID de TMDB
		title: { type: String, required: true },
		originalTitle: { type: String, required: true }, // Título original
		overview: { type: String, default: "Sin descripción disponible" }, // Sinopsis
		posterPath: { type: String, required: true }, // Ruta del póster
		releaseDate: { type: Date, required: true }, // Fecha de estreno
		originalLanguage: { type: String, required: true }, // Idioma original (ej: "en", "es")
		duration: { type: Number, required: true }, // Duración en minutos
		genres: {
			type: [String], // Array de géneros (ej: ["Action", "Drama"])
			required: true,
		},
		actors: [
			{
				name: { type: String, required: true }, // Nombre del actor
				role: { type: String, default: "Sin rol especificado" }, // Rol del actor (ej: "Protagonista")
			},
		],
		directors: [
			{
				name: { type: String, required: true, default: "Director desconocido" }, // Nombre del director
			},
		],
	},
	{
		timestamps: true,
		collection: "movies",
	}
);

export default movieSchema;
