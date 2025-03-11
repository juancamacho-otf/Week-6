const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Pasamos el error al siguiente middleware
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


module.exports = {
    notFound,
    errorHandler
};