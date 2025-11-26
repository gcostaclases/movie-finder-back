import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userRating: 0,
};

export const ratingSlice = createSlice({
	name: "rating",
	initialState,
	reducers: {
		setUserRating: (state, action) => {
			state.userRating = action.payload;
		},
		resetUserRating: (state) => {
			state.userRating = 0;
		},
	},
});

export const { setUserRating, resetUserRating } = ratingSlice.actions;
export default ratingSlice.reducer;
