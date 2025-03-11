require('dotenv').config();
// trayendo cors
const cors = require('cors');

const express = require('express');
const app = express();
const port = 3000;
//lamar al body-parser para poder ver la solicitudes de el request 
const bodyParser = require('body-parser');


//llamar a el controlador de las rutas 
const apiRoutes = require('./routes');

// llamar al controlador de errores 
const middlewares =  require('./middlewares')

//llamar a la base de datos
const db =require('../db/db')

//llmar a morgan
const morgan = require('morgan');

//llamar a heltmet
const helmet = require('helmet');
// uso de cors para no restringir peticiones htto entre diferentes dominios

// WINSTON para monitorear proyectos y evenetos importantes en produccion
const logger = require('../log/log.winston');
app.use(cors());

// usar el body-paser
app.use(bodyParser.json());

// helmet  para hacer la app mas segura, helmet coloca  mas headers
app.use(helmet());

//morgan para que me aparezca en pantalla que tipo de petcion hace
app.use(morgan('tiny'));

//utilizar las rutas

app.use('/api', apiRoutes );



//uso los meddlewares para hacer un control de errores
app.use(middlewares.validateRequest)
app.use(middlewares.methodNotAllowed)
app.use(middlewares.notFound);
app.use(middlewares.errorHandler); 

app.listen(port, () => {
  logger.info(`Servidor corriendo en http://localhost:${port}`);
})
