// Importando los paquetes necesarios para el proyecto.

const express = require('express'); 
const app =express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
    extended: true
}));
// enviar a  Json Data a Node API  
app.use(bodyparser.json()); 
const mysql = require('mysql');  //importar mysql   

const conexion = require('./config/conexion');
 // Para ejecutar el servidor con número de puerto 
 app.listen(3000,()=> console.log(" Servidor Express corriendo en puerto: 3000"));  


 //---------RUTA MODULO INVENTARIO MERLING AGUILAR---------------------------------------------
 //----Obtiene los datos del archivo tipo_producto.js
  const tipo_productos = require('./modulos/modulo_inventario/router/tipo_producto');
 app.use('/API', tipo_productos); 
 //--------------------------------------------------------------------------------------------

