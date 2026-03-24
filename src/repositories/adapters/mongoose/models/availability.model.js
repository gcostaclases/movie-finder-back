//#region  ----------- IMPORTS -----------
// Importo mongoose
import mongoose from "mongoose";

// Importo el esquema de disponibilidad
import availabilitySchema from "./schemas/availability.schema.js";
//#endregion ----------- IMPORTS -----------

const Availability = mongoose.model("Availability", availabilitySchema);

export default Availability;
