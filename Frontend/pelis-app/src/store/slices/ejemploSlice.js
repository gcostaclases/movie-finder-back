import { createSlice } from "@reduxjs/toolkit";

// Los slices vienen a ser los sub-estados de la store principal (de la fuente de la verdad principal)

// Defino el valor inicial del slice
// Valor inicial que va a tomar dentro del estado de esta porción de código
const initialState = {
	ejemploCuenta: 0,
	ejemploLoading: false,
	ejemploLista: [],
};

export const ejemploSlice = createSlice({
	// Defino nombre para manejo interno
	name: "ejemplo",
	// Valor del estado inicial
	initialState,
	// Configuración del listado de las acciones
	// Estas se definen dentro de la propiedad reducers
	reducers: {
		// Las acciones van a tener dentro de ellas el comportamiento que queremos que suceda cuando se dispara esta acción (su reducer asociado)
		// Reciben como parámetros el estado actual y la acción que se despachó
		// La acción puede tener un payload con datos extra que necesitemos para actualizar el estado
		ejemploAccionAumentarCuenta: (state, action) => {
			state.ejemploCuenta++; // Acá puedo mutar el estado directamente gracias a Immer que viene integrado con Redux Toolkit
		},
		ejemploAccionCargarLista: (state, action) => {
			state.ejemploLista = action.payload; // Actualizo la lista con el payload recibido
		},
		ejemploAccionAgregarElementoALaLista: (state, action) => {
			state.ejemploLista.push(action.payload); // Agrego un elemento a la lista con el payload recibido
		},
	},
});

// Exporto las acciones para poder usarlas en los componentes
export const { ejemploAccionAumentarCuenta } = ejemploSlice.actions;

// Exporto el reducer para combinarlo en el store para que esta lo conozca, y pueda exponer al resto de los componentes todas las acciones y el valor de los estados (de cada uno de los slices que voy a ir armando)
export default ejemploSlice.reducer;

