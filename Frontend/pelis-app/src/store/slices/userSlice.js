import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: "",
	email: "",
	profileImage: null,
	providers: [],
	isLogged: false,
	selectedProvider: null,
	movieReview: {
		rating: 0,
		comment: "",
	},
	movieAvailability: {
		selectedProvider: null,
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
			Object.assign(state, initialState); // Vuelvo todo al estado inicial
		},
		setProviders: (state, action) => {
			state.providers = action.payload;
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
		setSelectedProvider: (state, action) => {
			state.selectedProvider = action.payload;
		},
		resetSelectedProvider: (state) => {
			state.selectedProvider = null;
		},
		setSelectedProviderForMovie: (state, action) => {
			state.movieAvailability.selectedProvider = action.payload;
		},
		resetSelectedProviderForMovie: (state) => {
			state.movieAvailability.selectedProvider = null;
		},
		updateProfileInfo: (state, action) => {
			state.username = action.payload.username;
			state.email = action.payload.email;
			state.profileImage = action.payload.profileImage;
		},
		updateProfileImage: (state, action) => {
			state.profileImage = action.payload;
		},
	},
});

export const {
	loginUser,
	logoutUser,
	setProviders,
	setMovieRating,
	resetMovieRating,
	setMovieComment,
	resetMovieComment,
	setSelectedProvider,
	resetSelectedProvider,
	setSelectedProviderForMovie,
	resetSelectedProviderForMovie,
	setPendingAction,
	updateProfileInfo,
	updateProfileImage,
} = userSlice.actions;

export default userSlice.reducer;

