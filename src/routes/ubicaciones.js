const express = require('express');
const router = express.Router();
const conexion = require('../bbdd/bbdd');
const provincia = require('../models/provincia');
const localidad = require('../models/localidad');

// para traer todas las provincias
router.get('/provincias', async (req, res) => {

    const qry = 'SELECT idProvincia id, nombre from provincias';
    let provincias = [];

    // query de get provincias
    conexion.query(qry, function (error, rows, fields) {
        if (error) {
            throw new Error('Error en ejecución de query get provincias.');
        }
        else {

            for (row of rows) {
                let prov = new provincia.Provincia(row.id, row.nombre);
                provincias.push(prov);
            }

            res.status(200).send(provincias);
        }

    });



})

// para traer todas las localidades
router.get('/localidades', async (req, res) => {

    const qry = 'SELECT idLocalidad id, nombre, provincia_id from localidades';
    let localidades = [];

    // query de get localidades
    conexion.query(qry, function (error, rows, fields) {
        if (error) {
            throw new Error('Error en ejecución de query get localidades.');
        }
        else {

            for (row of rows) {
                let loc = new localidad.Localidad(row.id, row.nombre, row.provincia_id);
                localidades.push(loc);
            }

            res.status(200).send(localidades);
        }

    });

})

module.exports = router;