//#region  ----------- IMPORTS -----------
// Importo el modelo de proveedor
import Provider from "./models/provider.model.js";
//#endregion ----------- IMPORTS -----------

// Buscar un proveedor
export const findProvider = async (filter) => {
	return await Provider.findOne(filter).select("-createdAt -updatedAt -__v");
};

// Buscar todos los proveedores
export const findAllProviders = async () => {
	return await Provider.find().select("-createdAt -updatedAt -__v");
};

// Contar proveedores por filtro (para validar duplicados)
export const countProviders = async (filter) => {
	return await Provider.countDocuments(filter);
};

// Crear proveedor
export const saveProvider = async (nombre) => {
	const newProvider = new Provider({ nombre });
	return await newProvider.save();
};

// Actualizar proveedor
export const updateProvider = async (id, nombre) => {
	return await Provider.findByIdAndUpdate(id, { nombre }, { new: true, runValidators: true });
};

// Eliminar proveedor
export const deleteProvider = async (id) => {
	return await Provider.findByIdAndDelete(id);
};
