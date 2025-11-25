import { legacy_createStore as createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-expo-dev-plugin";
import userReducer from "./slices/userSlice";
import ratingReducer from "./slices/ratingSlice";
import reviewReducer from "./slices/reviewSlice";

const rootReducer = combineReducers({
	user: userReducer,
	rating: ratingReducer,
	review: reviewReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

