const express = require('express');
const router = express.Router();
const conexion = require('../bbdd/bbdd');

class Stock {

    constructor(id, nombre, categoria, stock, precioCompra, precioVenta) {
      this.id = id;
      this.nombre = nombre;
      this.categoria = categoria;
      this.stock = stock;
      this.precioCompra = precioCompra;
      this.precioVenta = precioVenta;
    }
  }

router.get('', async (req, res) => {

    let qry = 'SELECT prod.idProducto id, prod.nombre nombre, cat.nombre categoria, prod.stock, prod.precioCompra, prod.precioVenta from producto prod left join categoria cat on (cat.idCategoria = prod.categoriaId)';
    let productos = [];

    // query de consulta stock
    await conexion.query(qry, function (error, rows, fields) {
        if (error) {
            throw new Error('Error en ejecución de query consulta stock.');
        }
        else {

            for (row of rows) {
                let prod = new Stock(row.id, row.nombre, row.categoria, row.stock, row.precioCompra, row.precioVenta);
                productos.push(prod);
            }
            
            res.status(200).send(productos);
        }

    });

})


module.exports = router;