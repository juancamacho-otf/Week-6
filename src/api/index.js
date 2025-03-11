// Se importa Express para manejar las rutas
const express = require('express');
const router = express.Router();

// Se importan las rutas de usuarios
const users = require('./users');

// ========================
// 🚀 Configuración de rutas
// ========================

// 🔹 Definir rutas para la API
// Al usar '/', todas las rutas definidas en 'users' estarán disponibles desde esta ruta
router.use('/', users);

// Exportar el router para su uso en la aplicación principal
module.exports = router;

