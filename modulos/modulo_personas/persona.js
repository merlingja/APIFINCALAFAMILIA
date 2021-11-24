const express = require('express');
const personas = express.Router();
const conexion = require('../../config/conexion');
//rutas

//----Obtiene todos los datos
personas.get('/people', (req, res) => {
    conexion.query("call MOSTRAR_TODASPERSONA", (err, result) => {
        if (err) {
            res.status(404).send({ message: 'recurso no encontrado' });
        } else {
            res.status(201).send(result[0]);
        }
    });
});


//Buscar persona por id
personas.get('/peopleid/:id', (req, res) => {
    var cod_persona = req.params.id;
    conexion.query("call MOSTRAR_PEOPLE('" + cod_persona + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al consultar los datos" });
            } else {
                res.status(201).send(result[0]);
            }

        });
});

//borrar persona
personas.delete('/deletepeople/:id', (req, res) => {
    var cod_persona = req.params.id;
    conexion.query("call BORRAR_PERSONA('" + cod_persona + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al eliminar los datos" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se borró con éxito" });
            }

        });
});




//Insertar  persona a través el procedimiento almacenado
personas.post('/insertarpersona', (req, res) => {
    let COD_PERSONA = req.body.COD_PERSONA;
    let ID = req.body.ID;
    let PRIMERNOMBRE = req.body.PRIMERNOMBRE;
    let SEGUNDONOMBRE = req.body.SEGUNDONOMBRE;
    let PRIMERAPELLIDO = req.body.PRIMERAPELLIDO;
    let SEGUNDOAPELLIDO = req.body.SEGUNDOAPELLIDO;
    let SEXO = req.body.SEXO;
    let ESTADOCIVIL = req.body.ESTADOCIVIL;
    let EDAD = req.body.EDAD;
    let TIPO_CLIENTE = req.body.TIPO_CLIENTE;
    let DESCRIPCION = req.body.DESCRIPCION;
    let USUARIO_ADD = req.body.USUARIO_ADD;
    let FEC_INGRESO = req.body.FEC_INGRESO;

    conexion.query("call INS_PEOPLE('" + COD_PERSONA + "', '" + ID + "','" + PRIMERNOMBRE + "', '" + SEGUNDONOMBRE + "','" +
        PRIMERAPELLIDO + "','" + SEGUNDOAPELLIDO +
        "','" + SEXO + "', '" + ESTADOCIVIL + "','" + EDAD + "','" + TIPO_CLIENTE + "','" +
        DESCRIPCION + "','" + USUARIO_ADD + "','" + FEC_INGRESO + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar persona" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se insertó con éxito" });
            }
        });

});

// actualizar PERSONA
personas.put('/actpersona', (req, res) => {
    let COD_PERSONA = req.body.COD_PERSONA;
    let ID = req.body.ID;
    let PRIMERNOMBRE = req.body.PRIMERNOMBRE;
    let SEGUNDONOMBRE = req.body.SEGUNDONOMBRE;
    let PRIMERAPELLIDO = req.body.PRIMERAPELLIDO;
    let SEGUNDOAPELLIDO = req.body.SEGUNDOAPELLIDO;
    let SEXO = req.body.SEXO;
    let ESTADOCIVIL = req.body.ESTADOCIVIL;
    let EDAD = req.body.EDAD;
    let TIPO_CLIENTE = req.body.TIPO_CLIENTE;
    let DESCRIPCION = req.body.DESCRIPCION;
    let USUARIO_ADD = req.body.USUARIO_ADD;
    let FEC_INGRESO = req.body.FEC_INGRESO;

    conexion.query("call ACT_PERSONA('" + COD_PERSONA + "', '" + ID + "','" + PRIMERNOMBRE + "', '" + SEGUNDONOMBRE + "','" +
        PRIMERAPELLIDO + "','" + SEGUNDOAPELLIDO +
        "','" + SEXO + "', '" + ESTADOCIVIL + "','" + EDAD + "','" + TIPO_CLIENTE + "','" +
        DESCRIPCION + "','" + USUARIO_ADD + "','" + FEC_INGRESO + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al actualizar persona" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se actualizó con éxito" });
            }
        });

});






module.exports = personas;