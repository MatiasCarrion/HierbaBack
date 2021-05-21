const mysql = require('mysql');

const conexion = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
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

module.exports = conexion;