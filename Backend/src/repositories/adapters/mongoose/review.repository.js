//#region  ----------- IMPORTS -----------
// Importo el modelo de reseña
import Review from "./models/review.model.js";
import mongoose from "mongoose";
//#endregion ----------- IMPORTS -----------

/**
 * Crea una nueva reseña
 * @param {string} userId - ID del usuario
 * @param {string} movieId - ID de la película
 * @param {number} rating - Puntuación (1-10)
 * @param {string} comment - Comentario opcional
 * @returns {Promise<Object>} Reseña creada
 */
export const saveReview = async (userId, movieId, rating, comment) => {
	const newReview = new Review({
		userId,
		movieId,
		rating,
		comment,
	});
	return await newReview.save();
};

/**
 * Busca una reseña por filtro
 * @param {Object} filter - Filtro de búsqueda
 * @returns {Promise<Object|null>} Reseña encontrada o null
 */
export const findReview = async (filter) => {
	return await Review.findOne(filter).select("-__v");
};

/**
 * Busca todas las reseñas de una película
 * @param {string} movieId - ID de la película
 * @returns {Promise<Array>} Lista de reseñas con datos del usuario
 */
export const findReviewsByMovie = async (movieId) => {
	return await Review.find({ movieId }).populate("userId", "username").select("-__v").sort({ createdAt: -1 });
};

/**
 * Busca todas las reseñas de un usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Array>} Lista de reseñas con datos de la película
 */
export const findReviewsByUser = async (userId) => {
	return await Review.find({ userId }).populate("movieId", "title posterPath").select("-__v").sort({ createdAt: -1 });
};

/**
 * Actualiza una reseña
 * @param {string} reviewId - ID de la reseña
 * @param {number} rating - Nueva puntuación
 * @param {string} comment - Nuevo comentario
 * @returns {Promise<Object|null>} Reseña actualizada o null
 */
export const updateReview = async (reviewId, rating, comment) => {
	return await Review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true, runValidators: true });
};

/**
 * Elimina una reseña
 * @param {string} reviewId - ID de la reseña
 * @returns {Promise<Object|null>} Reseña eliminada o null
 */
export const deleteReview = async (reviewId) => {
	return await Review.findByIdAndDelete(reviewId);
};

/**
 * Calcula el promedio de puntuación de una película
 * @param {string} movieId - ID de la película
 * @returns {Promise<Object>} Objeto con averageRating y totalReviews
 */
export const getAverageRating = async (movieId) => {
	const result = await Review.aggregate([
		{ $match: { movieId: new mongoose.Types.ObjectId(movieId) } },
		{
			$group: {
				_id: "$movieId",
				averageRating: { $avg: "$rating" },
				totalReviews: { $sum: 1 },
			},
		},
	]);
	return result.length > 0 ? result[0] : { averageRating: 0, totalReviews: 0 };
};
