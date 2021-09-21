const mysql = require('mysql');

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const conexion = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USUARIO,
  password: process.env.PASS,
  database: process.env.DBNAME
  });
 

conexion.on('error', function(err) {
  if (err){
  console.log("[mysql error]",err);
  conexion.connect(function(err) {
    if (err) {
      console.error('Error de conexión: ' + err.sqlMessage);
      return;
    }
    console.log('Conexión en ID: ' + conexion.threadId);
  });
}
console.log('Conexión en ID: ' + conexion.threadId);
});

module.exports = conexion;