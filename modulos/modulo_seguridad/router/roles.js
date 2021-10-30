//-----------------------Modulo roles--------------------------------------
const express = require('express'); 
const roles = express.Router();
const conexion = require('../../../config/conexion');

//obtiene los roles
roles.get('/lista-roles', (req, res) => { 
    conexion.query("call MOSTRAR_ROLES()", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Datos no encontrado'});
        } else {
            res.status(201).send({usuario: result });  
        }
    });
   });
//obtiene un roles
roles.get('/rolesid/:id',(req,res)=> {  
    var id_roles = req.params.id;
    conexion.query("call MOSTRAR_ROLES('"+id_roles+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al consultar los datos"});
        } else {
            res.status(201).send({resultado: result, mensaje: "accion Exitosa"});
        }  
      
});  
});

//Borrar roles
roles.delete("/delete-roles", (request, response) => {
    const req=request.query
    const query="DELETE FROM in_roles where id_roles=?;";
    const params=[req.id_roles]
    conexion.query(query,params,(err,result,fields) => {
      if(err) throw err;
    
      response.json({delete:result.affectedRows})
    
    });
    })

//Insertar roles
roles.post('/insertar-roles', (req, res) => {
    let id_roles = req.body.id_roles;
    let administrador = req.body.administrador;
    let vendedor = req.body.vendedor;
    let capacitador = req.body.capacitador;
    

        conexion.query("call INS_ROLES('"+id_roles+"', '"+administrador+"','"+vendedor+"', '"+capacitador+"')",
        (err, result) => {
            if (err){
                res.status(404).send({mensaje: "Se produjo un Error al insertar un rol"});
            } else {
                res.status(201).send({resultado: result, mensaje: "Se inserto con exito"});
            }
        });

});  

module.exports = roles;