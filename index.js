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
//const PORT = process.env.PORT || 3000; // por que esta en desarrollo local
 const conexion = require('./config/conexion');
 // Para ejecutar el servidor con número de puerto 
 app.listen(3000,()=> console.log(" Servidor Express corriendo en puerto: 3000"));  


 //ROUTE MODULO INVENTARIO MERLING AGUILAR
 //para traer tipos de productos
 const route_tipo_productos = require('./modulos/modulo_inventario/router/router');
 app.use('/API', route_tipo_productos); 
//para insertar tipos de productos
 const route_tipo_productos_insertar = require('./modulos/modulo_inventario/router/router');
 app.use('/API', route_tipo_productos_insertar);
 
//---------------------------------------------------------------------------------------