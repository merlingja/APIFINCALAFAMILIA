// Importando los paquetes necesarios para el proyecto.

const express = require('express'); 
const app =express();

const cors = require('cors');
app.use(cors());

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

//---------------------------------------------------------------------------------------------
 //---------RUTA MODULO VENTAS fausto aguilar ---------------------------------------------
 //----Obtiene los datos del archivo tipo_producto.js
 const ventass = require('./modulos/modulo_ventas/rutas/venta');
 app.use('/API', ventass);
 //--------historial de venta-----------------------------------
 const histo = require('./modulos/modulo_ventas/rutas/historial');
 app.use('/API', histo);
 //--------metodo de pago-----------------------------------
 const metode = require('./modulos/modulo_ventas/rutas/metodo');
 app.use('/API',metode);

//-----RUTA MODULO SEGURIDAD EDUARDO MARTINEZ----
 //----Obtener los datos de usuario.js
 const USUARIO = require('./modulos/modulo_seguridad/router/usuario');
 app.use('/API', USUARIO);
 //-----obtiene los datos de roles.js
 const ROLES = require('./modulos/modulo_seguridad/router/roles');
 app.use('/API', ROLES);


//--------------------------------MODULO PERSONAS PATRICIA FERRUFINO------------------------------------------------------------
//----persona.js
const perso = require('./modulos/modulo_personas/persona');
app.use('/API', perso);
//------direccion.js
const direc = require('./modulos/modulo_personas/direccion');
app.use('/API', direc);
//-----correo.js
const corr = require('./modulos/modulo_personas/correo');
app.use('/API', corr)
    //--------empleado.js
const empl = require('./modulos/modulo_personas/empleado');
app.use('/API', empl)
    //---------telefono.js
const tel = require('./modulos/modulo_personas/telefono');
app.use('/API', tel)
