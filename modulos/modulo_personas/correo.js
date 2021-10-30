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
            res.status(201).send({ correo: result });
        }
    });
});

//Buscar CORREO por id
email.get('/correoid/:id', (req, res) => {
    var cod_correo = req.params.id;
    conexion.query("call MOSTRAR_EMAIL('" + cod_correo + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al consultar los datos" });
            } else {
                res.status(201).send({ resultado: result, mensaje: "Peticion Exitosa" });
            }

        });
});

//Borrar correo

email.delete("/deletemail", (request, response) => {
    const req = request.query
    const query = "DELETE FROM pe_correo where COD_CORREO=?;";
    const params = [req.cod_correo]
    conexion.query(query, params, (err, result, fields) => {
        if (err) throw err;

        response.json({ delete: result.affectedRows })

    });
})

//Insertar correo a través el procedimiento almacenado
email.post('/insertaremail', (req, res) => {
    let cod_correo = req.body.cod_correo;
    let usuariocorreo = req.body.usuariocorreo;
    let tipo_correo = req.body.tipo_correo;

    conexion.query("call INS_PEOPLE('" + cod_correo + "', '" + usuariocorreo + "','" + tipo_correo + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar correo" });
            } else {
                res.status(201).send({ resultado: result, mensaje: "Se inserto con exito" });
            }
        });

});

// actualizar correo
email.put('/actemail', (req, res) => {
    let cod_correo = req.body.cod_correo;
    conexion.query("call ACT_CORREO ('" + cod_correo + "')",
        (err, resultado) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al actualizar en CORREO" });
            } else {
                res.status(201).send({ persona: result, mensaje: "Se actualizo con exito" });
            }
        });

});

module.exports = email;