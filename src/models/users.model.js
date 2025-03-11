// Importa mongoose para manejar la base de datos MongoDB
const mongoose = require('mongoose');

// Define el esquema (estructura) del modelo "Hola"
const holaSchema = new mongoose.Schema({
    name: { 
        type: String, // El nombre será una cadena de texto
        required: [true, 'Este es un campo obligatorio'] // Es obligatorio con un mensaje de error personalizado
    },

    genero: {
        type: String, // Tipo de dato string
        required: false // No es obligatorio
    },

    ciudad: {
        type: String, // Tipo de dato string
        required: false // No es obligatorio
    }
});

// Crea el modelo "Hola" basado en el esquema definido
const Hola = mongoose.model('Hola', holaSchema);

// Exporta el modelo para que pueda ser utilizado en otras partes del proyecto
module.exports = Hola;
