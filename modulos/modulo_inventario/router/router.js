const express = require('express'); 
const routers = express.Router();
const conexion = require('../../../config/conexion');
//ruta
routers.get('/productos', (req, rest) => {
conexion.query('select *from in_tipo_producto', (err, result) => {
    if (err) {
        rest.status(404).send({message: 'recurso no encontrado'});
    } else {
        rest.status(201).send({productos: result });  
    }
});
});

    

module.exports = routers;

