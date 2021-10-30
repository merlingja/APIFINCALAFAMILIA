//-----------------------Modulo AP_QR--------------------------------------
//-------------------Creado por Deiby Lainez---------------------------------
const express = require('express'); 
const plantaqr = express.Router();
const conexion = require('../../../config/conexion');

//obtiene todod las plantas de la finca la familia
plantaqr.get('/plantas', (req, res) => { 
    conexion.query("call SELALL_PLANTA", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Recurso no  encontrado'});
        } else {
            res.status(201).send({planta: result });  
        }
    });
   });

   //obtiene todos los codigos qr de la finca la familia
plantaqr.get('/codigo_qr', (req, res) => { 
    conexion.query("call SELALL_COD_QR", (err, result) => {
        if (err) {
            res.status(404).send({message: 'Recurso no  encontrado'});
        } else {
            res.status(201).send({codqr: result });  
        }
    });
   });


  
 //muestra una sola planta en el resultado
    plantaqr.get('/plantas/:id',(req,res)=> {  
        var PlantId = req.params.id;
         conexion.query("call SEL_PLANTA('"+PlantId+"')",(err,result)=>{

         if(err){
           res.status(404).send({mensaje: "Error al consultar los datos"});
         }else{
           res.status(201).send({resultado: result, mensaje: "Peticion Exitosa"});
        }
       
          
    });  
    });

    //muestra una solo codigo qr en el resultado
    plantaqr.get('/codigo_qr/:id',(req,res)=> {  
        var CodQR = req.params.id;
        conexion.query("call SEL_COD_QR('"+CodQR+"')",(err,result)=>{

        if(err){
           res.status(404).send({mensaje: "Error al consultar los datos"});
        }else{
           res.status(201).send({resultado: result, mensaje: "Peticion Exitosa"});
        }
    });
    });

    //borrar en plantas y codigo qr
    plantaqr.delete('/borrar_plantaqr/:id/:id2',(req,res)=>{ 
        var PlantId = req.params.id;
        var CodId = req.params.id2;

        res.status(201).send({planta: id, codigoqr: id2});

        conexion.query("call DEL_AP_QR('"+PlantId+"' , '"+CodId+"' )",
            (err, result) =>{  
            if (err){
                res.status(404).send({mensaje: "Error al eliminar los datos"});
            } else {
                res.status(201).send({plantasqr: result, mensaje: "Eliminación de datos exitosa"});
            }  
          
    }); 
    });  
    //Insertar planta y codigo qr
    plantaqr.post('/insertar-plantaqr', (req, res) => {
        let plant = req.body;
        var sql ="SET @SEQ_QR = ?; SET @USR_REGISTRO = ?;SET @NOM_PLANTA = ?; SET @NOM_CIENTIFICO = ?; SET @CLASE = ?; SET @FAMILIA = ?; SET @ESPECIE = ?; SET @DES_PLANTA = ?; \
              CALL INS_AP_QR(@SEQ_QR, @USR_REGISTRO,@NOM_PLANTA, @NOM_CIENTIFICO, @CLASE, @FAMILIA, @ESPECIE, @DES_PLANTA);"
        conexion.query(sql,[plant.SEQ_QR, plant.USR_REGISTRO, plant.NOM_PLANTA, plant.NOM_CIENTIFICO, plant.CLASE, plant.FAMILIA, plant.ESPECIE, plant.DES_PLANTA],(err,rows,fields)=>{
        if(!err)
         res.send("Inserción Completada");
        else
         console.log(err);
    }); 
    });  

    //actualizar plantas y codigo qr
    plantaqr.put('/actualizar-plantaqr', (req, res) => {
        let plant = req.body;
        var sql ="SET @COD_QR = ?; SET @COD_PLANTA = ?; SET @SEQ_QR = ?; SET @USR_REGISTRO = ?;SET @NOM_PLANTA = ?; SET @NOM_CIENTIFICO = ?; SET @CLASE = ?; SET @FAMILIA = ?; SET @ESPECIE = ?; SET @DES_PLANTA = ?; \
              CALL ACT_AP_QR(@COD_QR, @COD_PLANTA, @SEQ_QR, @USR_REGISTRO,@NOM_PLANTA, @NOM_CIENTIFICO, @CLASE, @FAMILIA, @ESPECIE, @DES_PLANTA);"
        conexion.query(sql,[plant.COD_QR, plant.COD_PLANTA,plant.SEQ_QR, plant.USR_REGISTRO, plant.NOM_PLANTA, plant.NOM_CIENTIFICO, plant.CLASE, plant.FAMILIA, plant.ESPECIE, plant.DES_PLANTA],(err,rows,fields)=>{

        if(!err)
         res.send("Actualización Completada");
        else
         console.log(err);

        }); 
    
    });



    module.exports = plantaqr;
