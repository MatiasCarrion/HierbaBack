const express = require('express');
const router = express.Router();
const conexion = require('../bbdd/bbdd');


// obtenemos el maximo id de detalle venta
router.get('/getMaxIdDetalleVenta', async (req, res) => {
    let id;
    const qry = 'SELECT max(id) id from detalle_venta';

    try {
        conexion.query(qry, function (error, rows, fields) {
            if (error) {
                throw new Error('Error en ejecución de query id max detalle venta.');
            } else {
                rows[0].id === null ? id = 0 : id = rows[0].id;
                console.log("Consulta exitosa, max id " + id);
                res.status(200).send(id.toString());
            }

        });
    } catch (error) {
        console.log("Mensaje de error: " + error.message)
        res.status(400).send("No se pudo recuperar el id de detalle venta.");
    }

})

// obtenemos el maximo id de detalle envio
router.get('/getMaxIdDatosEnvio', async (req, res) => {
    let id;
    const qry = 'SELECT max(id) id from datos_envio';

    try {
        conexion.query(qry, function (error, rows, fields) {
            if (error) {
                throw new Error('Error en ejecución de query id max detalle venta.');
            } else {
                rows[0].id === null ? id = 0 : id = rows[0].id;
                console.log("Consulta exitosa, max id " + id);
                res.status(200).send(id.toString());
            }
        });
    } catch (error) {
        console.log("Mensaje de error: " + error.message)
        res.status(400).send("No se pudo recuperar el id de datos envio.");
    }

})

// insertamos una venta
router.post('/agregarVenta', (req, res) => {

    const unaVenta = req.body;
    const query = "INSERT INTO venta(\
    `detalle_venta_id`,\
    `detalle_envio_id`,\
    `monto_parcial`,\
    `descuento`,\
    `monto_final`,\
    `tipo_descuento_id`,\
    `nombre_cliente`,\
    `dni_cliente`,\
    `telefono_cliente`,\
    `mail_cliente`)\
    VALUES\
    (" +
        unaVenta.detalle_venta_id + "," +
        unaVenta.datos_envio_id + "," +
        unaVenta.monto_parcial + "," +
        unaVenta.descuento + "," +
        unaVenta.monto_final + "," +
        unaVenta.tipo_descuento_id + ",'" +
        unaVenta.nombre_cliente + "'," +
        unaVenta.dni_cliente + "," +
        unaVenta.telefono_cliente + ",'" +
        unaVenta.mail_cliente +
        "')"

    try {
        conexion.query(query, function (error, rows, fields) {
            if (error) {
                throw new Error('Error al insertar la venta.');
            } else {
                console.log('Venta insertada');
                res.status(200).send('ok');
            }
        });
    } catch (error) {
        console.log("Mensaje de error: " + error.message)
        res.status(400).send("No se pudo generar venta.");
    }
})

// insertamos los detalles
router.post('/agregarDetalles', (req, res) => {
    for (let unDetalle of req.body) {

        let query = "INSERT INTO detalle_venta\
                    (`id`,\
                    `producto_id`,\
                    `cantidad`,\
                    `precio_venta`)\
                    VALUES(" +
            unDetalle.id + "," +
            unDetalle.prod_id + "," +
            unDetalle.cantidad + "," +
            unDetalle.precio_venta +
            ")"

        try {
            conexion.query(query, function (error, rows, fields) {
                if (error) {
                    throw new Error('Error al insertar detalle.');
                } else {
                    console.log('detalle insertado');
                }
            });
        } catch (error) {
            console.log("Mensaje de error: " + error.message)
            res.status(400).send("No se pudo generar detalle venta.");
        }
    }
    res.status(200).send('ok');
})


// insertamos datos envio
router.post('/agregarEnvio', (req, res) => {

    const unEnvio = req.body;
    const query = "INSERT INTO datos_envio\
    (`id`,\
    `tipo_envio_id`,\
    `provincia_id`,\
    `localidad_id`,\
    `barrio`,\
    `calle`,\
    `altura`,\
    `codigo_postal`,\
    `departamento`,\
    `observaciones`)\
    VALUES(" +
        unEnvio.id + "," +
        unEnvio.tipo_envio_id + "," +
        unEnvio.provincia_id + "," +
        unEnvio.localidad_id + ",'" +
        unEnvio.barrio + "','" +
        unEnvio.calle + "'," +
        unEnvio.altura + ",'" +
        unEnvio.cod_postal + "','" +
        unEnvio.dpto + "','" +
        unEnvio.obs

        +
        "')"

    try {
        conexion.query(query, function (error, rows, fields) {
            if (error) {
                throw new Error('Error al insertar la venta.');
            } else {
                console.log('envio insertado');
                res.status(200).send('ok');
            }
        });
    } catch (error) {
        console.log("Mensaje de error: " + error.message)
        res.status(400).send("No se pudo generar detalle envio.");
    }
})

module.exports = router;