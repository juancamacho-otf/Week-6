const mongoose =require('mongoose')

const holaSchema = new mongoose.Schema({
    name:{ 
    type: String,
    requierd :[true, 'este es un campo obligatorioo']
    },

    typesaludo:{
        type: String,
        require: false

    },
    birthdate: {
        type: Date,
        required: false,
    }
    
});
const Hola =mongoose.model('Hola', holaSchema);

module.exports =Hola;