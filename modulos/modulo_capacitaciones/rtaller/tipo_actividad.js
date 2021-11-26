//-----------------------Modulo Capacitaciones--------------------------------------
//-------------------Creado por Carlos Amador---------------------------------
const express = require('express'); 
const workshop = express.Router();
const conexion = require('../../../config/conexion');

//obtiene todod los  talleres
workshop.get('/mostrar-EQUIPO', (req, res) => { 
conexion.query("call MOSTRAR_Equipo", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Error al consultar'});
        } else {
            res.status(201).send({equipo: result });  
        }
    });
   });

   //solo 1 equipo por Id   
   workshop.get('/muestre-equipo/:id',(req,res)=> {  
    var cod_equipo = req.params.id;
    conexion.query("call MOSTRAR_TALLER('"+cod_equipo+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al consultar"});
        } else {
            res.status(201).send({equipo: result, mensaje: "Peticion Exitosa"});
        }  
      
});
});   
workshop.delete('/eliminar-equipo/:id',(req,res)=>{ 
    var cod_tipo_actividad = req.params.id; 
    conexion.query("call BORRAR_TIPOACTIVIDAD('"+cod_tipo_actividad+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al eliminar los datos"});
        } else {
            res.status(201).send({tipoactividad: result, mensaje: "Eliminación de datos exitosa"});
        }  
      
});  
});  
//Insertar  un producto a través el procedimiento almacenado
workshop.post('/insertar-TIPOACTIVIDAD', (req, res) => {
    let nombreactividad = req.body.nombreactividad;
    let descripcion = req.body.descripcion;

        conexion.query("call IN_TIPOACTIVIDAD('"+nombreactividad+"' , '"+descripcion+"')",
        (err, result) => {
            if (err){
                res.status(404).send({mensaje: "Error al insertar"});
            } else {
                res.status(201).send({tipoactividad: result, mensaje: "Se inserto con exito"});
            }
        });

});

   module.exports = workshop;   