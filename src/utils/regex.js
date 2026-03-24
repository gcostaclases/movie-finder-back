// Expresión regular para emails válidos
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Expresión regular para contraseñas seguras (mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo)
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
