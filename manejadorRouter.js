const express = require('express');
const router = express.Router();

// aca se guarda en una constante las rutas de donde estan los metodos // tipo de importacion para llama las rutas 
const holaRouter= require('./hola');
const adiosRoutes=require('./adios');

// lo que esta asi ('/api/adios' es la ruta la cual vas a llamar, el segundo parametro es los tipos de rutas que estas llamando  
router.use('/adios',adiosRoutes);
router.use('/hola',holaRouter);

module.exports=router;