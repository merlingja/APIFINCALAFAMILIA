const express = require('express'); 
const routers = express.Router();
const conexion = require('../../../config/conexion');
//rutas

//obtiene todos los productos
routers.get('/tipo-productos', (req, res) => { 
conexion.query('SELECT *FROM in_tipo_producto', (err, result) => {
    if (err) {
        res.status(404).send({message: 'recurso no encontrado'});
    } else {
        res.status(201).send({productos: result });  
    }
});
});

 //obtiene los productos de la BD por Id 
routers.get('/tipo-producto/:id',(req,res)=> {  
    var cod_tipo_producto = req.params.id;
    conexion.query("call MOSTRAR_TIPOS_PRODUCTO('"+cod_tipo_producto+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al consultar los datos"});
        } else {
            res.status(201).send({resultado: result, mensaje: "Peticion Exitosa"});
        }  
      
})  
})       

// Eliminar los datos del empleado en función de la identificación
routers.delete('/eliminar-tipo-producto/:id',(req,res)=>{ 
    var cod_tipo_producto = req.params.id; 
    conexion.query("call BORRAR_TIPO_PRODUCTO('"+cod_tipo_producto+"')",
        (err, result) =>{  
        if (err){
            res.status(404).send({mensaje: "Error al eliminar los datos"});
        } else {
            res.status(201).send({resultado: result, mensaje: "Eliminación de datos exitosa"});
        }  
      
})  
})  
  
//Insertar  un producto a través el procedimiento almacenado
routers.post('/insertar-tipo-producto', (req, res) => {
    var tipo = req.body.tipo;
    var descripcion = req.body.descripcion;

        conexion.query("call INS_TIPO_PRODUCTO('"+tipo+"','"+descripcion+"')",
        (err, result) => {
            if (err){
                res.status(404).send({mensaje: "Error al insertar el tipo de producto"});
            } else {
                res.status(201).send({resultado: result, mensaje: "Se inserto con exito"});
            }
        });
});    
// Actualizar un producto a través del procedimiento almacenado
/*app.put('/employees',(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @Designation = ?;SET @City = ?;SET @ContactNo = ?; \  
              CALL AddorUpdateEmployee(@EmpID,@Name,@Designation,@City,@ContactNo);"  
    mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.Designation,emp.City,emp.ContactNo],(err,rows,fields)=>{  
    if(!err)   
    res.send("Updation Done");  
    else  
        console.log(err);  
})  
});  
//exporta la ruta que tuvo actividad este archivo  */
module.exports = routers;

