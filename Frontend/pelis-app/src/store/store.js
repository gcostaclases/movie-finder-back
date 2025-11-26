import { legacy_createStore as createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-expo-dev-plugin";
import userReducer from "./slices/userSlice";
import ratingReducer from "./slices/ratingSlice";
import reviewReducer from "./slices/reviewSlice";
import movieReducer from "./slices/movieSlice";
import providersReducer from "./slices/providersSlice";
import movieReviewsReducer from "./slices/movieReviewsSlice";

const rootReducer = combineReducers({
	user: userReducer,
	rating: ratingReducer,
	review: reviewReducer,
	movie: movieReducer,
	providers: providersReducer,
	// movieReviews: movieReviewsReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

