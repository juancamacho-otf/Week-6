const express = require('express');
const router = express.Router();

// aca se guarda en una constante las rutas de donde estan los metodos // tipo de importacion para llama las rutas 
//const holaRouter= require('./hola');
const users=require('./users');

// lo que esta asi ('/api/adios' es la ruta la cual vas a llamar, el segundo parametro es los tipos de rutas que estas llamando  
//lo que esta entre comillas es para recibir lo que haya despues de ella, se puede definir aca como '/users' o dejar asi '/' para en user definirlo 
router.use('/',users);

module.exports=router;
