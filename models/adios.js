const mongoose =require('mongoose')

const adiosSchema = new mongoose.Schema({
    name:{ 
    type: String,
    required: [true, 'El campo "name" es obligatorio'] 
    },

    typeadios:{
        type: String,
        require: false

    },
   

});
const Adios =mongoose.model('Adios', adiosSchema);

module.exports = Adios;