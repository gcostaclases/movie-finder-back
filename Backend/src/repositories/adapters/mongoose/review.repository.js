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

// /**
//  * Busca todas las reseñas de una película con paginación
//  * @param {string} movieId - ID de la película
//  * @param {number} [page=1] - Número de página para la paginación
//  * @param {number} [limit=10] - Cantidad de resultados por página
//  * @returns {Promise<Array>} Lista de reseñas con datos del usuario
//  */
// export const findReviewsByMovie = async (movieId, page = 1, limit = 10) => {
// 	return await Review.find({ movieId })
// 		.populate("userId", "username -_id")
// 		.select("-__v")
// 		.sort({ createdAt: -1 })
// 		.skip((page - 1) * limit) // Salto resultados para paginación
// 		.limit(limit); // Limito la cantidad de resultados;
// };

export const findReviewsByMovie = async (movieId, page = 1, limit = 10) => {
	return await Review.find({ movieId })
		.populate({
			path: "userId",
			select: "username profileImage", // Trae username y foto
			model: "User",
		})
		.select("-__v")
		.sort({ createdAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit)
		.lean(); // Devuelve objetos planos, pero mantiene userId como objeto
};

/**
 * Cuenta la cantidad total de reseñas de una película
 * @param {string} movieId - ID de la película
 * @returns {Promise<number>} Cantidad total de reseñas
 */
export const countReviewsByMovie = async (movieId) => {
	return await Review.countDocuments({ movieId });
};

// /**
//  * Busca todas las reseñas de un usuario
//  * @param {string} userId - ID del usuario
//  * @returns {Promise<Array>} Lista de reseñas con datos de la película
//  */
// export const findReviewsByUser = async (userId) => {
// 	return await Review.find({ userId }).populate("movieId", "title posterPath").select("-__v").sort({ createdAt: -1 });
// };

/**
 * Busca todas las reseñas de un usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Array>} Lista de reseñas con datos de la película
 */
export const findReviewsByUser = async (userId) => {
	return await Review.find({ userId })
		.populate("movieId", "title posterPath")
		.select("-__v")
		.sort({ createdAt: -1 })
		.lean();
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
 * Calcula el promedio de puntuación y total de reseñas de una película
 *
 * Utilizo MongoDB Aggregation Pipeline para:
 * 1. Filtrar todas las reseñas de la película específica ($match)
 * 2. Agruparlas por movieId ($group)
 * 3. Calcular el promedio aritmético de los ratings ($avg)
 * 4. Contar el total de reseñas ($sum)
 *
 * Ejemplo de resultado:
 * - Si hay 3 reseñas con ratings [8, 9, 10]:
 *   averageRating = (8 + 9 + 10) / 3 = 9
 *   totalReviews = 3
 *
 * - Si no hay reseñas:
 *   averageRating = 0
 *   totalReviews = 0
 *
 * @param {string} movieId - ID de la película (MongoDB ObjectId)
 * @returns {Promise<Object>} Objeto con las estadísticas
 * @returns {number} averageRating - Promedio de puntuaciones (0-10, puede tener decimales)
 * @returns {number} totalReviews - Cantidad total de reseñas
 *
 * @example
 * const stats = await getAverageRating("68d30243f5be4f51a4c4a9d3");
 * // Retorna: { averageRating: 8.5, totalReviews: 127 }
 */
export const getAverageRating = async (movieId) => {
	// Pipeline de agregación de MongoDB
	const result = await Review.aggregate([
		// Paso 1: Filtro solo las reseñas de esta película
		{ $match: { movieId: new mongoose.Types.ObjectId(movieId) } },
		// Paso 2: Agrupo y calculo estadísticas
		{
			$group: {
				_id: "$movieId", // Agrupo por película
				averageRating: { $avg: "$rating" }, // Calculo promedio de ratings
				totalReviews: { $sum: 1 }, // Cuento cantidad de reseñas
			},
		},
	]);
	// Si no hay reseñas, retorno valores por defecto (0)
	return result.length > 0 ? result[0] : { averageRating: 0, totalReviews: 0 };
};

