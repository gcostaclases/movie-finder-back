//#region  ----------- IMPORTS -----------
// Importo mongoose
import mongoose from "mongoose";

// Importo el esquema de proveedor
import providerSchema from "./schemas/provider.schema.js";
//#endregion ----------- IMPORTS -----------

const Provider = mongoose.model("Provider", providerSchema);

export default Provider;
