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
			// state.token = action.payload;
			state.isLogged = true;
		},
		logoutUser: (state) => {
			// state.token = "";
			state.isLogged = false;
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

