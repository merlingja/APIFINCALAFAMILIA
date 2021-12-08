//-----------------------Modulo Capacitaciones--------------------------------------
//-------------------Creado por Carlos Amador---------------------------------
const express = require('express'); 
const workshop = express.Router();
const conexion = require('../../../config/conexion');

//obtiene todod los  talleres
workshop.get('/mostrar-taller', (req, res) => { 
conexion.query("call MOSTRAR_ALUMNO", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Error al consultar'});
        } else {
            res.status(201).send({alumno: result });  
        }
    });
   });

   //solo 1 taller por Id   
   workshop.get('/muestre-alumno/:id',(req,res)=> {  
    var cod_alumno = req.params.id;
    conexion.query("call MOSTRAR_ALUMNO('"+cod_alumno+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al consultar"});
        } else {
            res.status(201).send({alumno: result, mensaje: "Peticion Exitosa"});
        }  
      
});
});   
workshop.delete('/eliminar-alumno/:id',(req,res)=>{ 
    var cod_alumno = req.params.id; 
    conexion.query("call BORRAR_ALUMNO('"+cod_alumno+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al eliminar los datos"});
        } else {
            res.status(201).send({alumno: result, mensaje: "Eliminación de datos exitosa"});
        }  
      
});  
});  
//Insertar  un producto a través el procedimiento almacenado
workshop.post('/insertar-alumno', (req, res) => {
    let nombre_alumno = req.body.nombre_alumno;
    let fecha_ingreso = req.body.fecha_ingreso;
    let organizacion = req.body.organizacion;
    let comentario = req.body.comentario;


        conexion.query("call IN_ALUNO('"+nombre_alumno+"','"+fecha_ingreso+"','"+organizacion+"' , '"+comentario+")",
        (err, result) => {
            if (err){
                res.status(404).send({mensaje: "Error al insertar"});
            } else {
                res.status(201).send({alumno: result, mensaje: "Se inserto con exito"});
            }
        });

});

   module.exports = workshop;