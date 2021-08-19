const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
require('dotenv').config();
// require('./models/prod');

//cors
app.use(cors());
//token
const jwt = require('jsonwebtoken');

//body parser
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

// para que permita peticiones
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// configuramos las rutas
app.use('/api/stock', require('./routes/stock'));
app.use('/api/user', require('./routes/user'));
app.use('/api/ubicaciones', require('./routes/ubicaciones'));
app.use('/api/ventas', require('./routes/ventas'));

// iniciamos express
app.listen(port, (error) => {
    if (error) {
        console.log("Error al iniciar el servidor.")
    }
    else {
        console.log(`Escuchando en puerto ${port}`)
    }
})
