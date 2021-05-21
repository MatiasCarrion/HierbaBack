const express = require('express');
const port = process.env.port || 3000;
const app = express();
require('dotenv').config()

// configuramos las rutas
app.use('/api', require('./routes/stock'));


// iniciamos express
app.listen(port, (error) => {
    if (error) {
        console.log("Error al iniciar el servidor.")
    }
    else {
        console.log(`Escuchando en puerto ${port}`)
    }
})
