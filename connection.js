const mysql = require("mysql")

//cadena conexion
var pool  = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    port: 3306
});
//Obtener conexion
pool.getConnection((error, connection) => {
    if (error) {
        throw error;
    }
    else {
        console.log("Suscesfull");
        connection.release();
    }
})
//exportar conexion
module.exports = pool ;