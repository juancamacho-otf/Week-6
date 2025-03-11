// Carga las variables de entorno desde un archivo .env
require('dotenv').config();

// Importación de módulos necesarios
const cors = require('cors'); // Middleware para permitir CORS (acceso entre dominios)
const express = require('express'); // Framework de Node.js para crear el servidor
const bodyParser = require('body-parser'); // Middleware para parsear JSON en las solicitudes
const morgan = require('morgan'); // Middleware para registrar logs de las solicitudes HTTP
const helmet = require('helmet'); // Middleware de seguridad para proteger la app con encabezados HTTP

const app = express(); // Inicializa la aplicación Express

// Importación de rutas y middlewares
const apiRoutes = require('./api/index'); // Archivo donde se manejan las rutas principales de la API
const middlewares = require('./middlewares'); // Importa los middlewares personalizados
const db = require('./db/db'); // Conexión a la base de datos

// Aplicación de middlewares globales
app.use(cors()); // Habilita CORS para permitir peticiones desde otros dominios
app.use(bodyParser.json()); // Habilita la lectura de JSON en el cuerpo de las solicitudes
app.use(helmet()); // Aplica medidas de seguridad a la API
app.use(morgan('tiny')); // Registra las solicitudes en consola en formato "tiny"

// Definición de las rutas principales
app.use('/api', apiRoutes); // Todas las rutas dentro de apiRoutes estarán bajo "/api"

// Manejo de middlewares personalizados
app.use(middlewares.validateRequest); // Middleware para validar las solicitudes
app.use(middlewares.methodNotAllowed); // Middleware para manejar métodos no permitidos
app.use(middlewares.notFound); // Middleware para manejar rutas no encontradas
app.use(middlewares.errorHandler); // Middleware para manejar errores generales

// Exporta la configuración de la aplicación para ser utilizada en otro archivo (por ejemplo, el servidor)
module.exports = app;
