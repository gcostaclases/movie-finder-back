//#region  ----------- IMPORTS -----------
// Importo mongoose
import mongoose from "mongoose";

// Importo las funciones del repositorio de usuario
// USER REPOSITORY
import {
	findUser,
	countUsers,
	saveUser,
	populateUserProviders,
	addProviderToUser,
	removeProviderFromUser,
	populateUserWatchlist,
	addMovieToWatchlist,
	removeMovieFromWatchlist,
	updateUserProfileImage,
} from "./user.repository.js";

// Importo las funciones del repositorio de proveedor
// PROVIDER REPOSITORY
import {
	findProvider,
	findAllProviders,
	countProviders,
	saveProvider,
	updateProvider,
	deleteProvider,
} from "./provider.repository.js";

// Importo las funciones del repositorio de película
// MOVIE REPOSITORY
import { findMovie, findMovies, saveMovie } from "./movie.repository.js";

// Importo las funciones del repositorio de reseña
// REVIEW REPOSITORY
import {
	saveReview,
	findReview,
	findReviewsByMovie,
	findReviewsByUser,
	updateReview,
	deleteReview,
	getAverageRating,
} from "./review.repository.js";

// AVAILABILITY REPOSITORY
import {
	saveAvailability,
	getMovieAvailabilityStats,
	availabilityExists,
	getPersonalizedAvailability,
} from "./availability.repository.js";
//#endregion ----------- IMPORTS -----------

/**
 * Crea el adaptador de Mongoose para MongoDB
 * Conecta a la base de datos y retorna todos los métodos de repositorio disponibles
 * @returns {Promise<Object>} Objeto con todos los métodos de repositorio
 */
const createMongooseAdapter = async () => {
	const { MONGODB_CONNECTION_STRING, MONGODB_DB_NAME, MONGODB_SERVER_SELECTION_TIMEOUT_MS } = process.env;

	try {
		await mongoose.connect(MONGODB_CONNECTION_STRING, {
			dbName: MONGODB_DB_NAME,
			serverSelectionTimeoutMS: Number(MONGODB_SERVER_SELECTION_TIMEOUT_MS),
		});

		console.log(`[MongoDB] Connected successfully to database: ${MONGODB_DB_NAME}`);

		// Event listeners para monitorear la conexión
		mongoose.connection.on("disconnected", () => {
			console.warn("[MongoDB] Connection lost");
		});

		mongoose.connection.on("error", (err) => {
			console.error("[MongoDB] Connection error:", err.message);
		});
	} catch (error) {
		console.error("[MongoDB] Connection failed:", error.message);
		throw error; // Re-lanzo el error para que el RepositoryManager lo maneje
	}

	return {
		// USER REPOSITORY
		findUser,
		countUsers,
		saveUser,
		populateUserProviders,
		addProviderToUser,
		removeProviderFromUser,
		populateUserWatchlist,
		addMovieToWatchlist,
		removeMovieFromWatchlist,
		updateUserProfileImage,

		// PROVIDER REPOSITORY
		findProvider,
		findAllProviders,
		countProviders,
		saveProvider,
		updateProvider,
		deleteProvider,

		// MOVIE REPOSITORY
		findMovie,
		findMovies,
		saveMovie,

		// REVIEW REPOSITORY
		saveReview,
		findReview,
		findReviewsByMovie,
		findReviewsByUser,
		updateReview,
		deleteReview,
		getAverageRating,

		// AVAILABILITY REPOSITORY
		saveAvailability,
		getMovieAvailabilityStats,
		availabilityExists,
		getPersonalizedAvailability,
	};
};

export default createMongooseAdapter;
