const express = require('express');
const router = express.Router();
const conexion = require('../bbdd/bbdd')

router.get('/stock', async (req, res) => {

    let qry = 'SELECT prod.idProducto id, prod.nombre nombre, cat.nombre categoria, prod.stock from producto prod left join categoria cat on (cat.idCategoria = prod.categoriaId)';
    // let qry = 'SELECT * from producto';
    await conexion.query(qry, function (error, results, fields) {
        if (error) {
            throw new Error('Error total');
        }
        else {
            let json = JSON.stringify(results)
            res.status(200).send(json);
        }

    });

})


module.exports = router;