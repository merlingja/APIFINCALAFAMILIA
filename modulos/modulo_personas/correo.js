const express = require('express');
const email = express.Router();
const conexion = require('../../config/conexion');
//rutas

//-----Obtiene todos los datos
email.get('/correo', (req, res) => {
    conexion.query('SELECT * FROM pe_correo', (err, result) => {
        if (err) {
            res.status(404).send({ message: 'recurso no encontrado' });
        } else {
            res.status(201).send(result);
        }
    });
});

//Buscar CORREO por id
email.get('/correoid/:id', (req, res) => {
    var cod_correo = req.params.id;
    conexion.query("call MOSTRAR_CORREO('" + cod_correo + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al consultar los datos" });
            } else {
                res.status(201).send(result[0]);
            }

        });
});

//Borrar correo

email.delete('/deletecorreo/:id', (req, res) => {
    var cod_correo = req.params.id;
    conexion.query("call BORRAR_CORREO('" + cod_correo + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al eliminar los datos" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se borró con exito" });
            }

        });
});


//Insertar  correo a través el procedimiento almacenado
email.post('/insertaremail', (req, res) => {
    let COD_CORREO = req.body.COD_CORREO;
    let USUARIOCORREO = req.body.USUARIOCORREO;
    let TIPO_CORREO = req.body.TIPO_CORREO;

    conexion.query("call INS_CORREO('" + COD_CORREO + "', '" + USUARIOCORREO + "','" + TIPO_CORREO + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar persona" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se insertó con exito" });
            }
        });

});

// actualizar correo
email.put('/actemail', (req, res) => {
    let COD_CORREO = req.body.COD_CORREO;
    let USUARIOCORREO = req.body.USUARIOCORREO;
    let TIPO_CORREO = req.body.TIPO_CORREO;

    conexion.query("call ACT_CORREO('" + COD_CORREO + "', '" + USUARIOCORREO + "','" + TIPO_CORREO + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar persona" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se actualizó con exito" });
            }
        });

});

module.exports = email;