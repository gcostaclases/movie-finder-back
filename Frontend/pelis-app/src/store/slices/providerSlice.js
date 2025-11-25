import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: null,
};

export const providerSlice = createSlice({
	name: "provider",
	initialState,
	reducers: {
		setProvider: (state, action) => {
			state.value = action.payload;
		},
		resetProvider: (state) => {
			state.value = null;
		},
	},
});

export const { setProvider, resetProvider } = providerSlice.actions;
export default providerSlice.reducer;
