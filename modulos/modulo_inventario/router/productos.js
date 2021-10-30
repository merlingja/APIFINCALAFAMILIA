//-----------------------Modulo Inventario--------------------------------------
//-------------------Creado por Merling Aguilar---------------------------------
const express = require('express'); 
const products = express.Router();
const conexion = require('../../../config/conexion');

//obtiene todos los productos

products.get('/lista-productos', (req, res) => { 
    conexion.query("call MOSTRAR_PRODUCTOS()", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Recusrso no  encontrado'});
        } else {
            res.status(201).send({productos: result });  
        }
    });
   });
//obtiene un producto 
products.get('/productoid/:id',(req,res)=> {  
    var cod_producto = req.params.id;
    conexion.query("call MOSTRAR_PRODUCTO('"+cod_producto+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al consultar los datos"});
        } else {
            res.status(201).send({productos: result, mensaje: "Peticion Exitosa"});
        }  
      
});  
});

//Borrar producto
products.delete("/delete-producto", (request, response) => {
    const req=request.query
    const query="DELETE FROM in_producto where COD_PRODUCTO=?;";
    const params=[req.cod_producto]
    conexion.query(query,params,(err,result,fields) => {
      if(err) throw err;
    
      response.json({delete:result.affectedRows})
    
    });
    })

//Insertar  un producto a través el procedimiento almacenado
products.post('/insertar-producto', (req, res) => {
    let cod_tip_producto = req.body.cod_tip_producto;
    let nombre_producto = req.body.nombre_producto;
    let precio = req.body.precio;
    let fotografia = req.body.fotografia;
    let vida_util = req.body.vida_util;
    let descripcion = req.body.descripcion;
    let pre_producto = req.body.pre_producto;
    let fec_caducidad = req.body.fec_caducidad;
    

        conexion.query("call INS_PRODUCTO('"+cod_tip_producto+"', '"+nombre_producto+"','"+precio+"', '"+fotografia+"','"+vida_util+"','"+descripcion+"','"+pre_producto+"', '"+fec_caducidad+"')",
        (err, result) => {
            if (err){
                res.status(404).send({mensaje: "Error al insertar el producto"});
            } else {
                res.status(201).send({producto: result, mensaje: "Se inserto con exito"});
            }
        });

}); 
//actualizar productos
products.put('/actualizar-producto', (req, res) => {
    let cod_producto = req.body.cod_producto;
    let cod_tip_producto = req.body.cod_tip_producto;
    let nombre_producto = req.body.nombre_producto;
    let precio = req.body.precio;
    let fotografia = req.body.fotografia;
    let vida_util = req.body.vida_util;
    let descripcion = req.body.descripcion;
    let pre_producto = req.body.pre_producto;
    let fec_caducidad = req.body.fec_caducidad;
    
      
        conexion.query("call ACT_PRODUCTO('"+cod_producto+"','"+cod_tip_producto+"', '"+nombre_producto+"','"+precio+"','"+fotografia+"', '"+vida_util+"','"+descripcion+"', '"+pre_producto+"', '"+fec_caducidad+"')",
        (err, result) => {
            if (err){
                res.status(404).send({mensaje: "Error al actualizar el producto"});
            } else {
                res.status(201).send({producto: result, mensaje: "Se actualizo con exito"});
            }
        });

}); 

module.exports = products;
