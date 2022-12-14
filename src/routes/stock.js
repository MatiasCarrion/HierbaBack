const express = require('express');
const router = express.Router();
const conexion = require('../bbdd/bbdd');
const productoStock = require('../models/productoStock');
const producto = require('../models/producto');
const categoria = require('../models/categoria');
const accion = require('../models/accion');

// para traer todo el listado de productos
router.get('/', async (req, res) => {
    console.log(conexion)
    const qry = 'SELECT prod.idProducto id, prod.nombre nombre, \
    cat.nombre categoria, prod.stock, prod.precioCompra, prod.precioVenta \
    from producto prod \
    left join categoria cat on (cat.idCategoria = prod.categoriaId)';
    let productos = [];


    try {
        conexion.query(qry, function (error, rows, fields) {
            if (error) {
                throw new Error('Error en ejecución de query consulta stock..');
            } else {

                for (row of rows) {
                    let prod = new productoStock.ProductoStock(row.id, row.nombre, row.categoria, row.stock, row.precioCompra, row.precioVenta);
                    productos.push(prod);
                }

                res.status(200).send(productos);
            }

        });
    } catch (error) {
        console.log("Mensaje de error: " + error.message)
        res.status(400).send("No se pudo traer el listado de productos.");
    }
    // query de consulta stock


})


// para cambiar el stock de un producto
router.post('/alterStock', async (req, res) => {

    const id = req.body._id;
    const cantidad = req.body._stock;
    const precioVenta = req.body._precioVenta;

    const qry = 'UPDATE producto set stock = ' + cantidad + ", precioVenta = " + precioVenta + " where idProducto = " + id;

    // generamos el update
    try {
        conexion.query(qry, function (error, rows, fields) {
            if (error) {
                throw new Error('Error en ejecución de query update stock.');
            } else {
                console.log('Stock modificado.');
                res.status(200).send("OK");
            }
        });
    } catch (error) {
        console.log("Mensaje de error: " + error.message)
        res.status(400).send("No se pudo actualizar stock");
    }

})

// para cambiar el stock de un producto por venta
router.post('/updStockVenta', async (req, res) => {
    for (let unItem of req.body) {
        let id = unItem._id;
        let cantidad = unItem._stockMaximo - unItem._stock;

        let qry = 'UPDATE producto set stock = ' + cantidad + " where idProducto = " + id;

        // generamos el update
        try {
            conexion.query(qry, function (error, rows, fields) {
                if (error) {
                    throw new Error('Error en ejecución de query update stock.');
                } else {
                    console.log('Stock modificado.');
                }
            });
        } catch (error) {
            console.log("Mensaje de error: " + error.message)
            res.status(400).send("No se pudo actualizar stock");
        }
    }
    res.status(200).send("OK");
})

// para obtener listado de categorias
router.get('/categorias', async (req, res) => {

    const qry = "SELECT idCategoria id, nombre from categoria";
    let categorias = [];
    try {
        conexion.query(qry, function (error, rows, fields) {
            if (error) {
                throw new Error('Error en ejecución de query categorias.');
            } else {
                for (row of rows) {
                    let unaCategoria = new categoria.Categoria(row.id, row.nombre);
                    categorias.push(unaCategoria);
                }
                res.status(200).send(categorias);
            }
        });
    } catch (error) {
        console.log("Mensaje de error: " + error.message)
        res.status(400).send("No se pudo obtener listado de categorias");
    }
})

// para obtener las acciones 
router.get('/acciones', (req, res) => {

    let acciones = [];
    const query = "select accionId id, nombre from acciones";

    try {
        conexion.query(query, (error, rows, fields) => {
            if (error) {
                throw new Error('Error en ejecución de query get acciones.');
            } else {
                for (row of rows) {
                    let unaAccion = new accion.Accion(row.id, row.nombre);
                    acciones.push(unaAccion);
                }
                res.status(200).send(acciones);
            }
        });
    } catch (error) {
        console.log("Mensaje de error: " + error.message)
        res.status(400).send("No se pudo obtener listado de acciones");
    }
})

// para crear un nuevo producto
router.post('/nuevoProducto', async (req, res) => {

    const producto = req.body;

    const query = 'INSERT INTO producto(`nombre`, `categoriaId`,`proveedorId`,\
    `precioCompra`,`minGanancia`,`maxGanancia`,`precioVenta`,`stock`)\
    VALUES("' + producto._nombre + '",' + producto._categoriaId + "," + producto._proveedorId + ",\
    " + producto._precioCompra + "," + producto._minGanancia + ",\
    " + producto._maxGanancia + "," + producto._precioVenta + "," + producto._stock + ")";

    try {
        conexion.query(query, (error, rows, fields) => {

            if (error) {
                throw new Error('Error en ejecución de query nuevo producto.');
            } else {
                console.log("Exito");
                res.status(200);
                // res.status(200).send("Producto agregado correctamente.");
            }
        });
    } catch (error) {
        console.log("Mensaje de error: " + error.message)
        res.status(400).send("No se pudo insertar producto");
    }


})

// para traer un producto específico
router.get('/:id', async (req, res) => {

    let prod;
    const qry = 'SELECT * from producto prod WHERE idProducto = ' + req.params.id;

    // query de consulta stock
    try {
        conexion.query(qry, function (error, rows, fields) {
            if (error) {
                throw new Error('Error en ejecución de query consulta un prod.');
            } else {
                prod = new producto.Producto(rows[0].idProducto, rows[0].nombre, rows[0].categoriaId, rows[0].proveedorId, rows[0].precioCompra, rows[0].minGanancia, rows[0].maxGanancia, rows[0].precioVenta, rows[0].stock);
                res.status(200).send(prod);
            }

        });
    } catch (error) {
        console.log("Mensaje de error: " + error.message)
        res.status(400).send("No se pudo traer id prod");
    }

})


// insertamos un log de producto
router.post('/logProducto', (req, res) => {

    const log = req.body;
    const query = "INSERT INTO producto_log(`categoriaId`,`proveedorId`,`precioCompra`,\
    `minGan`,`maxGan`,`precioVenta`,`existencia`,`stock`,`accionId`,`usuarioId`,`creadoEl`,`productoId`)\
    VALUES(" + log._categoriaId + ',' + log._proveedorId + ',' + log._precioCompra + ",'" + log._minGanancia + "','" + log._maxGanancia + "'," +
        log._precioVenta + ',' + log._existencia + ',' + log._stock + ',' + log._accionId + ',' + log._usuarioId + ',NOW(), ' + log._productoId + ')';

    try {
        conexion.query(query, function (error, rows, fields) {

            if (error) {
                throw new Error('Error al insertar el log.');
            } else {
                console.log('Log agregado');
                res.status(200);
            }
        });
    } catch (error) {
        console.log("Mensaje de error: " + error.message)
        res.status(400).send("No se pudo generar el log");
    }
})

module.exports = router;