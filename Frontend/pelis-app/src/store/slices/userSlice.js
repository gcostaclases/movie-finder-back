import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: "",
	profileImage: null,
	isLogged: false,
	movieReview: {
		rating: 0,
		comment: "",
	},
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser: (state, action) => {
			state.isLogged = true;
			state.username = action.payload.username;
			state.profileImage = action.payload.profileImage;
		},
		logoutUser: (state) => {
			state.isLogged = false;
		},
		setMovieRating: (state, action) => {
			state.movieReview.rating = action.payload;
		},
		resetMovieRating: (state) => {
			state.movieReview.rating = 0;
		},
		setMovieComment: (state, action) => {
			state.movieReview.comment = action.payload;
		},
		resetMovieComment: (state) => {
			state.movieReview.comment = "";
		},
	},
});

export const { loginUser, logoutUser, setMovieRating, resetMovieRating, setMovieComment, resetMovieComment } =
	userSlice.actions;

export default userSlice.reducer;

