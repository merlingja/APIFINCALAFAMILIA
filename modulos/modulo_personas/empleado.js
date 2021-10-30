const express = require('express');
const employee = express.Router();
const conexion = require('../../config/conexion');
//rutas

//-----Obtiene todos los datos
employee.get('/empleado', (req, res) => {
    conexion.query('SELECT * FROM pe_empleado', (err, result) => {
        if (err) {
            res.status(404).send({ message: 'recurso no encontrado' });
        } else {
            res.status(201).send({ empleado: result });
        }
    });
});

//Buscar empleado por id
employee.get('/empleadoid/:id', (req, res) => {
    var cod_empleado = req.params.id;
    conexion.query("call MOSTRAR_employee('" + cod_empleado + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al consultar los datos" });
            } else {
                res.status(201).send({ resultado: result, mensaje: "Peticion Exitosa" });
            }

        });
});

//Borrar empleado

employee.delete("/deleteempl", (request, response) => {
    const req = request.query
    const query = "DELETE FROM pe_empleado where COD_EMPLEADO=?;";
    const params = [req.cod_empleado]
    conexion.query(query, params, (err, result, fields) => {
        if (err) throw err;

        response.json({ delete: result.affectedRows })

    });
})

//Insertar empleado a través el procedimiento almacenado
employee.post('/insertarempl', (req, res) => {
    let cod_empleado = req.body.cod_empleado;
    let id = req.body.id;
    let dni = req.body.dni;
    let nombre = req.body.nombre;
    let designacion = req.body.designacion;
    let sueldo = req.body.tipo_sueldo;
    let direccion = req.body.direccion;
    let contacto = req.body.contacto;
    let fec_inicio = req.body.fec_inicio;
    let fec_salida = req.body.fec_salida;
    let usuario_add = req.body.usuario_add;
    let fec_ingreso = req.body.fec_ingreso;

    conexion.query("call INS_EMPLEADO('" + cod_empleado + "', '" + id + "','" + dni + "', '" + nombre +
        "','" + designacion + "', '" + sueldo + "', '" + direccion + "', '" + contacto + "', '" + fec_inicio + "', '" + fec_salida + "', '" + usuario_add + "', '" + fec_ingreso + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar Empleado" });
            } else {
                res.status(201).send({ resultado: result, mensaje: "Se inserto con exito" });
            }
        });

});

// actualizar EMPLEADO
employee.put('/actualizarempl', (req, res) => {
    let cod_empleado = req.body.cod_empleado;
    conexion.query("call ACT_EMPLEADO ('" + cod_empleado + "')",
        (err, resultado) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al actualizar en Empleado" });
            } else {
                res.status(201).send({ persona: result, mensaje: "Se actualizo con exito" });
            }
        });

});


module.exports = employee;