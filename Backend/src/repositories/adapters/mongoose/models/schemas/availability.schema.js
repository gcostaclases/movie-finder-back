//#region  ----------- IMPORTS -----------
import mongoose from "mongoose";
//#endregion ----------- IMPORTS -----------

/**
 * Schema de disponibilidad de películas
 * Registra cuando un usuario reporta haber visto una película en un servicio específico
 *
 * Relaciones:
 * - userId: Usuario que reporta
 * - movieId: Película que reporta
 * - providerId: Servicio de streaming donde la vio
 *
 * Un usuario puede reportar la misma película en múltiples servicios (ej: la vio en Netflix y después en Prime)
 * Pero NO puede reportar la misma película en el mismo servicio más de una vez
 */
const availabilitySchema = new mongoose.Schema(
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
		providerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Provider",
			required: true,
		},
		reportedAt: {
			type: Date,
			default: Date.now,
			description: "Fecha en que el usuario reportó la disponibilidad",
		},
	},
	{
		timestamps: true,
		collection: "availabilities",
	}
);

// Índice compuesto único: previene duplicados
// Un usuario solo puede reportar una vez la misma película en el mismo servicio
// El 1 indica orden ascendente (aunque no importa mucho en los índices únicos)
availabilitySchema.index({ userId: 1, movieId: 1, providerId: 1 }, { unique: true });

// Índice simple: optimiza consultas frecuentes por película
// Como frecuentemente pregunto "¿dónde está disponible esta peli?", indexo movieId
availabilitySchema.index({ movieId: 1 });

export default availabilitySchema;

//#region ----------- NOTAS PARA MI -----------
/**
 * ÍNDICES DE MONGOOSE
 *
 * Los índices optimizan las búsquedas en MongoDB actuando como "atajos" en la base de datos.
 *
 * 1. Índice compuesto único (userId + movieId + providerId):
 *    - Evita duplicados: Un usuario NO puede reportar la misma película en el mismo servicio más de una vez
 *    - Ejemplo: Si Juan ya reportó "Superman" en "Netflix", no puede volver a reportarlo
 * Viene a ser parecido a la PK compuesta en bases relacionales
 *
 * 2. Índice simple (movieId):
 *    - Optimiza búsquedas: Acelera queries como "dame todas las disponibilidades de esta película"
 *    - Sin índice: MongoDB escanea TODOS los documentos (lento en miles de registros)
 *    - Con índice: MongoDB va directo a los documentos relevantes (rápido)
 */
//#endregion ----------- NOTAS PARA MI -----------

