//#region  ----------- IMPORTS -----------
// Importamos el modelo de película
import Movie from "./models/movie.model.js";
//#endregion  ----------- IMPORTS -----------

// Buscar una película
export const findMovie = async (filter) => {
	return await Movie.findOne(filter).select("-__v -createdAt -updatedAt");
};

// Buscar todas las películas
export const findAllMovies = async (filter = {}) => {
	return await Movie.find(filter).select("-__v -createdAt -updatedAt");
};

// Guardar una película
export const saveMovie = async (movieData) => {
	const movie = new Movie(movieData);
	return await movie.save();
};

