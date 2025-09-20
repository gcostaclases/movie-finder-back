import mongoose from "mongoose";
import providerSchema from "./schemas/provider.schema.js";

const Provider = mongoose.model("Provider", providerSchema);

export default Provider;
