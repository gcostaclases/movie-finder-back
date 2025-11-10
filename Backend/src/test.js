import "dotenv/config";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Redis } from "@upstash/redis";
import cloudinary from "./services/cloudinary.js"; // Importa el servicio de Cloudinary
import path from "path";

// ------------ Prueba de Joi ------------
console.log("---------************  PRUEBAS DE JOI  ************---------");

const userSignUpSchema = Joi.object({
	username: Joi.string().alphanum().min(3).max(30).required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
	email: Joi.string().email().required(),
});

const { value, error } = userSignUpSchema.validate({
	username: "juanperez",
	password: "Juanciiitooo4",
	//email: "juanp@ejemplo.com",
});

console.log("Test | userSignUpSchema.validate value:");
console.log(value);
// Si error es undefined, es que no hubo errores
console.log("Test | userSignUpSchema.validate error:");
console.log(error);

async function test() {
	// ------------ Prueba de bcrypt ------------
	console.log("---------************  PRUEBAS DE BCRYPT  ************---------");

	const SALT_ROUNDS = 10;

	const passwordJuan = "Juanciiitooo4";
	const passwordMaria = "Lamariii8";

	/*
    let hashGeneradoParaJuan = "";

    bcrypt.hash(passwordJuan, SALT_ROUNDS, (error, hash) => {
        if (!error) {
            hashGeneradoParaJuan = hash;
            console.log(`La contraseña hasheada de Juan: ${hashGeneradoParaJuan}`);

            bcrypt.compare(passwordJuan, hashGeneradoParaJuan, (error, result) => {
                console.log(`Error: ${error}`);
                console.log(`Result: ${result}`);

                if (!error) {
                    console.log(
                        `Resultado de comparar la contraseña de Juan ${passwordJuan} con el hash de la contraseña de Juan ${hashGeneradoParaJuan}: ${result}`
                    );
                }
            });
        } else {
            console.error("Error al hashear la contraseña de Juan:", error);
        }
    });

    let hashGeneradoParaMaria = "";

    bcrypt.hash(passwordMaria, SALT_ROUNDS, (error, hash) => {
        if (!error) {
            hashGeneradoParaMaria = hash;
            console.log(`La contraseña hasheada de Maria: ${hashGeneradoParaMaria}`);

            bcrypt.compare(passwordMaria, hashGeneradoParaMaria, (error, result) => {
                console.log(`Error: ${error}`);
                console.log(`Result: ${result}`);

                if (!error) {
                    console.log(
                        `Resultado de comparar la contraseña de Maria ${passwordMaria} con el hash de la contraseña de Maria ${hashGeneradoParaMaria}: ${result}`
                    );
                }
            });
        } else {
            console.error("Error al hashear la contraseña de Maria:", error);
        }
    });
    */

	// Juan
	const hashJuan = await bcrypt.hash(passwordJuan, SALT_ROUNDS);
	console.log(`La contraseña hasheada de Juan: ${hashJuan}`);
	//const resultJuan = await bcrypt.compare(passwordJuan, hashJuan);
	// Probando con una contraseña incorrecta
	const resultJuan = await bcrypt.compare("hola", hashJuan);
	console.log(`Resultado de comparar la contraseña de Juan: ${resultJuan}`);

	// Maria
	const hashMaria = await bcrypt.hash(passwordMaria, SALT_ROUNDS);
	console.log(`La contraseña hasheada de Maria: ${hashMaria}`);
	const resultMaria = await bcrypt.compare(passwordMaria, hashMaria);
	console.log(`Resultado de comparar la contraseña de Maria: ${resultMaria}`);

	// ------------ Prueba de JWT ------------
	console.log("---------************  PRUEBAS DE JWT  ************---------");

	// Para generar el token tenemos que hacer una firma
	// El sign necesita un payload, una clave secreta (con la que se va a firmar el token) y un objeto de opciones
	const SECRET_KEY = "unaclavemuysecreta";

	// Esto se haría al momento de hacer login
	// Nunca se debe guardar información sensible en el payload del token
	const token = jwt.sign(
		{
			userId: 1,
			username: "juanperez",
		},
		SECRET_KEY,
		{
			expiresIn: "1h",
		}
	);

	console.log(`El token generado: ${token}`);

	// Para verificar el token
	// Esto se haría en cada request que requiera autenticación
	const decoded = jwt.verify(token, SECRET_KEY);
	console.log("El token verificado:", decoded);

	// ------------ Prueba de MongoDB ------------
	console.log("---------************  PRUEBAS DE MONGODB  ************---------");

	// * Por referencia *
	try {
		await mongoose.connect("mongodb://localhost:27017", {
			dbName: "pelisyseries-db",
			serverSelectionTimeoutMS: 1000,
		});
		console.log("Conexión a MongoDB OK");

		// Defino los esquemas de datos
		// No tiene mucho sentido en este caso pero para probar la referencia voy a hacer que el proveedor tenga un usuario asociado
		const proveedorSchema = new mongoose.Schema(
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				nombre: { type: String, required: true, unique: true },
			},
			{
				timestamps: true,
				collection: "proveedores", // Con esto podemos definir el nombre de la colección
			}
		);

		const userSchema = new mongoose.Schema(
			{
				username: { type: String, required: true, unique: true },
				password: { type: String, required: true },
				email: { type: String, required: true, unique: true },
				rol: { type: String, enum: ["cliente", "admin"], default: "cliente" },
			},
			{
				timestamps: true,
				collection: "usuarios",
			}
		);

		// Defino los modelos a partir de los esquemas
		const User = mongoose.model("User", userSchema);
		const Proveedor = mongoose.model("Proveedor", proveedorSchema);

		// Creo un usuario
		// Lo comento porque si lo corro cuando ya lo cree me tira error de duplicado
		/*
		const juan = new User({
			username: "juanperez",
			password: "juan.123",
			email: "jperez@ejemplo.com",
		});
		await juan.save();
		console.log("Usuario creado:", juan);
		*/

		// Buscar un usuario
		const usuarioEncontrado = await User.findOne({ username: "juanperez" });
		console.log("Usuario encontrado:", usuarioEncontrado);

		await mongoose.disconnect();
		console.log("Desconectado de MongoDB");
	} catch (error) {
		console.log("[ERROR] Error conectando a MongoDB:", error);
	}

	/*
	// * Embedding *
	try {
		await mongoose.connect("mongodb://localhost:27017", {
			dbName: "pelisyseries-db",
			serverSelectionTimeoutMS: 1000,
		});
		console.log("Conexión a MongoDB OK");

		// Defino los esquemas de datos
		const proveedorSchema = new mongoose.Schema(
			{
				nombre: { type: String, required: true, unique: true },
			},
			{ timestamps: true }
		);

		const userSchema = new mongoose.Schema(
			{
				username: { type: String, required: true, unique: true },
				password: { type: String, required: true },
				email: { type: String, required: true, unique: true },
				rol: { type: String, enum: ["cliente", "admin"], default: "cliente" },
				proveedores: [proveedorSchema], // Embedding de proveedores dentro del usuario (respetando el esquema de proveedor)
			},
			{ timestamps: true }
		);

		// Defino el modelo a partir del esquema
		const User = mongoose.model("User", userSchema);

		//await mongoose.disconnect();
		//console.log("Desconectado de MongoDB");
	} catch (error) {
		console.log("[ERROR] Error conectando a MongoDB:", error);
	}
		*/

	/*
	// ------------ Prueba de Redis ------------
	console.log("---------************  PRUEBAS DE REDIS  ************---------");

	// Traigo las credenciales desde las variables de entorno
	const { REDIS_TEST_URL, REDIS_TEST_TOKEN } = process.env;

	//INICIALIZACIÓN
	const redisClient = new Redis({
		url: REDIS_TEST_URL,
		token: REDIS_TEST_TOKEN,
	});

	//ALMACENAMIENTO
	// await redisClient.set("test", "Hola mundo");
	await redisClient.setex("test", 60, "Hola mundo con expiración de 60 segundos");

	//CONSULTA
	const result = await redisClient.get("test");
	console.log("Valor de 'test' en Redis:", result);

	//PARA ELIMINAR UNA KEY
	// await redisClient.del("test");
	*/

	// ------------ Prueba de Cloudinary ------------
	console.log("---------************  PRUEBAS DE CLOUDINARY  ************---------");

	try {
		// Ruta de una imagen de prueba en tu computadora
		const imagePath = path.resolve("E:/Pictures/Para edits/hola.png");

		// Subir la imagen a Cloudinary
		const result = await cloudinary.uploader.upload(imagePath, {
			folder: "test-folder", // Carpeta en Cloudinary
		});

		console.log("Imagen subida con éxito:", result.secure_url);
	} catch (error) {
		console.error("Error al subir la imagen a Cloudinary:", error.message);
	}
}

test();
