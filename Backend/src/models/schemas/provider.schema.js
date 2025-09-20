// Importo mongoose
import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
			unique: true,
			minLength: 2,
			maxLength: 20,
			validate: [
				{
					validator: function (value) {
						return typeof value === "string" && value.length >= 2 && value.length <= 20;
					},
					message: () => "El nombre del proveedor debe tener entre 2 y 20 caracteres.",
				},
				{
					validator: async function (value) {
						const count = await mongoose.models.Provider.countDocuments({ nombre: value });
						return count === 0;
					},
					message: "El proveedor ya existe.",
				},
			],
		},
	},
	{
		timestamps: true,
		collection: "providers",
	}
);

export default providerSchema;
