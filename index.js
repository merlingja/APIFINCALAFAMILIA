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
 //productos.js
 const productos = require('./modulos/modulo_inventario/router/productos');
 app.use('/API', productos);
 //inventario.js
 const inven = require('./modulos/modulo_inventario/router/inventario');
 app.use('/API', inven);
 //--------------------------------------------------------------------------------------------
//--------RUTA MODULO DE AP QR DEIBY LAINEZ----------------------------------------------
//----Obtiene los datos del archivo plantasqr.js
const plantasqr = require('./modulos/modulo_APQR/router/plantasqr');
 app.use('/API', plantasqr); 

//-------RUTA MODULO DE CAPACITACIONES-----CARLOS AMADOR-----------------------------------------
const talle = require('./modulos/modulo_capacitaciones/rtaller/talleres');
 app.use('/API', talle); 

//AREA PARTICIPANTES
