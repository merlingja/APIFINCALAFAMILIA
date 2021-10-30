//-----------------------Modulo Inventario--------------------------------------
//-------------------Creado por Merling Aguilar---------------------------------
const express = require('express'); 
const routers = express.Router();
const conexion = require('../../../config/conexion');
//rutas

//obtiene todos los productos
routers.get('/tipo-productos', (req, res) => { 
conexion.query("call MOSTRAR_TIPOS_PRODUCTOS()", (err, result) => {
    if (err) {
        res.status(404).send({message: 'recurso no encontrado'});
    } else {
        res.status(201).send({producto: result });  
    }
});
});

 //obtiene los productos de la BD por Id 
routers.get('/tipo-producto/:id',(req,res)=> {  
    var cod_tipo_producto = req.params.id;
    conexion.query("call MOSTRAR_TIPOS_PRODUCTO('"+cod_tipo_producto+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al consultar los datos"});
        } else {
            res.status(201).send({producto: result, mensaje: "Peticion Exitosa"});
        }  
      
});
});      

// Eliminar los datos del producto
routers.delete('/eliminar-tipo-producto/:id',(req,res)=>{ 
    var cod_tipo_producto = req.params.id; 
    conexion.query("call BORRAR_TIPO_PRODUCTO('"+cod_tipo_producto+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al eliminar los datos"});
        } else {
            res.status(201).send({producto: result, mensaje: "Eliminación de datos exitosa"});
        }  
      
});  
});  
  
//Insertar  un producto a través el procedimiento almacenado
routers.post('/insertar-tipo-producto', (req, res) => {
    var tipo = req.body.tipo;
    var descripcion = req.body.descripcion;

        conexion.query("call INS_TIPO_PRODUCTO('"+tipo+"','"+descripcion+"')",
        (err, result) => {
            if (err){
                res.status(404).send({mensaje: "Error al insertar el producto"});
            } else {
                res.status(201).send({producto: result, mensaje: "Se inserto con exito"});
            }
        });

});   

//actualiza tipo de producto
routers.put('/actualizar-tipo-producto', (req, res) => {
    let cod_tip_producto = req.body.cod_tip_producto;
    let tip_producto = req.body.tip_producto;
    let des_tip_producto = req.body.des_tip_producto;
    
      
        conexion.query("call ACT_TIPO_PRODUCTO('"+cod_tip_producto+"', '"+tip_producto+"','"+des_tip_producto+"')",
        (err, result) => {
            if (err){
                res.status(404).send({mensaje: "Error al actualizar el producto"});
            } else {
                res.status(201).send({producto: result, mensaje: "Se actualizo con exito"});
            }
        });

});


//exporta la ruta que tuvo actividad en este archivo 
module.exports = routers;

