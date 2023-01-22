const mysql = require('mysql2');
const config = require('./../config/index');

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const conexion = mysql.createConnection({
  host: config.bbdd.host,
  user: config.bbdd.user,
  password:config.bbdd.password,
  database: config.bbdd.dbname
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