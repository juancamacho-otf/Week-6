const mongoose= require('mongoose');

const connectionString= `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@cluster0.fhbml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



//metodo
mongoose.connect(connectionString)
    .then(() => console.log('✅ Database connected.'))
    .catch(err => {
        console.error(`❌ Error connecting to database: ${err}`);
        process.exit(1); // Salir del proceso si hay error
    });