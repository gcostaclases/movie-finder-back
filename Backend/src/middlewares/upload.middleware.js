//#region  ----------- IMPORTS -----------
// Importo multer para manejar la subida de archivos
import multer from "multer";
//#endregion ----------- IMPORTS -----------

// Configuración de multer para manejar la subida de archivos en memoria
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // 5 MB (en bytes)
	},
	fileFilter: (req, file, cb) => {
		// Validar el tipo de archivo (solo imágenes)
		if (!file.mimetype.startsWith("image/")) {
			return cb(new Error("Solo se permiten archivos de imagen."));
		}
		cb(null, true);
	},
});

/**
 * Middleware para manejar la subida de archivos y los errores de multer
 * @param {string} fieldName - Nombre del campo en el formulario (por ejemplo, "image")
 * @returns {Function} Middleware de Express
 */
const uploadMiddleware = (fieldName) => {
	return (req, res, next) => {
		upload.single(fieldName)(req, res, (err) => {
			if (err) {
				// Manejo de errores de multer
				if (err.code === "LIMIT_FILE_SIZE") {
					return res.status(400).json({
						message: "Tamaño máximo 5 MB excedidos.",
					});
				}
				if (err.message === "Solo se permiten archivos de imagen.") {
					return res.status(400).json({
						message: err.message,
					});
				}
				// Otros errores
				return res.status(400).json({
					message: "Error al subir el archivo.",
				});
			}
			// Verifico si el archivo está vacío (campo enviado pero sin imagen)
			if (req.file && (!req.file.buffer || req.file.size === 0)) {
				return res.status(400).json({
					message: "No se subió ninguna imagen.",
				});
			}
			// Si no hay errores, pasa al siguiente middleware o controlador
			next();
		});
	};
};

export default uploadMiddleware;

