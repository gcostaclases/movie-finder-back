//#region  ----------- IMPORTS -----------
// Importo mongoose
import mongoose from "mongoose";

// Importo el esquema de película
import movieSchema from "./schemas/movie.schema.js";
//#endregion ----------- IMPORTS -----------

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
