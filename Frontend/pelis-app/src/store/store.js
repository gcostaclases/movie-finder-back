import { legacy_createStore as createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-expo-dev-plugin";
import userReducer from "./slices/userSlice";
import ratingReducer from "./slices/ratingSlice";
import reviewReducer from "./slices/reviewSlice";
import providerReducer from "./slices/providerSlice";

const rootReducer = combineReducers({
	user: userReducer,
	rating: ratingReducer,
	review: reviewReducer,
	provider: providerReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

