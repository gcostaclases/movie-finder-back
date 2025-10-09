//#region  ----------- IMPORTS -----------
// Importo mongoose
import mongoose from "mongoose";
//#endregion ----------- IMPORTS -----------

/**
 * Schema de reseña de película
 * Una reseña vincula un usuario con una película y contiene puntuación y comentario opcional
 */
const reviewSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		movieId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Movie",
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 10,
			validate: {
				validator: Number.isInteger,
				message: "La puntuación debe ser un número entero entre 1 y 10.",
			},
		},
		comment: {
			type: String,
			required: false,
			maxLength: 500,
		},
	},
	{
		timestamps: true,
		collection: "reviews",
	}
);

// Índice compuesto para evitar que un usuario reseñe la misma película más de una vez
reviewSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default reviewSchema;

//#region ----------- NOTAS PARA MI -----------
/**
 * ÍNDICE COMPUESTO ÚNICO
 *
 * Propósito: Garantizar que un usuario solo pueda reseñar una película UNA vez
 *
 * Funcionamiento:
 * - MongoDB crea un índice combinando userId + movieId
 * - Antes de insertar, MongoDB verifica si ya existe esa combinación
 * - Si existe: lanza error (duplicate key error)
 * - Si no existe: permite la inserción
 *
 * Beneficio adicional: Acelera búsquedas del tipo "¿este usuario ya reseñó esta peli?"
 */
//#endregion ---------- NOTAS PARA MI -----------
