const express = require('express');
const employee = express.Router();
const conexion = require('../../config/conexion');
//rutas

//-----Obtiene todos los datos
employee.get('/empleado', (req, res) => {
    conexion.query('SELECT * FROM pe_empleado', (err, result) => {
        if (err) {
            res.status(404).send({ message: "recurso no encontrado" });
        } else {
            res.status(201).send(result);
        }
    });
});

//Buscar empleado por id
employee.get('/empleadoid/:id', (req, res) => {
    var cod_empleado = req.params.id;
    conexion.query("call MOSTRAR_EMPLEADO('" + cod_empleado + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al consultar los datos" });
            } else {
                res.status(201).send(result[0]);
            }

        });
});

//Borrar empleado

employee.delete("/deleteemp/:id", (req, res) => {
    var cod_empleado = req.params.id;
    conexion.query("call BORRAR_EMPLEADO('" + cod_empleado + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al eliminar los datos" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se borró con éxito" });
            }

        });
});

//Insertar empleado a través el procedimiento almacenado
employee.post('/insertarempl', (req, res) => {
    let COD_EMPLEADO = req.body.COD_EMPLEADO;
    let DNI = req.body.DNI;
    let DESIGNACION = req.body.DESIGNACION;
    let SUELDO = req.body.SUELDO;
    let DIRECCION = req.body.DIRECCION;
    let CONTACTO = req.body.CONTACTO;
    let FEC_INICIO = req.body.FEC_INICIO;
    let FEC_SALIDA = req.body.FEC_SALIDA;
    let USUARIO_ADD = req.body.USUARIO_ADD;
    let FEC_INGRESO = req.body.FEC_INGRESO;
    let APELLIDOS = req.body.APELLIDOS;
    let NOMBRES = req.body.NOMBRES;

    conexion.query("call INS_EMPLEADO('" + COD_EMPLEADO + "', '" + DNI + "','" + DESIGNACION + "', '" + SUELDO +
        "','" + DIRECCION + "', '" + CONTACTO + "', '" + FEC_INICIO + "', '" + FEC_SALIDA + "', '" + USUARIO_ADD + "', '" + FEC_INGRESO + "', '" + APELLIDOS + "', '" + NOMBRES + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar Empleado" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se insertó con éxito" });
            }
        });

});

// actualizar EMPLEADO
employee.put('/actemployee', (req, res) => {
    let COD_EMPLEADO = req.body.COD_EMPLEADO;
    let DNI = req.body.DNI;
    let DESIGNACION = req.body.DESIGNACION;
    let SUELDO = req.body.SUELDO;
    let DIRECCION = req.body.DIRECCION;
    let CONTACTO = req.body.CONTACTO;
    let FEC_INICIO = req.body.FEC_INICIO;
    let FEC_SALIDA = req.body.FEC_SALIDA;
    let USUARIO_ADD = req.body.USUARIO_ADD;
    let FEC_INGRESO = req.body.FEC_INGRESO;
    let APELLIDOS = req.body.APELLIDOS;
    let NOMBRES = req.body.NOMBRES;

    conexion.query("call ACT_EMPLEADO('" + COD_EMPLEADO + "', '" + DNI + "','" + DESIGNACION + "', '" + SUELDO +
        "','" + DIRECCION + "', '" + CONTACTO + "', '" + FEC_INICIO + "', '" + FEC_SALIDA + "', '" + USUARIO_ADD + "', '" + FEC_INGRESO + "', '" + APELLIDOS + "', '" + NOMBRES + "')",
        (err, result) => {
            if (err) {
                res.status(404).send({ mensaje: "Error al insertar Empleado" });
            } else {
                res.status(201).send({ resultado: result[0], mensaje: "Se insertó con éxito" });
            }
        });

});


module.exports = employee;