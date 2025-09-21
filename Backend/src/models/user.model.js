//#region  ----------- IMPORTS -----------
// Importo mongoose
import mongoose from "mongoose";

// Importo el esquema de usuario
import userSchema from "./schemas/user.schema.js";
//#endregion ----------- IMPORTS -----------

const User = mongoose.model("User", userSchema);

export default User;
