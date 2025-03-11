// Importa la librería Winston para manejar logs en la aplicación
const winston = require('winston');

// Configuración del logger con niveles de severidad y formatos
const logger = winston.createLogger({
    level: 'info', // Nivel mínimo de logs a registrar (info, warn, error, debug)
    format: winston.format.combine(
        winston.format.timestamp(), // Agrega timestamp a cada log
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`; // Formato del mensaje de log
        })
    ),
    transports: [
        new winston.transports.Console(), // Muestra los logs en la consola
        new winston.transports.File({ filename: './log/error.log', level: 'error' }), // Guarda solo errores en un archivo
        new winston.transports.File({ filename: './log/combined.log' }) // Guarda todos los logs en un archivo
    ]
});

// Exporta el logger para usarlo en otros archivos del proyecto
module.exports = logger;
