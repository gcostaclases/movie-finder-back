//#region  ----------- IMPORTS -----------
// Importo mongoose
import mongoose from "mongoose";

// Importamos bcrypt para hashear las contraseñas
import bcrypt from "bcrypt";

// Importo las expresiones regulares
import { emailRegex, passwordRegex } from "../../utils/regex.js";
//#endregion ----------- IMPORTS -----------

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			minLength: 3,
			maxLength: 20,
			validate: [
				{
					validator: function (value) {
						// Valida que el username sea un string y tenga entre 3 y 20 caracteres
						return typeof value === "string" && value.length >= 3 && value.length <= 20;
					},
					message: () => "El nombre de usuario debe tener entre 3 y 20 caracteres.",
				},
				{
					validator: async function (value) {
						// Excluye el propio documento en updates
						const count = await mongoose.models.User.countDocuments({
							username: value,
							_id: { $ne: this._id },
						});
						return count === 0;
					},
					message: "El nombre de usuario ya está registrado.",
				},
			],
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: [
				{
					validator: (value) => emailRegex.test(value),
					message: (props) => `"${props.value}" no es un email válido.`,
				},
				{
					validator: async function (value) {
						const count = await mongoose.models.User.countDocuments({
							email: value,
							_id: { $ne: this._id },
						});
						return count === 0;
					},
					message: "El email ya está registrado.",
				},
			],
		},
		password: {
			type: String,
			required: true,
			minLength: 8,
			maxLength: 100, // Le pongo un valor alto porque al hashearla queda larga
			validate: {
				validator: (value) => {
					return passwordRegex.test(value);
				},
				message: () =>
					"La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.",
			},
		},
		role: { type: String, enum: ["client", "admin"], default: "client" },
		providers: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Provider",
			default: [],
		},
	},
	{
		timestamps: true,
		collection: "users",
	}
);

// Middleware pre-save de Mongoose para hashear la contraseña antes de guardar
userSchema.pre("save", async function (next) {
	// Solo hasheo si la contraseña fue modificada o es nueva
	if (!this.isModified("password")) return next();

	try {
		const SALT_ROUNDS = 10;
		const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

// Método para comparar la contraseña ingresada (plana) con la almacenada (hasheada)
userSchema.methods.isValidPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

export default userSchema;
