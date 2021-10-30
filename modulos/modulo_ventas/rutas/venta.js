const express = require('express'); 
const vent = express.Router();
const conexion = require('../../../config/conexion');

//obtiene todod los  productos en el inventario
vent.get('/mostrar_ventas', (req, res) => { 
    conexion.query("call MOSTRAR_TODO_venta", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Recusrso no  encontrado'});
        } else {
            res.status(201).send({ventas: result });  
        }
    });
   });

   //obtiene un producto 
 vent.get('/ventaid/:id',(req,res)=> {  
    var Cod_ventas= req.params.id;
    conexion.query("call MOSTRAR_una_venta('"+Cod_ventas+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al consultar los datos"});
        } else {
            res.status(201).send({ventas: result, mensaje: "Peticion Exitosa"});
        }  
      
         });  
    });



    //eliminar ventas 
    vent.delete('/eliminar-venta/:id',(req,res)=>{ 
        var Cod_ventas= req.params.id; 
        conexion.query("call BORRAR_VENTA('"+Cod_ventas+"')",
    
            (err, result) =>{  
            if (err){
                res.status(404).send({mensaje: "Error al eliminar los datos"});
            } else {
                res.status(201).send({producto: result, mensaje: "Eliminación de datos exitosa"});
            }  
          
            });  
        });  


        //insertar ventas 
        vent.post('/insertar-vntas', (req, res) => {
            let Cod_Inventario = req.body.Cod_Inventario;
            let Cod_Tipo_descuento = req.body.Cod_Tipo_descuento;
            let Cod_Historial_venta = req.body.Cod_Historial_venta;
            let Cod_Metodo_pago = req.body.Cod_Metodo_pago;
            let Cantidad = req.body.Cantidad;
            let Precio= req.body.Precio;
            let ISV = req.body.ISV;
            let Fecha_Emicion = req.body.Fecha_Emicion;
            
        
                conexion.query("call in_venta('"+Cod_Inventario+"', '"+Cod_Tipo_descuento+"','"+Cod_Historial_venta+"', '"+Cod_Metodo_pago+"','"+Cantidad+"','"+Precio+"','"+ISV+"', '"+Fecha_Emicion+"')",
                (err, result) => {
                    if (err){
                        res.status(404).send({mensaje: "Error al insertar el producto"});
                    } else {
                        res.status(201).send({resultado: result, mensaje: "Se inserto con exito"});
                    }
                });
        
        });  
    
module.exports = vent;