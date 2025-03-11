// Se exporta Express para manejar el servidor
const express = require('express');

// Se importa Router para definir las rutas
const router = express.Router();

// Se importa el modelo de usuario (Hola)
const Hola = require('../models/users.model');

// Se importa fetch para hacer peticiones HTTP a APIs externas
const fetch = require('node-fetch');

// Se importa express-validator para validar los datos recibidos en las solicitudes
const { body, validationResult } = require('express-validator');

// Se importan middlewares para manejar errores y validar métodos HTTP
const { methodNotAllowed } = require('../middlewares');

// Se importa Winston para el registro de logs en la aplicación
const logger = require('../log/log.winston');


// ========================
// 🚀 Rutas de la API
// ========================


// 📌 Obtener un usuario aleatorio de una API externa y guardarlo en la base de datos
router.get('/user', async (req, res, next) => {
    try {
        // Hacer una solicitud a la API externa
        const response = await global.fetch('https://randomuser.me/api/');
        const data = await response.json();

        // Extraer la información del usuario de la API externa
        const user = data.results[0];
        const newUser = new Hola({
            name: `${user.name.first} ${user.name.last}`,
            genero: user.gender, 
            ciudad: user.location.city,
        });

        // Guardar el usuario en la base de datos
        const savedUser = await newUser.save();
        logger.info(`Usuario guardado en la BD: ${savedUser.name}`);

        res.status(201).json(savedUser);
    } catch (error) {
        logger.error(`Error al obtener usuario aleatorio: ${error.message}`);
        next(error);
    }
});


// 📌 Obtener todos los usuarios almacenados en la base de datos
router.get('/user-all', async (req, res, next) => {
    try {
        const usuarios = await Hola.find();
        logger.info(`Usuarios obtenidos correctamente: ${usuarios.length}`);
        res.status(200).json(usuarios);
    } catch (error) {
        logger.error(`Error al obtener los usuarios: ${error.message}`);
        next(error);
    }
});


// 📌 Obtener un usuario por su ID
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const usuario = await Hola.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        logger.info(`Usuario obtenido correctamente: ${usuario.name}`);
        res.status(200).json(usuario);
    } catch (error) {
        logger.error(`Error al obtener el usuario: ${error.message}`);
        next(error);
    }
});


// 📌 Crear múltiples usuarios en un solo request
router.post('/batch-users',
    [
        body().isArray({ min: 1 }).withMessage('El payload debe ser un array con al menos un usuario'),
        body('*.name').notEmpty().withMessage('El nombre es obligatorio'),
        body('*.genero').isIn(['male', 'female']).withMessage('El género debe ser "male" o "female"'),
        body('*.ciudad').notEmpty().withMessage('La ciudad es obligatoria'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    async (req, res, next) => {
        try {
            const users = req.body;

            // Guardar los usuarios en la base de datos
            const savedUsers = await Hola.insertMany(users);
            logger.info(`Usuarios creados correctamente: ${savedUsers.length} registros`);

            res.status(201).json({
                message: "Usuarios agregados correctamente",
                users: savedUsers
            });
        } catch (error) {
            logger.error(`Error al crear el batch de usuarios: ${error.message}`);
            next(error);
        }
    }
);

// Manejar método no permitido en /batch-users (solo permite POST)
router.all('/batch-users', methodNotAllowed(['POST']));


// 📌 Crear un usuario con validaciones
router.post('/user',
    [
        body('name').notEmpty().withMessage('El nombre es obligatorio'),
        body('genero').isIn(['male', 'female']).withMessage('El género debe ser "male" o "female"'),
        body('ciudad').notEmpty().withMessage('La ciudad es obligatoria'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, 
    async (req, res, next) => {
        try {
            const usuario = new Hola({
                name: req.body.name,
                genero: req.body.genero,
                ciudad: req.body.ciudad
            });

            const savedUser = await usuario.save();
            logger.info(`Usuario creado correctamente: ${savedUser.name}`);
            res.status(201).json(savedUser);
        } catch (error) {
            logger.error(`Error al crear usuario: ${error.message}`);
            next(error);
        }
    }
);


// 📌 Actualizar un usuario con validaciones
router.put('/:id',
    [
        body('name').notEmpty().withMessage('El nombre no puede estar vacío'),
        body('genero').isIn(['male', 'female']).withMessage('El género debe ser "male" o "female"'),
        body('ciudad').notEmpty().withMessage('La ciudad no puede estar vacía'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, 
    async (req, res, next) => {
        try {
            const updatedUser = await Hola.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            logger.info(`Usuario actualizado correctamente: ${updatedUser.name}`);
            res.status(200).json(updatedUser);
        } catch (error) {
            logger.error(`Error al actualizar el usuario: ${error.message}`);
            next(error);
        }
    }
);


// 📌 Eliminar un usuario
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedUser = await Hola.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) {
            logger.warn(`Intento de eliminar un usuario inexistente: ${req.params.id}`);
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        logger.info(`Usuario eliminado: ${deletedUser.name}`);
        res.status(200).json(deletedUser);
    } catch (error) {
        logger.error(`Error al eliminar usuario: ${error.message}`);
        next(error);
    }
});


// Exportar el router para su uso en la aplicación principal
module.exports = router;
