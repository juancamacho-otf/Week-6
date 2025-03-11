const winston = require('winston');

const logger = winston.createLogger({
    level: 'info', // Nivel de log (info, warn, error, debug)
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Muestra los logs en la consola
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Guarda solo errores en un archivo
        new winston.transports.File({ filename: 'logs/combined.log' }) // Guarda todos los logs en un archivo
    ]
});

module.exports = logger;
