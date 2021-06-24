const mysql = require('mysql');

const conexion = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'HierbaBuena'
});

conexion.on('error', function(err) {
  if (err){
  console.log("[mysql error]",err);
  conexion.connect(function(err) {
    if (err) {
      console.error('Error de conexión: ' + err.sqlMessage);
      return;
    }
    console.log('Conexión en ID: ' + connection.threadId);
  });
}
});

module.exports = conexion;


 
// conexion.end();

// conexion.connect(function(err) {
//     if (err) {
//       console.error('Error de conexión: ' + err.sqlMessage);
//       return;
//     }
//     console.log('Conexión en ID: ' + connection.threadId);
//   });