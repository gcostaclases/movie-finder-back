import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: "",
};

export const reviewSlice = createSlice({
	name: "review",
	initialState,
	reducers: {
		setReview: (state, action) => {
			state.value = action.payload;
		},
		resetReview: (state) => {
			state.value = "";
		},
	},
});

export const { setReview, resetReview } = reviewSlice.actions;
export default reviewSlice.reducer;

