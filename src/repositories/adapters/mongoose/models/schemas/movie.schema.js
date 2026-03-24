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
		backdropPath: { type: String, default: "" }, // Banner horizontal (backdrop)
		posterPath: { type: String, default: "" }, // Ruta del póster
		releaseDate: { type: Date, required: true }, // Fecha de estreno
		originalLanguage: { type: String, required: true }, // Idioma original (ej: "en", "es")
		duration: { type: Number, required: true }, // Duración en minutos
		genres: [
			{
				tmdbId: { type: Number, required: true }, // ID de TMDB del género
				name: { type: String, required: true }, // Nombre del género
			},
		],
		actors: [
			{
				tmdbId: { type: Number, required: true }, // ID de TMDB del actor
				name: { type: String, required: true }, // Nombre del actor
				role: { type: String, default: "Sin rol especificado" }, // Rol del actor (ej: "Protagonista")
				image: { type: String, default: "" }, // URL de la imagen del actor
			},
		],
		directors: [
			{
				tmdbId: { type: Number, required: true }, // ID de TMDB del director
				name: { type: String, required: true, default: "Director desconocido" }, // Nombre del director
				image: { type: String, default: "" }, // URL de la imagen del director
			},
		],
	},
	{
		timestamps: true,
		collection: "movies",
	}
);

export default movieSchema;

