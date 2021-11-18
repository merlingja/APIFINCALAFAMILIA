const express = require('express');
const telephone = express.Router();
const conexion = require('../../config/conexion');
//rutas

//-----Obtiene todos los datos
telephone.get('/telefono', (req, res) => {
    conexion.query('SELECT * FROM pe_telefono', (err, result) => {
        if (err) {
            res.status(404).send({ message: 'recurso no encontrado' });
        } else {
            res.status(201).send(result);
        }
    });
});

//Buscar TELEFONO por id
telephone.get('/telefono/:id', (req, res) => {
    var cod_telefono = req.params.id;
    conexion.query("call MOSTRAR_TELEFONO('" + cod_telefono + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al consultar los datos" });
            } else {
                res.status(201).send(result[0]);
            }

        });
});

//Borrar telefono

telephone.delete('/deletetel/:id', (req, res) => {
    var cod_telefono = req.params.id;
    conexion.query("call BORRAR_TELEFONO('" + cod_telefono + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al eliminar los datos" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se borró con éxito" });
            }

        });
});



//Insertar telefono a través el procedimiento almacenado
telephone.post('/insertarphone', (req, res) => {
    let COD_TELEFONO = req.body.COD_TELEFONO;
    let NUM_TELEFONO = req.body.NUM_TELEFONO;
    let TIPO_NUMERO = req.body.TIPO_NUMERO;

    conexion.query("call INS_TELEFONO('" + COD_TELEFONO + "', '" + NUM_TELEFONO + "','" + TIPO_NUMERO + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar telefono" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se insertó con éxito" });
            }
        });

});


// actualizar telefono
telephone.put('/actphone', (req, res) => {
    let COD_TELEFONO = req.body.COD_TELEFONO;
    let NUM_TELEFONO = req.body.NUM_TELEFONO;
    let TIPO_NUMERO = req.body.TIPO_NUMERO;

    conexion.query("call ACT_TELEFONO('" + COD_TELEFONO + "', '" + NUM_TELEFONO + "','" + TIPO_NUMERO + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar persona" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se actualizó con éxito" });
            }
        });

});


module.exports = telephone;