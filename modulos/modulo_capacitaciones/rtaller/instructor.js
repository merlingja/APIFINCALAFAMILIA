//-----------------------Modulo Capacitaciones--------------------------------------
//-------------------Creado por Carlos Amador---------------------------------
const express = require('express'); 
const workshop = express.Router();
const conexion = require('../../../config/conexion');

//obtiene todod los  talleres
workshop.get('/mostrar-INSTRUCTOR', (req, res) => { 
conexion.query("call MOSTRAR_INSTRUCTOR", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Error al consultar'});
        } else {
            res.status(201).send({instructor: result });  
        }
    });
   });

   //solo 1 taller por Id   
   workshop.get('/muestre-instructor/:id',(req,res)=> {  
    var cod_instructor = req.params.id;
    conexion.query("call MOSTRAR_INSTRUCTOR('"+cod_taller+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al consultar"});
        } else {
            res.status(201).send({instructor: result, mensaje: "Peticion Exitosa"});
        }  
      
});
});   
workshop.delete('/eliminar-instructor/:id',(req,res)=>{ 
    var cod_instructor = req.params.id; 
    conexion.query("call BORRAR_INSTRUCTOR('"+cod_instructor+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al eliminar los datos"});
        } else {
            res.status(201).send({taller: result, mensaje: "Eliminación de datos exitosa"});
        }  
      
});  
});  
//Insertar  un producto a través el procedimiento almacenado
workshop.post('/insertar-instructor', (req, res) => {
    let nombre_instructor = req.body.nombre_instructor_;
    let descripcion= req.body.descripcion;


        conexion.query("call IN_INSTRUCTOR('"+nombre_instructor+"','"+descripcion+"',)",
        (err, result) => {
            if (err){
                res.status(404).send({mensaje: "Error al insertar"});
            } else {
                res.status(201).send({taller: result, mensaje: "Se inserto con exito"});
            }
        });

});

   module.exports = workshop;