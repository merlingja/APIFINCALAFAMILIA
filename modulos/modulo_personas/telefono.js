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
            res.status(201).send({ telefono: result });
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
                res.status(201).send({ resultado: result, mensaje: "Peticion Exitosa" });
            }

        });
});

//Borrar telefono

telephone.delete("/deletephone", (request, response) => {
    const req = request.query
    const query = "DELETE FROM pe_telefono where COD_TELEFONO=?;";
    const params = [req.cod_telefono]
    conexion.query(query, params, (err, result, fields) => {
        if (err) throw err;

        response.json({ delete: result.affectedRows })

    });
})


//Insertar telefono a través el procedimiento almacenado
telephone.post('/insertarphone', (req, res) => {
    let cod_telefono = req.body.cod_telefono;
    let num_telefono = req.body.num_telefono;
    let tipo_telefono = req.body.tipo_telefono;

    conexion.query("call INS_TELEFONO('" + cod_telefono + "', '" + num_telefono + "','" + tipo_telefono + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar telefono" });
            } else {
                res.status(201).send({ resultado: result, mensaje: "Se inserto con exito" });
            }
        });

});


// actualizar telefono
telephone.put('/actphone', (req, res) => {
    let cod_telefono = req.body.cod_telefono;
    conexion.query("call ACT_TELEFONO ('" + cod_telefono + "')",
        (err, resultado) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al actualizar en TELEFONO" });
            } else {
                res.status(201).send({ persona: result, mensaje: "Se actualizo con exito" });
            }
        });

});
module.exports = telephone;