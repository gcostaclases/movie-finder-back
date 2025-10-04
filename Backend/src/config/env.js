import dotenv from "dotenv";

/*
  Selecciono el archivo de variables de entorno según el entorno de ejecución.
  Si NODE_ENV es "production", uso ".env.production" (para producción), sino, uso ".env" (para desarrollo local).
*/
// Cargo el archivo de entorno correcto según NODE_ENV
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
// Defino el path del archivo de entorno
dotenv.config({ path: envFile });

console.log("NODE_ENV:", process.env.NODE_ENV, "Archivo de entorno:", envFile);
