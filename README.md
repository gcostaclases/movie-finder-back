# Pelis y Series App

Repositorio monorepo para la aplicación de gestión de películas y series, desarrollada como entrega para la materia **Desarrollo para Aplicaciones Móviles** en la Universidad ORT Uruguay.

Incluye tanto el backend (Node.js + Express + MongoDB) como el frontend (próximamente en React Native).

---

## Descripción general

Esta aplicación permite a los usuarios:

- Registrarse y autenticarse de forma segura (JWT)
- Gestionar su lista de proveedores de streaming
- Consultar y administrar proveedores (CRUD solo para admin)
- (Próximamente) Gestionar y visualizar series y películas desde el frontend móvil

---

## Estructura del proyecto

```
pelis-y-series-app/
│
├── Backend/           # Backend: Node.js, Express, MongoDB (Mongoose)
│   ├── src/
│   ├── .env           # Variables de entorno (ignorado por git)
│   ├── notas.md       # Notas para el desarrollo (ignorado por git)
│   ├── swagger.json   # Documentación Swagger de la API
│   └── ...
│
├── Frontend/          # Frontend: React Native (próximamente)
│   └── ...
│
├── .gitignore
├── .cspell.json       # Archivo de configuración (ignorado por git)
├── README.md
└── ...
```

---

## Instalación y uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/gcostaclases/pelis-y-series-app.git
cd pelis-y-series-app
```

### 2. Backend

```bash
cd Backend
npm install
# Copiar .env.example a .env y completar las variables necesarias
npm start
```
El backend corre por defecto en [http://localhost:3000](http://localhost:3000)

### 3. Frontend

> Próximamente: aquí irá la guía para instalar y correr el frontend en React Native.

---

## Documentación

- La documentación de la API backend está disponible en el endpoint `/swagger` una vez iniciado el servidor.
- Consulta el archivo [`Backend/swagger.json`](./Backend/swagger.json) para más detalles.

---

## Notas

- Los archivos `.env`, `notas.md` y `.cspell.json` están ignorados por git y **no se suben al repo**.

---

## Autoría

- **Guillermina Costa**  
  [gcostaclases@gmail.com](mailto:gcostaclases@gmail.com)

---

## Licencia

ISC