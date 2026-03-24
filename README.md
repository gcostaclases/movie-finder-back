## Movie Finder API 🎬

**API RESTful de películas** desarrollada con **Node.js**, **Express** y **MongoDB**.
Permite buscar películas y series, puntuarlas, reseñarlas y ver en qué servicio de streaming se encuentran, entre otras funcionalidades.

---

### Características principales

- **Autenticación segura:** Registro e inicio de sesión con JWT.
- **Gestión de usuarios:** Edición de perfil, selección de idioma y administración de proveedores de streaming.
- **Proveedores de streaming:** Consulta y gestión de proveedores (CRUD solo para admin).
- **Películas y series:** Búsqueda, visualización de detalles, calificación, reseñas y gestión de watchlist.

---

### Estructura del proyecto

```plaintext
movie-finder-back/
│
├── api/                 # Entrypoints y configuración de la API
├── src/                 # Código fuente principal (rutas, controladores, modelos, servicios, middlewares, etc.)
├── .env                 # Variables de entorno (ignorado por git)
├── swagger.json         # Documentación Swagger de la API
├── package.json         # Dependencias y scripts
├── README.md            # Este archivo
└── ...
```

---

### Requisitos

- [Node.js](https://nodejs.org/) >= 20.x
- [npm](https://www.npmjs.com/)

---

### Instalación y uso

1. Clona el repositorio:

   ```bash
   git clone https://github.com/gcostaclases/movie-finder-back.git
   cd movie-finder-back
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   - Copia `.env.example` a `.env` y completa las variables necesarias.
   - Ejemplo de variables:
     ```
     PORT=3000
     API_KEY=******
     ```

4. Inicia el servidor:

   ```bash
   npm start
   ```

   El backend corre por defecto en [http://localhost:3000](http://localhost:3000)

---


### Documentación

- La documentación interactiva de la API está disponible en el endpoint `/api/v1/documentation/swagger/` una vez iniciado el servidor.
- Consulta el archivo [`swagger.json`](./swagger.json) para más detalles sobre los endpoints y los esquemas.

---

### Autoría

- **Guillermina Costa**  
  [gcostaclases@gmail.com](mailto:gcostaclases@gmail.com)