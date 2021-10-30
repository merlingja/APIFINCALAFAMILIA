const express = require('express'); 
const history = express.Router();
const conexion = require('../../../config/conexion');

//mostrar todos los datos de historial 
history.get('/mostrar_historial', (req, res) => { 
    conexion.query("call MOSTRAR_TODO_HISTORIAL", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Recusrso no  encontrado'});
        } else {
            res.status(201).send({ventas: result });  
        }
    });
   });

  //mostrar todos un dato de historial 
   history.get('/historialid/:id',(req,res)=> {  
    var Cod_historial_V= req.params.id;
    conexion.query("call MOSTRAR_HISTORIAL('"+Cod_historial_V+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al consultar los datos"});
        } else {
            res.status(201).send({ventas: result, mensaje: "Peticion Exitosa"});
        }  
      
         });  
    });

  // Eliminar los datos del historial
  history.delete('/eliminar-tipo-historial/:id',(req,res)=>{ 
    var Cod_historial_V = req.params.id; 
    conexion.query("call BORRAR_hist_v('"+Cod_historial_V+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al eliminar los datos"});
        } else {
            res.status(201).send({producto: result, mensaje: "Eliminación de datos exitosa"});
        }  
      
        });  
    });


    
    //insertar tabla historial
    history.post('/insertar-historial', (req, res) => {
        let Cod_Ventas = req.body.Cod_Ventas;
        let total = req.body.total;
          
            conexion.query("call hist_ven('"+Cod_Ventas+"', '"+total+"')",
            (err, result) => {
                if (err){
                    res.status(404).send({mensaje: "Error al insertar en inventario"});
                } else {
                    res.status(201).send({inventario: result, mensaje: "Se inserto con exito"});
                }
            });
    
    });

module.exports = history;