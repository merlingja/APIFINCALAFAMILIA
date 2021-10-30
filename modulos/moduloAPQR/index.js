// Importing the packages required for the project.  
  
const mysql = require('mysql');  
const express = require('express');  
var app = express();  
const bodyparser = require('body-parser');  
  
// Used for sending the Json Data to Node API  
app.use(bodyparser.json());  
  
// Configuracion a base de datos  
var mysqlConnection = mysql.createConnection({  
    host: 'localhost',  
    user : 'root',  
    password : '',   
    database : 'bd_finca_familia',  
    multipleStatements : true  
});  
  
// Validacion a la base de datos.  
mysqlConnection.connect((err) => {  
    if(!err) {  
        console.log("Conexion Exitosa");  
    }  
    else{  
        console.log("DB No Conecta \n Error :" + JSON.stringify(err,undefined,2));  
    }  
});  
  
// Correr el server en puerto:  
app.listen(5000,()=> console.log("Servidor Express corriendo en puerto : 5000"));

//METHOD CRUD
//GET ALL PLANTAS 

app.get('/plantas',(req,res)=>{

    mysqlConnection.query('SELECT * FROM ap_plantas',(err,rows,fields)=>{

    if(!err)
    res.send(rows);
    else
       console.log(err);

    })
});

//GET ALL CODIGO QR
app.get('/codigo_qr',(req,res)=>{

    mysqlConnection.query('SELECT * FROM ap_codigo_qr',(err,rows,fields)=>{

    if(!err)
    res.send(rows);
    else
       console.log(err);

    })
});

// GET PLANTAS POR ID
app.get('/plantas/:id',(req,res)=>{ 
   
   var PlantId = req.params.id;
   mysqlConnection.query("call SEL_PLANTA('"+PlantId+"')",(err,result)=>{

    if(err){
        res.status(404).send({mensaje: "Error al consultar los datos"});
    }else{
        res.status(201).send({resultado: result, mensaje: "Peticion Exitosa"});
    }
       

   })

});

// GET CODIGO QR POR ID
app.get('/codigo_qr/:id',(req,res)=>{ 
   
    var CodQR = req.params.id;
   mysqlConnection.query("call SEL_COD_QR('"+CodQR+"')",(err,result)=>{

    if(err){
        res.status(404).send({mensaje: "Error al consultar los datos"});
    }else{
        res.status(201).send({resultado: result, mensaje: "Peticion Exitosa"});
    }
       
 
    })
 
 });
 
 // POST Insercion de nuevas plantas y codigo QR 

 app.post('/plantasqr',(req,res)=>{
    let plant = req.body;
    var sql ="SET @SEQ_QR = ?; SET @USR_REGISTRO = ?;SET @NOM_PLANTA = ?; SET @NOM_CIENTIFICO = ?; SET @CLASE = ?; SET @FAMILIA = ?; SET @ESPECIE = ?; SET @DES_PLANTA = ?; \
              CALL INS_AP_QR(@SEQ_QR, @USR_REGISTRO,@NOM_PLANTA, @NOM_CIENTIFICO, @CLASE, @FAMILIA, @ESPECIE, @DES_PLANTA);"
    mysqlConnection.query(sql,[plant.SEQ_QR, plant.USR_REGISTRO, plant.NOM_PLANTA, plant.NOM_CIENTIFICO, plant.CLASE, plant.FAMILIA, plant.ESPECIE, plant.DES_PLANTA],(err,rows,fields)=>{
      
        if(!err)
         res.send("Inserción Completada");
        else
         console.log(err);

    }) 


 });

 

 // Metodo Delete para la eliminacion de registros de plantas y su respectivo codigo qr

 
app.delete('/plantaqr/:id/:id',(req,res)=>{ 
   
    var PlantId = req.params.id;
    var CodId   = req.params.id;
    mysqlConnection.query("call DEL_AP_QR('"+PlantId+"','"+CodId+"')",(err,result)=>{
 
     if(err){
         res.status(404).send({mensaje: "Error al eleminar los datos"});
     }else{
         res.status(201).send({resultado: result, mensaje: "Peticion Exitosa"});
     }
        
 
    })
 
 });


 // Metodo PUT para actualizar los registros de las plantas y el codigo QR

 app.put('/plantasqr',(req,res)=>{
    let plant = req.body;
    var sql ="SET @COD_QR = ?; SET @COD_PLANTA = ?; SET @SEQ_QR = ?; SET @USR_REGISTRO = ?;SET @NOM_PLANTA = ?; SET @NOM_CIENTIFICO = ?; SET @CLASE = ?; SET @FAMILIA = ?; SET @ESPECIE = ?; SET @DES_PLANTA = ?; \
              CALL ACT_AP_QR(@COD_QR, @COD_PLANTA, @SEQ_QR, @USR_REGISTRO,@NOM_PLANTA, @NOM_CIENTIFICO, @CLASE, @FAMILIA, @ESPECIE, @DES_PLANTA);"
    mysqlConnection.query(sql,[plant.COD_QR, plant.COD_PLANTA,plant.SEQ_QR, plant.USR_REGISTRO, plant.NOM_PLANTA, plant.NOM_CIENTIFICO, plant.CLASE, plant.FAMILIA, plant.ESPECIE, plant.DES_PLANTA],(err,rows,fields)=>{
      
        if(!err)
         res.send("Actualización Completada");
        else
         console.log(err);

    }) 


 });