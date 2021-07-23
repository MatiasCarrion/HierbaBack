const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = express.Router();
const conexion = require('../bbdd/bbdd');
const Usuario = require('../models/usuario');


//token
const jwt = require('jsonwebtoken');

class User {

    constructor(id, nombre, pass) {
      this.id = id;
      this.nombre = nombre;
      this.pass = pass;
    }
  }

router.post('/signin', async (req, res) => {

    const usuario = req.body.usuario;
    const clave = req.body.clave;

    // const qry = 'SELECT idUsuario,pass from usuario where nombre = "' + usuario + '"';
    const qry = 'SELECT idUsuario,pass from usuario where nombre = "mcarrion"';


    // consultamos si existe el usuario
    await conexion.query(qry, function (error, rows, fields) {
        if (error) {
            throw new Error('Error en ejecución de query consulta stock.');
            // console.log(error)
        }
        else {
            // if (rows.length === 0) return res.status(404).send('Usuario inexistente');
            if (rows.length === 0) return res.send(rows);
            if (rows[0].pass === clave){
            const token = jwt.sign({_id: rows[0].idUsuario}, 'palabrasecreta');
            res.status(200).send({token});
        }
        else {
            res.status(404).send('Clave incorrecta')
        }
        }
    });

})


function verificarToken(req, res, next) {
    if (!req.headers.autorization) {
        return res.status(404).send('No autorizado');
    }
    
    const token = req.headers.autorization.split(' ')[1];

    if (token === 'null') {
        return res.status(404).send('No autorizado');
    }

    const data = jwt.verify(token, 'palabrasecreta')
    req.userId = data._id;
    next();
}

router.get('/:user', (req, res) => 
{

    const query = "select idUsuario id, nombre, pass from usuario where nombre = '" + req.params.user +"'";

    conexion.query(query, function (error, rows, fields) {

        if (error) {
            throw new Error('Error en ejecución de query datos usuario.');
        }
        else {
            user = new Usuario.Usuario(rows[0].id, rows[0].nombre, rows[0].pass);
            res.status(200).send(user);
        }

    })

})

module.exports = router;