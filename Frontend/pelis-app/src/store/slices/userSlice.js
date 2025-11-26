import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: "",
	profileImage: null,
	isLogged: false,
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
	},
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

