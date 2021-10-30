const express = require('express');
const personas = express.Router();
const conexion = require('../../config/conexion');
//rutas

//----Obtiene todos los datos
personas.get('/people', (req, res) => {
    conexion.query('SELECT * FROM pe_persona', (err, result) => {
        if (err) {
            res.status(404).send({ message: 'recurso no encontrado' });
        } else {
            res.status(201).send({ personas: result });
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
                res.status(201).send({ resultado: result, mensaje: "Peticion Exitosa" });
            }

        });
});

//Borrar persona

personas.delete("/deletepeople", (request, response) => {
    const req = request.query
    const query = "DELETE FROM pe_persona where COD_PERSONA=?;";
    const params = [req.cod_persona]
    conexion.query(query, params, (err, result, fields) => {
        if (err) throw err;

        response.json({ delete: result.affectedRows })

    });
})


//Insertar  persona a través el procedimiento almacenado
personas.post('/insertarpersona', (req, res) => {
    let cod_persona = req.body.cod_persona;
    let id = req.body.id;
    let primernombre = req.body.primernombre;
    let segundonombre = req.body.segundonombre;
    let primerapellido = req.body.primerapellido;
    let segundoapellido = req.body.segundoapellido;
    let sexo = req.body.sexo;
    let estadocivil = req.body.estadocivil;
    let edad = req.body.edad;
    let tipo_cliente = req.body.tipo_cliente;
    let descripcion = req.body.descripcion;
    let usuario_add = req.body.usuario_add;
    let fec_ingreso = req.body.fec_ingreso;

    conexion.query("call INS_PEOPLE('" + cod_persona + "', '" + id + "','" + primernombre + "', '" + segundonombre + "','" + primerapellido + "','" + segundoapellido +
        "','" + sexo + "', '" + estadocivil + "','" + edad + "','" + tipo_cliente + "','" + descripcion + "','" + usuario_add + "','" + fec_ingreso + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar persona" });
            } else {
                res.status(201).send({ resultado: result, mensaje: "Se inserto con exito" });
            }
        });

});

// actualizar PERSONA
personas.put('/actualizarpersona', (req, res) => {
    let cod_persona = req.body.cod_persona;
    conexion.query("call ACT_PERSONA ('" + cod_persona + "')",
        (err, resultado) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al actualizar en Personas" });
            } else {
                res.status(201).send({ persona: result, mensaje: "Se actualizo con exito" });
            }
        });

});


module.exports = personas;