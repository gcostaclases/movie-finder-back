//#region  ----------- IMPORTS -----------
// Importo mongoose
import mongoose from "mongoose";
//#endregion ----------- IMPORTS -----------

const connectToMongoDB = async () => {
	const { MONGODB_CONNECTION_STRING, MONGODB_DB_NAME, MONGODB_SERVER_SELECTION_TIMEOUT_MS } = process.env;

	console.log("Conectando a:", MONGODB_CONNECTION_STRING);

	await mongoose.connect(MONGODB_CONNECTION_STRING, {
		dbName: MONGODB_DB_NAME,
		serverSelectionTimeoutMS: MONGODB_SERVER_SELECTION_TIMEOUT_MS,
	});
};

export default connectToMongoDB;
