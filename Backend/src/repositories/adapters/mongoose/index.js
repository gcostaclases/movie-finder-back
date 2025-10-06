import mongoose from "mongoose";

// User Repository
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
} from "./user.repository.js";

// Provider Repository
import {
	findProvider,
	findAllProviders,
	countProviders,
	saveProvider,
	updateProvider,
	deleteProvider,
} from "./provider.repository.js";

// Movie Repository
import { findMovie, findAllMovies, saveMovie } from "./movie.repository.js";

// Review Repository
import {
	saveReview,
	findReview,
	findReviewsByMovie,
	findReviewsByUser,
	updateReview,
	deleteReview,
	getAverageRating,
} from "./review.repository.js";

/**
 * Crea el adaptador de Mongoose para MongoDB
 * Conecta a la base de datos y retorna todos los métodos de repositorio disponibles
 * @returns {Promise<Object>} Objeto con todos los métodos de repositorio
 */
const createMongooseAdapter = async () => {
	const { MONGODB_CONNECTION_STRING, MONGODB_DATABASE_NAME, MONGODB_SERVER_SELECTION_TIMEOUT } = process.env;

	await mongoose.connect(MONGODB_CONNECTION_STRING, {
		dbName: MONGODB_DATABASE_NAME,
		serverSelectionTimeoutMS: Number(MONGODB_SERVER_SELECTION_TIMEOUT),
	});

	return {
		// User Repository
		findUser,
		countUsers,
		saveUser,
		populateUserProviders,
		addProviderToUser,
		removeProviderFromUser,
		populateUserWatchlist,
		addMovieToWatchlist,
		removeMovieFromWatchlist,

		// Provider Repository
		findProvider,
		findAllProviders,
		countProviders,
		saveProvider,
		updateProvider,
		deleteProvider,

		// Movie Repository
		findMovie,
		findAllMovies,
		saveMovie,

		// Review Repository
		saveReview,
		findReview,
		findReviewsByMovie,
		findReviewsByUser,
		updateReview,
		deleteReview,
		getAverageRating,
	};
};

export default createMongooseAdapter;
