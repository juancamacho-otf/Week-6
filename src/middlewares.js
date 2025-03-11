const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); 
};

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err); 
    }

    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? ':c' : err.stack
    });
};
const methodNotAllowed = (allowedMethods) => (req, res, next) => {
    if (!allowedMethods.includes(req.method)) {
        return res.status(405).json({
            message: `Método ${req.method} no permitido. Usa: ${allowedMethods.join(", ")}`,
        });
    }
    next();
};

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn(`Error de validación: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    notFound,
    errorHandler,
    methodNotAllowed,
    validateRequest
};