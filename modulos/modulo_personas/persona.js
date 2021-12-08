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
                res.status(201).send(result[0]);
            }

        });
});




//Insertar  persona a través el procedimiento almacenado
personas.post('/insertarpersona', (req, res) => {
    let COD_PERSONA = req.body.COD_PERSONA;
    let DNI = req.body.DNI;
    let NOMBRES = req.body.NOMBRES;
    let APELLIDOS = req.body.APELLIDOS;
    let EDAD = req.body.EDAD;
    let SEXO = req.body.SEXO;
    let ESTADOCIVIL = req.body.ESTADOCIVIL;
    let DIRECCION = req.body.DIRECCION;
    let TELEFONO = req.body.TELEFONO;
    let CORREO = req.body.CORREO;
    let DESCRIPCION = req.body.DESCRIPCION;
    let FEC_INGRESO = req.body.FEC_INGRESO;

    conexion.query("call INS_PEOPLE('" + COD_PERSONA + "', '" + DNI + "','" + NOMBRES + "', '" + APELLIDOS + "','" +
        EDAD + "','" + SEXO +
        "','" + ESTADOCIVIL + "', '" + DIRECCION + "','" + TELEFONO + "','" + CORREO + "','" +
        DESCRIPCION + "','" + FEC_INGRESO + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar persona" });
            } else {
                res.status(201).send(result[0]);
            }
        });

});

// actualizar PERSONA
personas.put('/actpersona', (req, res) => {
    let COD_PERSONA = req.body.COD_PERSONA;
    let DNI = req.body.DNI;
    let NOMBRES = req.body.NOMBRES;
    let APELLIDOS = req.body.APELLIDOS;
    let EDAD = req.body.EDAD;
    let SEXO = req.body.SEXO;
    let ESTADOCIVIL = req.body.ESTADOCIVIL;
    let DIRECCION = req.body.DIRECCION;
    let TELEFONO = req.body.TELEFONO;
    let CORREO = req.body.CORREO;
    let DESCRIPCION = req.body.DESCRIPCION;
    let FEC_INGRESO = req.body.FEC_INGRESO;

    conexion.query("call ACT_PERSONA('" + COD_PERSONA + "', '" + DNI + "','" + NOMBRES + "', '" + APELLIDOS + "','" +
        EDAD + "','" + SEXO + "','" + ESTADOCIVIL + "', '" + DIRECCION + "','" + TELEFONO + "','" + CORREO + "','" +
        DESCRIPCION + "','" + FEC_INGRESO + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar persona" });
            } else {
                res.status(201).send(result[0]);
            }
        });
});






module.exports = personas;