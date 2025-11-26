import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	movieId: "",
	movieTitle: "",
	reviewStats: {
		averageRating: 0,
		totalReviews: 0,
	},
	availability: [], // array de objetos { percentage, providerId, providerLogo, providerName, reportCount }
};

export const movieSlice = createSlice({
	name: "movie",
	initialState,
	reducers: {
		setMovieDetail: (state, action) => {
			const { _id, title, reviewStats, availability } = action.payload;
			state.movieId = _id;
			state.movieTitle = title;
			state.reviewStats = {
				averageRating: reviewStats?.averageRating ?? 0,
				totalReviews: reviewStats?.totalReviews ?? 0,
			};
			state.availability = availability ?? [];
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
			state.movieId = "";
			state.movieTitle = "";
			state.reviewStats = { averageRating: 0, totalReviews: 0 };
			state.availability = [];
		},
	},
});

export const { setMovieDetail, updateReviewStats, updateAvailability, resetMovieDetail } = movieSlice.actions;
export default movieSlice.reducer;

