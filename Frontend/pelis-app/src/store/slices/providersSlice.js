import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	providers: [],
};

export const providersSlice = createSlice({
	name: "providers",
	initialState,
	reducers: {
		setProviders: (state, action) => {
			state.providers = action.payload;
		},
		resetProviders: (state) => {
			state.providers = [];
		},
	},
});

export const { setProviders, resetProviders } = providersSlice.actions;
export default providersSlice.reducer;
