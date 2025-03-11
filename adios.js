const express = require('express')
const router = express.Router()
const Adios = require('./models/adios')

router.get('/',(request ,res)=> {
    res.send('depidiendome')
    console.log('si se despide')
});

router.post('/',async(request,res,next)=>{
    const adios = new Adios({
        name : request.body.name
    })
    try{
        const savedAdios = await adios.save();
        res.status(201).json(savedAdios); 
    }catch (error){
        res.status(400);
        next(error);
    }

})

router.put('/',(request,rest)=>{
    rest.send('modificando la despedida')
    console.log('si se modifica la despedida')
})

router.delete('/',(request,rest)=>{
    rest.send('borrando la despedida')
    console.log('se pude borar la despedida')
})
module.exports = router; 