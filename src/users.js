// se exporta express 
const express = require('express');
// se importa router para poder hacer las rutas a buscar 
const router = express.Router();
// model para traer y hacer un modelo
const Hola = require('../models/users.model');
// node fetch es para hacer peticiones de http 
const fetch = require('node-fetch');
// express-validator para validar que los body esten correctos y no hagan post con informacion vacia 
const { body, validationResult } = require('express-validator');
const { methodNotAllowed } = require('./middlewares');
// WINSTON para monitorear proyectos y evenetos importantes en produccion
const logger = require('../log/log.winston');

// llamar a la api para almacenarlos en mi base de datos

router.get('/user', async (req, res, next) => {
    try {
        const response = await global.fetch('https://randomuser.me/api/');
        const data = await response.json();

        // Extraer datos importantes del usuario, se extrae asi ya que es una api externa que estoy alamacenando en mi database 


        const user = data.results[0];
        const newUser = new Hola({
            name: `${user.name.first} ${user.name.last}`,
            genero: `${user.gender}`, 
            ciudad: `${user.location.city}`,
        });

        // Guardar en la base de datos
        const savedUser = await newUser.save();
        logger.info(`Usuario guardado en la BD: ${savedUser.name}`);

        res.status(201).json(savedUser);
    } catch (error) {
        logger.error(`Error al obtener usuario aleatorio: ${error.message}`);
        next(error);
    }
    
});
// fin de 'llamar a la api para almacenarlos en mi base de datos'

// inicio de llamar a todos los usuarios alamacenados 
router.get('/user-all',async(request ,res,next)=> {
    
    try{const hola = await Hola.find();
    
    logger.info(`Los ${hola.length} Usuarios fueron extraidos correctamente`);
    res.status(200).json(hola)

    }catch (error){
        res.status(400)
        logger.error(`Error al obtener los todos los usuarios: ${error.message}`);
        next(error)

    }
    
});
// fin de  'inicio de llamar a todos los usuarios alamacenados '

// inicio de llamar al usuario por el id
router.get('/:id',async(request ,res,next)=> {
    const {id}= request.params;
    try{const hola = await Hola.findById(id);
    logger.info(`Usuario:${hola.name} llamado correctamente `);
    res.status(200).json(hola)
    }catch (error){
        logger.error(`Error al obtener el usuario: ${error.message}`);
        res.status(400)
        next(error)

    }
   
});


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

// Responde con método no permitido si no es POST
router.all('/batch-users', methodNotAllowed(['POST']));


// Crear un usuario con validación

router.post('/user',
    [
        body('name').notEmpty().withMessage('El nombre es obligatorio'),
        body('genero').isIn(['male', 'female']).withMessage('El género debe ser male o female'),
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
            const hola = new Hola({
                name: req.body.name,
                genero: req.body.genero,
                ciudad: req.body.ciudad
            });

            const savedHola = await hola.save();
            logger.info(`Usuario creado correctamente: ${savedHola.name} `);
            res.status(201).json(savedHola);
        } catch (error) {
            logger.error(`Error al crear  usuario: ${error.message}`);
            next(error);
        }
    }
);
 
// fin 'Crear un usuario con validación'

/*/inicio crear un usuario
router.post('/user', async(request,res)=>{
    const hola = new Hola({
        name : request.body.name,
        genero:request.body.género, 
        ciudad: request.body.ciudad
    })

    try{
        const savedHola = await hola.save();
        res.status(201).json(savedHola); 

    }catch(error){
        res.status(400);
        next(error);

    }
    console.log('si se puede crear el Usuario');
}) 
// fin de 'inicio crear un usuario'
*/
// Actualizar un usuario con validaciones
/* aca se utiliza la validacion con  express-validator, valida que la informacion este correcta o si un campo esta vacio*/
router.put('/:id',
    [
        body('name').notEmpty().withMessage('El nombre no puede estar vacío'),
        body('genero').isIn(['male', 'female']).withMessage('El género debe ser male o female'),
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
            logger.info(`Usuario actualizado correctamente: ${updatedUser} `);
            res.status(200).json(updatedUser);
        } catch (error) {
            logger.error(`Error al actualizar el usuario: ${error.message}`);
            next(error);
        }
    }
);
//fin de actualizar usuario con validaciones
/*
// actualizar SIN VALIDACION! 
router.put('/:id',async(request,res, next )=>{
    const {id}= request.params;
    try{
        const modificatehola= await Hola.findByIdAndUpdate(id,request.body,{new: true})
        res.status(200).json(modificatehola);

    }catch(error){
        res.status(400)
        next(error)
    }
    console.log('si se modifica el Usuario');
})
//fin 'actualizar'
*/
// Eliminar un usuario
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedUser = await Hola.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' }).logger.warn(`Intento de eliminar un usuario inexistente: ${req.params.id}`);
        
        logger.info(`Usuario eliminado: ${deletedUser.name}`);
        res.status(200).json(deletedUser);
    } catch (error) {
        logger.error(`Error al eliminar usuario: ${error.message}`);

        next(error);
    }
});


module.exports = router; 


