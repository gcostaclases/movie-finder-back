//#region  ----------- IMPORTS -----------
// Importo mongoose
import mongoose from "mongoose";
//#endregion ----------- IMPORTS -----------

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
						// Excluyo el propio documento en updates con $ne: this._id
						const count = await mongoose.models.Provider.countDocuments({
							nombre: value,
							_id: { $ne: this._id },
						});
						return count === 0;
					},
					message: "El proveedor ya existe.",
				},
			],
		},
		logo: {
			type: String,
			default: null, // Por defecto, el proveedor no tiene logo
			validate: {
				validator: (value) => {
					// Validar que sea una URL válida
					return value === null || /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(value);
				},
				message: "La URL del logotipo no es válida.",
			},
		},
	},
	{
		timestamps: true,
		collection: "providers",
	}
);

export default providerSchema;
