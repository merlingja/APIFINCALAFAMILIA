//-----------------------Modulo usuario--------------------------------------
const express = require('express'); 
const usuario = express.Router();
const conexion = require('../../../config/conexion');

//obtiene los usuarios
usuario.get('/lista-usuarios', (req, res) => { 
    conexion.query("call MOSTRAR_USUARIOS()", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Datos no encontrado'});
        } else {
            res.status(201).send({usuario: result });  
        }
    });
   });
//obtiene un usuario
usuario.get('/usuarioid/:id',(req,res)=> {  
    var id_usuario = req.params.id;
    conexion.query("call MOSTRAR_USUARIO('"+id_usuario+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al consultar los datos"});
        } else {
            res.status(201).send({resultado: result, mensaje: "accion Exitosa"});
        }  
      
});  
});

//Borrar usuario
usuario.delete("/delete-usuario", (request, response) => {
    const req=request.query
    const query="DELETE FROM in_usuario where id_usuario=?;";
    const params=[req.id_usuario]
    conexion.query(query,params,(err,result,fields) => {
      if(err) throw err;
    
      response.json({delete:result.affectedRows})
    
    });
    })

//Insertar usuario
usuario.post('/insertar-usuario', (req, res) => {
    let id_usuario = req.body.id_usuario;
    let nombre_usuario = req.body.nombre_usuario;
    let correo = req.body.correo;
    let contraseña = req.body.contraseña;
    

        conexion.query("call INS_PRODUCTO('"+id_usuario+"', '"+nombre_usuario+"','"+correo+"', '"+contraseña+"')",
        (err, result) => {
            if (err){
                res.status(404).send({mensaje: "Se produjo un Error al insertar el usuario"});
            } else {
                res.status(201).send({resultado: result, mensaje: "Se inserto con exito"});
            }
        });

});  

module.exports = usuario;