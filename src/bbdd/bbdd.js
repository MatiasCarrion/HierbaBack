const mysql = require('mysql');

const conexion = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'Dookie1994',
database: 'HierbaBuena'
});

// conexion.connect(function(err) {
//     if (err) {
//       console.error('Error de conexión: ' + err.sqlMessage);
//       return;
//     }
//     console.log('Conexión en ID: ' + connection.threadId);
//   });

conexion.on('error', function(err) {
  console.log("[mysql error]",err);
});

 
// conexion.end();
// Prueba de subida Rama Rodri

module.exports = conexion;