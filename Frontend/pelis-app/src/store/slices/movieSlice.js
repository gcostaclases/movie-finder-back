import { createSlice } from "@reduxjs/toolkit";
import { addMovieReview } from "./movieReviewsSlice";

const initialState = {
	id: "",
	tmdbId: 0,
	title: "",
	originalTitle: "",
	originalLanguage: "",
	backdropPath: "",
	posterPath: "",
	reviewStats: {
		averageRating: 0,
		totalReviews: 0,
	},
	availability: [], // array de objetos { percentage, providerId, providerLogo, providerName, reportCount }
	actors: [],
	directors: [],
	duration: 0,
	releaseDate: null,
	genres: [],
	overview: "",
	reviews: [],
};

export const movieSlice = createSlice({
	name: "movie",
	initialState,
	reducers: {
		setMovieDetail: (state, action) => {
			// console.log("Payload en setMovieDetail:", action.payload);
			const {
				_id,
				tmdbId,
				title,
				originalTitle,
				originalLanguage,
				backdropPath,
				posterPath,
				reviewStats,
				availability,
				actors,
				directors,
				duration,
				releaseDate,
				genres,
				overview,
			} = action.payload;
			state.id = _id;
			state.tmdbId = tmdbId;
			state.title = title;
			state.originalTitle = originalTitle;
			state.originalLanguage = originalLanguage;
			state.backdropPath = backdropPath;
			state.posterPath = posterPath;
			state.reviewStats = {
				averageRating: reviewStats?.averageRating ?? 0,
				totalReviews: reviewStats?.totalReviews ?? 0,
			};
			state.availability = availability ?? [];
			state.actors = actors;
			state.directors = directors;
			state.duration = duration;
			state.releaseDate = releaseDate;
			state.genres = genres;
			state.overview = overview;
		},
		setMovieReviews: (state, action) => {
			state.reviews = action.payload;
		},
		addMovieReview: (state, action) => {
			state.reviews.push(action.payload);
		},
		updateReviewStats: (state, action) => {
			const { averageRating, totalReviews } = action.payload;
			state.reviewStats.averageRating = averageRating;
			state.reviewStats.totalReviews = totalReviews;
		},
		updateAvailability: (state, action) => {
			state.availability = action.payload;
		},
		resetMovieDetail: (state) => {
			return {
				...initialState,
				reviews: state.reviews, // conservo las reviews actuales
			};
		},
		resetMovieReviews: (state) => {
			state.reviews = initialState.reviews;
		},
	},
});

export const {
	setMovieDetail,
	setMovieReviews,
	updateReviewStats,
	updateAvailability,
	resetMovieDetail,
	resetMovieReviews,
} = movieSlice.actions;
export default movieSlice.reducer;

