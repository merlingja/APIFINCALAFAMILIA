const express = require('express');
const address = express.Router();
const conexion = require('../../config/conexion');
//rutas

//-----Obtiene todos los datos
address.get('/direccion', (req, res) => {
    conexion.query('SELECT * FROM pe_direccion', (err, result) => {
        if (err) {
            res.status(404).send({ message: "recurso no encontrado" });
        } else {
            res.status(201).send(result);
        }
    });
});

//Buscar direccion por id
address.get('/direccionid/:id', (req, res) => {
    var cod_direccion = req.params.id;
    conexion.query("call MOSTRAR_DIRECCION('" + cod_direccion + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al consultar los datos" });
            } else {
                res.status(201).send(result[0]);
            }

        });
});

//Borrar direccion

address.delete('/deletedir/:id', (req, res) => {
    var cod_direccion = req.params.id;
    conexion.query("call BORRAR_DIRECCION('" + cod_direccion + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al eliminar los datos" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se borró con éxito" });
            }

        });
});


//Insertar direccion a través el procedimiento almacenado
address.post('/insertardir', (req, res) => {
    let COD_DIRECCION = req.body.COD_DIRECCION;
    let DEPARTAMENTO = req.body.DEPARTAMENTO;
    let MUNICIPIO = req.body.MUNICIPIO;
    let CIUDAD = req.body.CIUDAD;
    let COLONIA = req.body.COLONIA;
    let TIPO_DIRECCION = req.body.TIPO_DIRECCION;

    conexion.query("call INS_DIRECCION('" + COD_DIRECCION + "', '" + DEPARTAMENTO + "','" + MUNICIPIO + "', '" + CIUDAD +
        "','" + COLONIA + "', '" + TIPO_DIRECCION + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar direccion" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se insertó con éxito" });
            }
        });

});

// actualizar DIRECCION
address.put('/actdireccion', (req, res) => {
    let COD_DIRECCION = req.body.COD_DIRECCION;
    let DEPARTAMENTO = req.body.DEPARTAMENTO;
    let MUNICIPIO = req.body.MUNICIPIO;
    let CIUDAD = req.body.CIUDAD;
    let COLONIA = req.body.COLONIA;
    let TIPO_DIRECCION = req.body.TIPO_DIRECCION;

    conexion.query("call ACT_DIRECCION('" + COD_DIRECCION + "', '" + DEPARTAMENTO + "','" + MUNICIPIO + "', '" + CIUDAD +
        "','" + COLONIA + "', '" + TIPO_DIRECCION + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar persona" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se actualizó con éxito" });
            }
        });

});


module.exports = address;