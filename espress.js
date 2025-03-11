require('dotenv').config();

const express = require('express');
const app = express();
const port = 4000;
//lamar al body-parser para poder ver la solicitudes de el request 
const bodyParser = require('body-parser');

//llamar a el controlador de las rutas 
const api= require('./manejadorRouter');

// llamar al controlador de errores 
const middlewares =  require('./middlewares');

//llamar a la base de datos
const db =require('./db')

//llmar a morgan
const morgan = require('morgan');

//llamar a heltmet
const helmet = require('helmet');


// usar el body-paser
app.use(bodyParser.json());

// helmet  para hacer la app mas segura, helmet coloca  mas headers
app.use(helmet());

//morgan para que me aparezca en pantalla que tipo de petcion hace
app.use(morgan('tiny'));

//utilizar las rutas

app.use('/api', api);





app.use(middlewares.notFound);
app.use(middlewares.errorHandler); 

app.listen(port, () => {
  console.log(`Test app listening at http://localhost:${port}`);
})