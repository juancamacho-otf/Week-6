// Importa la librería Mongoose para manejar la conexión con MongoDB
const mongoose = require('mongoose');

// Definir la cadena de conexión utilizando variables de entorno
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@cluster0.fhbml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Conectar a la base de datos con Mongoose
mongoose.connect(connectionString)
    .then(() => console.log('✅ Database connected.')) // Mensaje de éxito si la conexión es exitosa
    .catch(err => {
        console.error(`❌ Error connecting to database: ${err}`); // Muestra el error en consola si falla
        process.exit(1); // Sale del proceso con código de error 1
    });
