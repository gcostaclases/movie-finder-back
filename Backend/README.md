# Pelis y Series API

**API RESTful de películas y series** desarrollada con **Node.js**, **Express** y **MongoDB**.  
Permite buscar películas y series, puntuarlas, reseñarlas y ver en que servicio de streaming se encuentran, entre otras cosas.

## 📦 Requisitos

- [Node.js](https://nodejs.org/) >= 20.x
- [npm](https://www.npmjs.com/)

## 1. Inicialización del proyecto con npm

```bash
npm init -y
```

## 2. Instalación de dependecias

- express (API) `npm i express`
- nodemon (para HOT reloading) `npm i nodemon --save-dev`

## 3. 🔑 Variables de Entorno

Reference: [dotenv](https://www.npmjs.com/package/dotenv)

Instalación

```js
npm install dotenv --save-dev
```

Configuración (lo antes posible en mi aplicación)

```js
require("dotenv").config();
```

Esto va a disponibilizar en `process.env` las variables de entorno que defina en mi archivo `.env`

```
PORT=3000
API_KEY=******
```

⚠️ **Importante NUNCA subir el archivo .env a mi repositorio**