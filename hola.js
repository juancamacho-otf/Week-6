const express = require('express');
const router = express.Router();
const Hola = require('./models/hola');

//morgan
//const morgan = require('morgan');

router.get('/',async(request ,res,next)=> {
    
    try{const hola = await Hola.find();
    res.status(200).json(hola)
    }catch (error){
        res.status(400)
        next(error)

    }
    console.log('si trae todos los saludo');
});
//llamado por solo el id 
router.get('/:id',async(request ,res,next)=> {
    const {id}= request.params;
    try{const hola = await Hola.findById(id);
    res.status(200).json(hola)
    }catch (error){
        res.status(400)
        next(error)

    }
    console.log('si trae por id ');
});

router.post('/', async(request,res)=>{
    const hola = new Hola({
        name : request.body.name,
        typesaludo:request.body.typesaludo, 
        birthdate: request.body.birthdate
    })

    try{
        const savedHola = await hola.save();
        res.status(201).json(savedHola); 

    }catch(error){
        res.status(400);
        next(error);

    }
    console.log('si se puede crear el saludo');
})

// actualizar
router.put('/:id',async(request,res, next )=>{
    const {id}= request.params;
    try{
        const modificatehola= await Hola.findByIdAndUpdate(id,request.body,{new: true})
        res.status(200).json(modificatehola);

    }catch(error){
        res.status(400)
        next(error)
    }
    console.log('si se modifica el hola');
})
//fin actualizar 

router.delete('/:id',async(request,res,next)=>{
    const {id}= request.params
    try{
        const deletehola= await Hola.findByIdAndDelete(id);
        res.status(200).json(deletehola)
    }catch(error) { 
        res.status(400)
        next(error)


    }
    console.log('se pude borar el hola');
})
module.exports = router; 