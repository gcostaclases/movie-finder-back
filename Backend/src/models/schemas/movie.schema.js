//#region  ----------- IMPORTS -----------
// Importo mongoose
import mongoose from "mongoose";
//#endregion ----------- IMPORTS -----------

const movieSchema = new mongoose.Schema(
	{
		tmdbId: { type: Number, required: true, unique: true }, // ID de TMDB
		title: { type: String, required: true },
		overview: String,
		posterPath: String,
		releaseDate: String,
		providers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Provider" }],
	},
	{
		timestamps: true,
		collection: "movies",
	}
);

export default movieSchema;
