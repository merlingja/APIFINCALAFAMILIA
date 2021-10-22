const mysql = require('mysql');
// Cadena de conexión a la base de datos  
var conexion = mysql.createConnection({  
    host: 'localhost',  
    user : 'root',  
    password : '',   
    database : 'bd_finca_familia',
    multipleStatements : true  
});  
  
// Para verificar si la conexión es exitosa para Falló mientras se ejecuta el proyecto en la consola.  
conexion.connect((err) => {  
    if(!err) {  
        console.log("conexion Exitosa");  
    }  
    else{  
        console.log("BD no conecta \n Error :" + JSON.stringify(err,undefined,2));  
    }  
});  
  // para que la conexion se haga en cualquier lugar
module.exports = conexion;