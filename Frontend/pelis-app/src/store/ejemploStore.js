import { legacy_createStore as createStore, combineReducers } from "redux";
// Importo devtools
import { composeWithDevTools } from "redux-devtools-expo-dev-plugin";
// Importo los reducers de los slices con un alias xcosaReducer
import ejemploReducer from "./slices/ejemploSlice";

// Combino los reducers de los slices en un rootReducer donde se van a consumir
const rootReducer = combineReducers({
	// Asigno un nombre a la porción de estado gestionada por este reducer
	// En ejemplo tendría asignado todo lo que esté definido en el slice del ejemploReducer
	ejemplo: ejemploReducer,
});

// Enseguida del rootReducer, exportamos también el composeWithDevTools para que el store lo use
export const store = createStore(rootReducer, composeWithDevTools());

