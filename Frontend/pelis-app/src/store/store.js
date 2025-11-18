import { legacy_createStore as createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-expo-dev-plugin";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
	user: userReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

