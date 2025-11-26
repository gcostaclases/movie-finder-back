import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userReview: "",
};

export const reviewSlice = createSlice({
	name: "review",
	initialState,
	reducers: {
		setUserReview: (state, action) => {
			state.value = action.payload;
		},
		resetUserReview: (state) => {
			state.value = "";
		},
	},
});

export const { setUserReview, resetUserReview } = reviewSlice.actions;
export default reviewSlice.reducer;
