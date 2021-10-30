//-----------------------Modulo Inventario--------------------------------------
//-------------------Creado por Merling Aguilar---------------------------------
const express = require('express'); 
const inventory = express.Router();
const conexion = require('../../../config/conexion');

//obtiene todod los  productos en el inventario
inventory.get('/todo_inventario', (req, res) => { 
    conexion.query("call MOSTRAR_TODO_INVENTARIO", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Recusrso no  encontrado'});
        } else {
            res.status(201).send({inventario: result });  
        }
    });
   });

 //muestra un solo producto en el inventario
    inventory.get('/inventarioid/:id',(req,res)=> {  
        var cod_inventario = req.params.id;
        conexion.query("call MOSTRAR_INVENTARIO('"+cod_inventario+"')",
            (err, result) =>{  
            if (err){
                res.status(404).send({mensaje: "Error al consultar los datos"});
            } else {
                res.status(201).send({resultado: result, mensaje: "Peticion Exitosa"});
            }  
          
    });  
    });
//borrar en inventario y producto
    inventory.delete('/borrar_inventario/:cod_inventario/:cod_producto',(req,res)=>{ 
        var cod_inventario = req.params.cod_inventario;
        var cod_producto = req.params.cod_producto;

        res.status(201).send({inventario: cod_inventario, producto: cod_producto});

        conexion.query("call BORRAR_INVENTARIO('"+cod_inventario+"' , '"+cod_producto+"' )",
            (err, result) =>{  
            if (err){
                res.status(404).send({mensaje: "Error al eliminar los datos"});
            } else {
                res.status(201).send({inventario: result, mensaje: "Eliminación de datos exitosa"});
            }  
          
    }); 
    });  
//Insertar inventario
    inventory.post('/insertar-inventario', (req, res) => {
        let cod_producto = req.body.cod_producto;
        let can_existencia = req.body.can_existencia;
        let fec_introduccion = req.body.fec_introduccion;
          
            conexion.query("call INS_IN_INVENTARIO('"+cod_producto+"', '"+can_existencia+"','"+fec_introduccion+"')",
            (err, result) => {
                if (err){
                    res.status(404).send({mensaje: "Error al insertar en inventario"});
                } else {
                    res.status(201).send({inventario: result, mensaje: "Se inserto con exito"});
                }
            });
    
    });  

    //actualizar Inventario
    inventory.put('/actualizar-inventario', (req, res) => {
        let cod_producto = req.body.cod_producto;
        let can_existencia = req.body.can_existencia;
        let tip_transaccion = req.body.tip_transaccion;
        
          
            conexion.query("call ACT_INVENTARIO('"+cod_producto+"', '"+can_existencia+"','"+tip_transaccion+"')",
            (err, result) => {
                if (err){
                    res.status(404).send({mensaje: "Error al actualizar en inventario"});
                } else {
                    res.status(201).send({inventario: result, mensaje: "Se actualizo con exito"});
                }
            });
    
    });



    module.exports = inventory;
