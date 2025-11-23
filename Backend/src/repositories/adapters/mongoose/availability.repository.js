//#region  ----------- IMPORTS -----------
// Importamos el modelo de disponibilidad
import Availability from "./models/availability.model.js";
import mongoose from "mongoose";
//#endregion ----------- IMPORTS -----------

/**
 * Registra que un usuario vio una película en un servicio específico
 * @param {string} userId - ID del usuario
 * @param {string} movieId - ID de la película
 * @param {string} providerId - ID del proveedor
 * @returns {Promise<Object>} Registro de availability creado
 */
export const saveAvailability = async (userId, movieId, providerId) => {
	const availability = new Availability({
		userId,
		movieId,
		providerId,
	});
	return await availability.save();
};

/**
 * Obtiene estadísticas de disponibilidad de una película
 *
 * Calcula cuántos usuarios reportaron cada servicio y el porcentaje.
 * Los servicios se ordenan por cantidad de reportes (más reportados primero).
 *
 * Ejemplo de resultado:
 * [
 *   { providerId: "...", providerName: "Netflix", reportCount: 45, percentage: 65 },
 *   { providerId: "...", providerName: "Disney+", reportCount: 24, percentage: 35 }
 * ]
 *
 * @param {string} movieId - ID de la película
 * @returns {Promise<Array>} Array con servicios y estadísticas
 */
export const getMovieAvailabilityStats = async (movieId) => {
	const stats = await Availability.aggregate([
		// Paso 1: Filtrar solo los reportes de esta película
		{ $match: { movieId: new mongoose.Types.ObjectId(movieId) } },
		// Paso 2: Agrupar por proveedor y contar reportes
		{
			$group: {
				_id: "$providerId",
				count: { $sum: 1 },
			},
		},
		// Paso 3: Popular la información del proveedor
		{
			$lookup: {
				from: "providers",
				localField: "_id",
				foreignField: "_id",
				as: "provider",
			},
		},
		{ $unwind: "$provider" },
		// Paso 4: Formatear la respuesta
		{
			$project: {
				_id: 0,
				providerId: "$_id",
				providerName: "$provider.name",
				providerLogo: "$provider.logo",
				reportCount: "$count",
			},
		},
		// Paso 5: Ordenar por cantidad de reportes (descendente)
		{ $sort: { reportCount: -1 } },
	]);

	// Calcular el total de reportes para sacar porcentajes
	const totalReports = stats.reduce((sum, stat) => sum + stat.reportCount, 0);

	// Agregar el porcentaje a cada servicio
	return stats.map((stat) => ({
		...stat,
		percentage: totalReports > 0 ? Math.round((stat.reportCount / totalReports) * 100) : 0,
	}));
};

/**
 * Verifica si un usuario ya reportó una película en un servicio
 * @param {string} userId - ID del usuario
 * @param {string} movieId - ID de la película
 * @param {string} providerId - ID del proveedor
 * @returns {Promise<boolean>} true si ya existe el reporte
 */
export const availabilityExists = async (userId, movieId, providerId) => {
	const count = await Availability.countDocuments({ userId, movieId, providerId });
	return count > 0;
};

/**
 * Obtiene la disponibilidad personalizada para un usuario
 *
 * Separa los servicios en dos grupos:
 * - yourServices: Servicios que el usuario tiene contratados
 * - otherServices: Servicios que el usuario NO tiene
 *
 * @param {string} movieId - ID de la película
 * @param {Array} userProviders - Array de proveedores del usuario (objetos con _id)
 * @returns {Promise<Object>} Disponibilidad separada en { yourServices, otherServices }
 */
export const getPersonalizedAvailability = async (movieId, userProviders) => {
	// Obtener todas las estadísticas de availability
	const allStats = await getMovieAvailabilityStats(movieId);

	// Convertir los IDs de los proveedores del usuario a strings para comparar
	const userProviderIds = userProviders.map((p) => p._id.toString());

	// Separar en servicios que el usuario tiene vs servicios que no tiene
	const yourServices = allStats.filter((stat) => userProviderIds.includes(stat.providerId.toString()));

	const otherServices = allStats.filter((stat) => !userProviderIds.includes(stat.providerId.toString()));

	return {
		yourServices,
		otherServices,
	};
};

