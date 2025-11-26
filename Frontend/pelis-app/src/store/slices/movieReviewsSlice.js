import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	reviewsByMovie: {},
};

export const movieReviewsSlice = createSlice({
	name: "movieReviews",
	initialState,
	reducers: {
		setMovieReviews: (state, action) => {
			const { movieId, reviews } = action.payload;
			state.reviewsByMovie[movieId] = reviews;
		},
		addMovieReview: (state, action) => {
			const { movieId, review } = action.payload;
			if (!state.reviewsByMovie[movieId]) {
				state.reviewsByMovie[movieId] = [];
			}
			state.reviewsByMovie[movieId] = [review, ...state.reviewsByMovie[movieId]];
		},
		resetMovieReviews: (state, action) => {
			const { movieId } = action.payload;
			state.reviewsByMovie[movieId] = [];
		},
	},
});

export const { setMovieReviews, addMovieReview, resetMovieReviews } = movieReviewsSlice.actions;
export default movieReviewsSlice.reducer;

