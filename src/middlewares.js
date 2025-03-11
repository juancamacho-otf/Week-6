// Middleware para manejar rutas no encontradas (404)
const notFound = (req, res, next) => {
    // Crea un error con un mensaje indicando que la URL no existe
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404); // Establece el código de estado 404 (No encontrado)
    next(error); // Pasa el error al siguiente middleware
};

// Middleware global para manejar errores
const errorHandler = (err, req, res, next) => {
    // Verifica si ya se han enviado los encabezados de respuesta
    if (res.headersSent) {
        return next(err); // Si los headers ya fueron enviados, pasa el error al siguiente middleware
    }

    // Determina el código de estado de la respuesta
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    // Devuelve un JSON con el mensaje de error y, si no está en producción, la pila de errores
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? ':c' : err.stack
    });
};

// Middleware para restringir métodos HTTP no permitidos
const methodNotAllowed = (allowedMethods) => (req, res, next) => {
    if (!allowedMethods.includes(req.method)) {
        // Devuelve un error 405 (Método no permitido) si el método no está en la lista permitida
        return res.status(405).json({
            message: `Método ${req.method} no permitido. Usa: ${allowedMethods.join(", ")}`,
        });
    }
    next(); // Continúa con el siguiente middleware si el método es válido
};

// Middleware para validar las solicitudes con express-validator
const validateRequest = (req, res, next) => {
    const errors = validationResult(req); // Obtiene los errores de validación

    if (!errors.isEmpty()) {
        // Registra una advertencia en el log si hay errores de validación
        logger.warn(`Error de validación: ${JSON.stringify(errors.array())}`);
        
        // Devuelve un error 400 (Solicitud incorrecta) con los detalles de los errores
        return res.status(400).json({ errors: errors.array() });
    }

    next(); // Continúa con el siguiente middleware si la validación es exitosa
};

// Exporta todos los middlewares para usarlos en otras partes de la aplicación
module.exports = {
    notFound, 
    errorHandler,
    methodNotAllowed,
    validateRequest
};
