import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	reviews: [],
};

export const movieReviewsSlice = createSlice({
	name: "movieReviews",
	initialState,
	reducers: {
		setMovieReviews: (state, action) => {
			state.reviews = action.payload;
		},
		addMovieReview: (state, action) => {
			state.reviews = [action.payload, ...state.reviews];
		},
		resetMovieReviews: (state) => {
			state.reviews = [];
		},
	},
});

export const { setMovieReviews, addMovieReview, resetMovieReviews } = movieReviewsSlice.actions;
export default movieReviewsSlice.reducer;
