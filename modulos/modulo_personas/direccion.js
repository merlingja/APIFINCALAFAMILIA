const express = require('express');
const address = express.Router();
const conexion = require('../../config/conexion');
//rutas

//-----Obtiene todos los datos
address.get('/direccion', (req, res) => {
    conexion.query('SELECT * FROM pe_direccion', (err, result) => {
        if (err) {
            res.status(404).send({ message: 'recurso no encontrado' });
        } else {
            res.status(201).send({ direccion: result });
        }
    });
});

//Buscar direccion por id
address.get('/direccionid/:id', (req, res) => {
    var cod_direccion = req.params.id;
    conexion.query("call MOSTRAR_ADDRESS('" + cod_direccion + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al consultar los datos" });
            } else {
                res.status(201).send({ resultado: result, mensaje: "Peticion Exitosa" });
            }

        });
});

//Borrar direccion

address.delete("/deletedir", (request, response) => {
    const req = request.query
    const query = "DELETE FROM pe_direccion where COD_DIRECCION=?;";
    const params = [req.cod_direccion]
    conexion.query(query, params, (err, result, fields) => {
        if (err) throw err;

        response.json({ delete: result.affectedRows })

    });
})


//Insertar direccion a través el procedimiento almacenado
address.post('/insertardir', (req, res) => {
    let cod_direccion = req.body.cod_direccion;
    let departamento = req.body.departamento;
    let municipio = req.body.municipio;
    let ciudad = req.body.ciudad;
    let colonia = req.body.colonia;
    let tipo_direccion = req.body.tipo_direccion;

    conexion.query("call INS_PEOPLE('" + cod_direccion + "', '" + departamento + "','" + municipio + "', '" + ciudad +
        "','" + colonia + "', '" + tipo_direccion + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar direccion" });
            } else {
                res.status(201).send({ resultado: result, mensaje: "Se inserto con exito" });
            }
        });

});

// actualizar DIRECCION
address.put('/actualizardir', (req, res) => {
    let cod_direccion = req.body.cod_direccion;
    conexion.query("call ACT_DIRECCION ('" + cod_direccion + "')",
        (err, resultado) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al actualizar en Direcciones" });
            } else {
                res.status(201).send({ persona: result, mensaje: "Se actualizo con exito" });
            }
        });

});


module.exports = address;