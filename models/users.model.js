const mongoose =require('mongoose')

const holaSchema = new mongoose.Schema({
    name:{ 
    type: String,
    requierd :[true, 'este es un campo obligatorioo']
    },

    genero:{
        type: String,
        require: false

    },
    ciudad: {
        type: String,
        required: false,
    }
    
});
const Hola =mongoose.model('Hola', holaSchema);

module.exports =Hola;