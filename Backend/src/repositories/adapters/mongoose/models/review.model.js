//#region  ----------- IMPORTS -----------
// Importo mongoose
import mongoose from "mongoose";

// Importo el esquema de reseña
import reviewSchema from "./schemas/review.schema.js";
//#endregion ----------- IMPORTS -----------

const Review = mongoose.model("Review", reviewSchema);

export default Review;
