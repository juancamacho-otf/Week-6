// Importa la configuración de la aplicación desde 'app.js'
const app = require('./app'); 

// Define el puerto en el que se ejecutará el servidor
const port = 3000;

// Importa el sistema de logging configurado con Winston
const logger = require('./log/log.winston');

// Inicia el servidor y lo pone a escuchar en el puerto definido
app.listen(port, () => {
    // Registra un mensaje en el log indicando que el servidor está corriendo
    logger.info(`Servidor corriendo en http://localhost:${port}`);
});
