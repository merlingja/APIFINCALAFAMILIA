const express = require('express'); 
const metod = express.Router();
const conexion = require('../../../config/conexion');

//mostrar todos los datos de metodos de pago  
metod.get('/mostrar_mtodoP', (req, res) => { 
    conexion.query("call MOSTRAR_pagos", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Recusrso no  encontrado'});
        } else {
            res.status(201).send({ventas: result });  
        }
    });
   });

 //mostrar todos un dato de metodos de pago  
   metod.get('/metodo/:id',(req,res)=> {  
    var Cod_metodo_pago= req.params.id;
    conexion.query("call MOSTRAR_pago('"+Cod_metodo_pago+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al consultar los datos"});
        } else {
            res.status(201).send({ventas: result, mensaje: "Peticion Exitosa"});
        }  
      
         });  
    });

    //eliminar un dato de tabla metodos 
    metod.delete('/eliminar-metodosp/:id',(req,res)=>{ 
        var COD_pago_me= req.params.id; 
        conexion.query("call BORRAR_TIPO_PAGO('"+COD_pago_me+"')",
    
            (err, result) =>{  
            if (err){
                res.status(404).send({mensaje: "Error al eliminar los datos"});
            } else {
                res.status(201).send({producto: result, mensaje: "Eliminación de datos exitosa"});
            }  
          
            });  
        });  
        //insertar en la tabla metodo 
        metod.post('/insertar-metoodo', (req, res) => {
            let Efectivo = req.body.efectivo;
            let Tarjeata_Credito = req.body.total;
            let transferencia = req.transferencia;
              
                conexion.query("call hist_ven('"+Efectivo+"', '"+Tarjeata_Credito+"','"+transferencia+"')",
                (err, result) => {
                    if (err){
                        res.status(404).send({mensaje: "Error al insertar en inventario"});
                    } else {
                        res.status(201).send({inventario: result, mensaje: "Se inserto con exito"});
                    }
                });
        
        });
    

module.exports = metod;
