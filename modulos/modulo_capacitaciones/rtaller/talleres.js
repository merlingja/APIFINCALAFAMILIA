//-----------------------Modulo Capacitaciones--------------------------------------
//-------------------Creado por Carlos Amador---------------------------------
const express = require('express'); 
const workshop = express.Router();
const conexion = require('../../../config/conexion');

//obtiene todod los  talleres
workshop.get('/mostrar-taller', (req, res) => { 
conexion.query("call MOSTRAR_TALLERES", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Error al consultar'});
        } else {
            res.status(201).send({taller: result });  
        }
    });
   });

   //solo 1 taller por Id 
   workshop.get('/muestre-taller/:id',(req,res)=> {  
    var cod_taller = req.params.id;
    conexion.query("call MOSTRAR_TALLER('"+cod_taller+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al consultar"});
        } else {
            res.status(201).send({taller: result, mensaje: "Peticion Exitosa"});
        }  
      
});
});   
workshop.delete('/eliminar-taller/:id',(req,res)=>{ 
    var cod_taller = req.params.id; 
    conexion.query("call BORRAR_TALLER('"+cod_taller+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al eliminar los datos"});
        } else {
            res.status(201).send({taller: result, mensaje: "Eliminación de datos exitosa"});
        }  
      
});  
});  
//Insertar  un producto a través el procedimiento almacenado
workshop.post('/insertar-taller', (req, res) => {
    let nombre_taller = req.body.nombre_taller;
    let horario = req.body.horario;
    let fecha_inicio = req.body.fecha_inicio;
    let fecha_final = req.body.fecha_final;
    let descripcion = req.body.descripcion;

        conexion.query("call IN_TALLER('"+nombre_taller+"','"+horario+"','"+fecha_inicio+"' , '"+fecha_final+"', '"+descripcion+"')",
        (err, result) => {
            if (err){
                res.status(404).send({mensaje: "Error al insertar"});
            } else {
                res.status(201).send({taller: result, mensaje: "Se inserto con exito"});
            }
        });

});

   module.exports = workshop;