//-----------------------Modulo Capacitaciones--------------------------------------
//-------------------Creado por Carlos Amador---------------------------------
const express = require('express'); 
const workshop = express.Router();
const conexion = require('../../../config/conexion');

//obtiene todod los certificados
workshop.get('/mostrar-certificado', (req, res) => { 
conexion.query("call MOSTRAR_CERTIFICADO", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Error al consultar'});
        } else {
            res.status(201).send({certificado: result });  
        }
    });
   });

   //solo 1 certificado por Id   
   workshop.get('/muestre-CERTIFICADO/:id',(req,res)=> {  
    var cod_CERTIFICADO = req.params.id;
    conexion.query("call MOSTRAR_CERTIFICADO('"+cod_taller+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al consultar"});
        } else {
            res.status(201).send({certificado: result, mensaje: "Peticion Exitosa"});
        }  
      
});
});   
workshop.delete('/eliminar-certificado/:id',(req,res)=>{ 
    var cod_certificado = req.params.id; 
    conexion.query("call BORRAR_CERTIFICADO('"+cod_certificado+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al eliminar los datos"});
        } else {
            res.status(201).send({certificado: result, mensaje: "Eliminación de datos exitosa"});
        }  
      
});  
});  
//Insertar  un producto a través el procedimiento almacenado
workshop.post('/insertar-certificado', (req, res) => {
    let nombre_certificado = req.body.nombre_certificado;
    let fecha_emision= req.body.fecha_emision;
    let fecha_reimpresion = req.body.fecha_reimpresion;

        conexion.query("call IN_CERTIFICADO('"+nombre_certificado+"','"+fecha_emision+"','"+fecha_reimpresion+"')",
        (err, result) => {
            if (err){
                res.status(404).send({mensaje: "Error al insertar"});
            } else {
                res.status(201).send({certificado: result, mensaje: "Se inserto con exito"});
            }
        });

});

   module.exports = workshop;