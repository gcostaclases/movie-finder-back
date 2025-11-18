import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: null,
	username: "",
	email: "",
	role: "",
	providers: [],
	watchlist: [],
	profileImage: null,
	isLogged: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser: (state, action) => {
			state.token = action.payload.token;
			state.isLogged = true;
		},
		logoutUser: (state) => {
			state.token = null;
			state.isLogged = false;
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

