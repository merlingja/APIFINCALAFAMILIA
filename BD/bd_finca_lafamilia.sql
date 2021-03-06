-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-12-2021 a las 08:20:05
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_finca_lafamilia`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `ACT_AP_QR` (IN `XCOD_QR` BIGINT, IN `XCOD_PLANTA` BIGINT, IN `SEQ_QR` VARCHAR(255), IN `USR_REGISTRO` VARCHAR(255), IN `NOM_PLANTA` VARCHAR(255), IN `NOM_CIENTIFICO` VARCHAR(255), IN `CLASE` VARCHAR(255), IN `FAMILIA` VARCHAR(255), IN `ESPECIE` VARCHAR(255), IN `DES_PLANTA` VARCHAR(255))  BEGIN
 START TRANSACTION;
 /*###################################*/
  
  
   UPDATE ap_codigo_qr 
   SET 
     SEQ_QR = `SEQ_QR`,
     USR_REGISTRO = `USR_REGISTRO`,
     FEC_REGISTRO = now()
  WHERE 
     COD_QR = `XCOD_QR`; 

  
   UPDATE ap_plantas
   SET
      NOM_PLANTA = `NOM_PLANTA`,
      NOM_CIENTIFICO = `NOM_CIENTIFICO`,
      CLASE = `CLASE`,
      FAMILIA = `FAMILIA`,
      ESPECIE = `ÃˆSPECIE`,
      DES_PLANTA = `DES_PLANTA`,
      FEC_REGISTRO = now()
    WHERE
      COD_PLANTA = `XCOD_PLANTA`;
    
     

COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ACT_EMPLEADO` (IN `XCOD_EMPLEADO` BIGINT, IN `XDNI` VARCHAR(255), IN `XDESIGNACION` VARCHAR(255), IN `XSUELDO` INT(50), IN `XDIRECCION` VARCHAR(255), IN `XCONTACTO` INT(30), IN `XFEC_INICIO` DATE, IN `XFEC_INGRESO` DATETIME, IN `XAPELLIDOS` VARCHAR(255), IN `XNOMBRES` VARCHAR(255))  BEGIN
  START TRANSACTION;
  UPDATE PE_EMPLEADO
  SET 
  DNI = XDNI,
  DESIGNACION = XDESIGNACION,
  SUELDO = XSUELDO,
  DIRECCION = XDIRECCION,
  CONTACTO = XCONTACTO,
  FEC_INICIO = XFEC_INICIO,
  FEC_INGRESO = NOW(),
  APELLIDOS = XAPELLIDOS,
  NOMBRES = XNOMBRES
  
WHERE COD_EMPLEADO = XCOD_EMPLEADO;
 COMMIT;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ACT_his_venta` (IN `hCod_historial_V` INT(10), IN `hCod_Ventas` BIGINT, IN `htotal` VARCHAR(100))  BEGIN
   START TRANSACTION;
   UPDATE historial_ventas
         SET  Cod_Ventas=hCod_Ventas,
               total=htotal 
   WHERE Cod_historial_V=hCod_historial_V;
   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ACT_INVENTARIO` (`XCOD_PRODUCTO` INT, `XCAN_EXISTENCIA` INT(10), `XTIP_TRANSACCION` VARCHAR(20))  BEGIN
   START TRANSACTION;

   SELECT @CAN_EXISTENCIA := CAN_EXISTENCIA
   FROM IN_INVENTARIO
   WHERE COD_PRODUCTO = XCOD_PRODUCTO;

   IF XTIP_TRANSACCION = 'compra'  
   THEN
      UPDATE in_inventario
      SET CAN_EXISTENCIA = (@CAN_EXISTENCIA + XCAN_EXISTENCIA),
          FEC_MODIFICACION = NOW()
      WHERE COD_PRODUCTO = XCOD_PRODUCTO;
   END IF;

   IF XTIP_TRANSACCION = 'venta'
   THEN
      UPDATE in_inventario
      SET CAN_EXISTENCIA = (@CAN_EXISTENCIA - XCAN_EXISTENCIA),
          FEC_MODIFICACION = NOW()
      WHERE COD_PRODUCTO = XCOD_PRODUCTO;
   END IF;

   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ACT_met_pago` (IN `mCod_metodo_pago` BIGINT, IN `mEfectivo` VARCHAR(20), IN `mTarjeata_Credito` VARCHAR(20), IN `mtransferencia` VARCHAR(20))  BEGIN
   START TRANSACTION;
   UPDATE metodo_pago
         SET Efectivo =mEfectivo,
         Tarjeata_Credito =mTarjeata_Credito,
         transferencia = mtransferencia
   WHERE Cod_metodo_pago=mCod_metodo_pago;
   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ACT_PERSONA` (IN `XCOD_PERSONA` BIGINT, IN `XDNI` VARCHAR(255), IN `XNOMBRES` VARCHAR(255), IN `XAPELLIDOS` VARCHAR(255), IN `XEDAD` TINYINT, IN `XSEXO` ENUM('F','M'), IN `XESTADOCIVIL` ENUM('S','C','D','UL','V'), IN `XDIRECCION` VARCHAR(255), IN `XTELEFONO` INT(50), IN `XCORREO` VARCHAR(255), IN `XDESCRIPCION` VARCHAR(255), IN `XFEC_INGRESO` DATETIME)  BEGIN
START TRANSACTION;
UPDATE PE_PERSONA SET 
DNI = XDNI,
NOMBRES = XNOMBRES,
APELLIDOS = XAPELLIDOS,
EDAD = XEDAD,
SEXO = XSEXO,
ESTADOCIVIL = XESTADOCIVIL,
DIRECCION = XDIRECCION,
TELEFONO = XTELEFONO,
CORREO = XCORREO,
DESCRIPCION = XDESCRIPCION,
FEC_INGRESO =NOW()
WHERE COD_PERSONA = XCOD_PERSONA;
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ACT_PRODUCTO` (IN `XCOD_PRODUCTO` INT, IN `XCOD_TIP_PRODUCTO` INT, IN `XNOMBRE_PRODUCTO` VARCHAR(100), IN `XPRECIO` FLOAT, IN `XFOTOGRAFIA` VARCHAR(120), IN `XVIDA_UTIL` VARCHAR(200), IN `XDESCRIPCION` VARCHAR(200), IN `XPRE_PRODUCTO` VARCHAR(100), IN `XFEC_CADUCIDAD` DATE)  BEGIN
   START TRANSACTION;

   UPDATE IN_PRODUCTO
   SET COD_TIP_PRODUCTO = XCOD_TIP_PRODUCTO,
       NOMBRE_PRODUCTO = XNOMBRE_PRODUCTO,
       PRECIO = XPRECIO,
       FOTOGRAFIA = XFOTOGRAFIA,
       VIDA_UTIL = XVIDA_UTIL,
       DESCRIPCION = XDESCRIPCION,
       PRE_PRODUCTO = XPRE_PRODUCTO,
       FEC_CADUCIDAD = XFEC_CADUCIDAD
   WHERE COD_PRODUCTO = XCOD_PRODUCTO;

   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ACT_ROLES` (IN `XID_ROLES` BIGINT, IN `XID_USUARIO` BIGINT, IN `XADMINISTRADOR` VARCHAR(225), IN `XVENDEDOR` VARCHAR(225), IN `XCAPACITADOR` VARCHAR(225))  BEGIN
   START TRANSACTION;

   UPDATE ROLES
   SET ID_USUARIO = ID_USUARIO,
       ADMINISTRADOR = XADMINISTRADOR,
       VENDEDOR = XVENDEDOR,
       CAPACITADOR = XCAPACITADOR
   WHERE ID_ROLES = XID_ROLES;

   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ACT_TIPO_PRODUCTO` (IN `XCOD_TIP_PRODUCTO` INT, IN `XTIP_PRODUCTO` ENUM('F','S','P','T'), IN `XDES_TIP_PRODUCTO` VARCHAR(255))  BEGIN
   START TRANSACTION;

   UPDATE IN_TIPO_PRODUCTO
   SET TIP_PRODUCTO = XTIP_PRODUCTO, DES_TIP_PRODUCTO = XDES_TIP_PRODUCTO
   WHERE COD_TIP_PRODUCTO = XCOD_TIP_PRODUCTO;

   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ACT_USUARIO` (IN `XID_USUARIO` BIGINT, IN `XCOD_PERSONAS` BIGINT, IN `XNOMBRE_USUARIO` VARCHAR(225), IN `XCORREO` VARCHAR(225), IN `XCONTRASEÃ‘A` VARCHAR(225))  BEGIN
   START TRANSACTION;

   UPDATE USUARIO
   SET COD_PERSONAS = XCOD_PERSONAS,
       NOMBRE_USUARIO = XNOMBRE_USUARIO,
       CORREO = XCORREO,
       CONTRASEÃ‘A = XCONTRASEÃ‘A
   WHERE ID_USUARIO = XID_USUARIO;  

   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ACT_venta` (IN `vCod_Ventas` BIGINT, IN `vCod_Inventario` BIGINT, IN `vCod_Tipo_descuento` INT(10), IN `vCod_Historial_venta` INT(10), IN `vCod_Metodo_pago` BIGINT, IN `vCantidad` INT(10), IN `vPrecio` FLOAT(10), IN `vISV` FLOAT(10), IN `vFecha_Emicion` DATE)  BEGIN
   START TRANSACTION;
   UPDATE venta
   SET Cod_Inventario=vCod_Inventario,
   Cod_Tipo_descuento=vCod_Tipo_descuento,
   Cod_Metodo_pago=vCod_Metodo_pago, 
   Cantidad =vCantidad,
   Precio=vPrecio,
    ISV =vISV,
    Fecha_Emicion = vFecha_Emicion
   WHERE cod_ventas = vCOD_ventas;
   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BORRAR_EMPLEADO` (IN `XCOD_EMPLEADO` BIGINT)  BEGIN
START TRANSACTION;
DELETE FROM PE_EMPLEADO
WHERE COD_EMPLEADO = XCOD_EMPLEADO;
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BORRAR_hist_v` (IN `VCod_historial_V` INT)  BEGIN
   START TRANSACTION;

   DELETE FROM metodo_pago
   WHERE Cod_historial_V =VCod_historial_V;
   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BORRAR_INVENTARIO` (IN `XCOD_INVENTARIO` BIGINT(20), IN `XCOD_PRODUCTO` INT(10))  BEGIN
   START TRANSACTION;

   DELETE FROM IN_INVENTARIO
   WHERE COD_INVENTARIO = XCOD_INVENTARIO;

   DELETE FROM IN_PRODUCTO
   WHERE COD_PRODUCTO = XCOD_PRODUCTO;


   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BORRAR_PERSONA` (IN `XCOD_PERSONA` BIGINT)  BEGIN
START TRANSACTION;
DELETE FROM PE_PERSONA
WHERE COD_PERSONA = XCOD_PERSONA;
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BORRAR_PRODUCTO` (IN `XCOD_PRODUCTO` INT)  BEGIN
   START TRANSACTION;

   DELETE FROM IN_INVENTARIO
   WHERE COD_PRODUCTO = XCOD_PRODUCTO;

   DELETE FROM IN_PRODUCTO
   WHERE COD_PRODUCTO = XCOD_PRODUCTO;



   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BORRAR_ROLES` (IN `ID_ROLES` INT)  BEGIN
   START TRANSACTION;

   DELETE FROM ROLES
   WHERE ID_ROLES = ID_ROLES;

   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BORRAR_TIPO_PAGO` (IN `BCOD_TIPO` BIGINT)  BEGIN
   START TRANSACTION;

   DELETE FROM metodo_pago
   WHERE COD_pago_me =BCOD_TIPO;
   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BORRAR_TIPO_PRODUCTO` (IN `XCOD_TIP_PRODUCTO` INT)  BEGIN
   START TRANSACTION;

   DELETE FROM IN_TIPO_PRODUCTO
   WHERE COD_TIP_PRODUCTO = XCOD_TIP_PRODUCTO;

   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BORRAR_USUARIO` (IN `ID_USUARIO` INT)  BEGIN
   START TRANSACTION;

   DELETE FROM USUARIO
   WHERE ID_USUARIO = ID_USUARIO;

   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BORRAR_VENTA` (IN `BCOD_VENTA` BIGINT)  BEGIN
   START TRANSACTION;

   DELETE FROM VENTAS
   WHERE COD_VENTAS =BCOD_VENTA ;

   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `DEL_AP_QR` (IN `XCOD_QR` BIGINT, IN `XCOD_PLANTA` BIGINT)  BEGIN
 START TRANSACTION;
 /*###################################*/
  
  
   DELETE FROM `ap_codigo_qr` WHERE COD_QR = `XCOD_QR`;

   DELETE FROM `ap_plantas` WHERE COD_PLANTA = `XCOD_PLANTA`;
   
    
     

COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `hist_ven` (IN `_Cod_Ventas` BIGINT, IN `_total` VARCHAR(100))  BEGIN 
START TRANSACTION;
INSERT INTO historial_ventas(Cod_Ventas, 
total) VALUES ( _Cod_Ventas
,_total);
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `INS_AP_QR` (IN `NUM_QR` VARCHAR(255), IN `USR_REGISTRO` VARCHAR(255), IN `NOM_PLANTA` VARCHAR(255), IN `NOM_CIENTIFICO` VARCHAR(255), IN `CLASE` VARCHAR(255), IN `FAMILIA` VARCHAR(255), IN `ESPECIE` VARCHAR(255), IN `DES_PLANTA` VARCHAR(255))  BEGIN
	START TRANSACTION;
  /*###################################*/
  
  INSERT INTO `ap_codigo_qr`
  (
   `SEQ_QR`,
   `USR_REGISTRO`,
   `FEC_REGISTRO`)
  VALUES
  (
   NUM_QR,
   USR_REGISTRO,
   now()
  );
  
  SELECT @COD_QR := MAX(COD_QR) FROM `ap_codigo_qr`;
  /*###################################*/
  
  INSERT INTO `ap_plantas`
     (
      `NOM_PLANTA`,
      `NOM_CIENTIFICO`,
      `CLASE`,
      `FAMILIA`,
      `ESPECIE`,
      `DES_PLANTA`,
      `FEC_REGISTRO`)
  VALUES
  (
      NOM_PLANTA,
      NOM_CIENTIFICO,
      CLASE,
      FAMILIA,
      ESPECIE,
      DES_PLANTA,
      NOW()
  );
  
  SELECT @COD_PLANTA := MAX(COD_PLANTA) FROM `ap_plantas`;
  SELECT @COD_PRODUCTO := MAX(COD_PRODUCTO) FROM `in_producto`;
  /*###################################*/
  INSERT INTO `ap_rel_qr_planta`
      (
        `COD_QR`,
        `COD_PLANTA`,
        `COD_PRODUCTO`,
        `FEC_ADD`)
  VALUES
    (
        @COD_QR,
        @COD_PLANTA,
        @COD_PRODUCTO,
        NOW());
  
    
   
     
  /*###################################*/
 COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `INS_EMPLEADO` (IN `XCOD_EMPLEADO` BIGINT, IN `XDNI` VARCHAR(255), IN `XDESIGNACION` VARCHAR(255), IN `XSUELDO` INT(50), IN `XDIRECCION` VARCHAR(255), IN `XCONTACTO` INT(30), IN `XFEC_INICIO` DATE, IN `XFEC_INGRESO` DATETIME, IN `XAPELLIDOS` VARCHAR(255), IN `XNOMBRES` VARCHAR(255))  BEGIN
  START TRANSACTION;
  INSERT INTO PE_EMPLEADO(COD_EMPLEADO,
  DNI,
  DESIGNACION,
  SUELDO,
  DIRECCION,
  CONTACTO,
  FEC_INICIO,
  FEC_INGRESO,
  APELLIDOS,
  NOMBRES
  
  )
VALUES 
(XCOD_EMPLEADO,
XDNI,
XDESIGNACION,
XSUELDO,
XDIRECCION,
XCONTACTO,
XFEC_INICIO,
NOW(),
XAPELLIDOS,
XNOMBRES
);
 COMMIT;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `INS_IN_INVENTARIO` (IN `XCOD_PRODUCTO` INT(10), IN `XCAN_EXISTENCIA` INT(10), IN `XFEC_INTRODUCCION` DATE)  BEGIN
   START TRANSACTION;

   INSERT INTO IN_INVENTARIO(COD_PRODUCTO,
                             CAN_EXISTENCIA,
                             FEC_INTRODUCCION,
                             FEC_MODIFICACION)
   VALUES (XCOD_PRODUCTO,
           XCAN_EXISTENCIA,
           XFEC_INTRODUCCION,
           NOW());

   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `INS_PEOPLE` (IN `XCOD_PERSONA` BIGINT, IN `XDNI` VARCHAR(255), IN `XNOMBRES` VARCHAR(255), IN `XAPELLIDOS` VARCHAR(255), IN `XEDAD` TINYINT, IN `XSEXO` ENUM('F','M'), IN `XESTADOCIVIL` ENUM('S','C','D','UL','V'), IN `XDIRECCION` VARCHAR(255), IN `XTELEFONO` INT(50), IN `XCORREO` VARCHAR(255), IN `XDESCRIPCION` VARCHAR(255), IN `XFEC_INGRESO` DATETIME)  BEGIN
START TRANSACTION;
INSERT INTO PE_PERSONA
(COD_PERSONA, DNI,
NOMBRES,
APELLIDOS,
EDAD,
SEXO,
ESTADOCIVIL,
DIRECCION,
TELEFONO,
CORREO,
DESCRIPCION,
FEC_INGRESO)
VALUES
(
XCOD_PERSONA, XDNI,
XNOMBRES,
XAPELLIDOS,
XEDAD,
XSEXO,
XESTADOCIVIL,
XDIRECCION,
XTELEFONO,
XCORREO,
XDESCRIPCION,
NOW());

COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `INS_PRODUCTO` (IN `XCOD_TIP_PRODUCTO` INT, IN `XNOMBRE_PRODUCTO` VARCHAR(100), IN `XPRECIO` FLOAT, IN `XFOTOGRAFIA` VARCHAR(120), IN `XVIDA_UTIL` VARCHAR(200), IN `XDESCRIPCION` VARCHAR(200), IN `XPRE_PRODUCTO` VARCHAR(100), IN `XFEC_CADUCIDAD` DATE)  BEGIN
   START TRANSACTION;

   INSERT INTO IN_PRODUCTO(COD_TIP_PRODUCTO,
                           NOMBRE_PRODUCTO,
                           PRECIO,
                           FOTOGRAFIA,
                           VIDA_UTIL,
                           DESCRIPCION,
                           PRE_PRODUCTO,
                           FEC_CADUCIDAD)
   VALUES (XCOD_TIP_PRODUCTO,
           XNOMBRE_PRODUCTO,
           XPRECIO,
           XFOTOGRAFIA,
           XVIDA_UTIL,
           XDESCRIPCION,
           XPRE_PRODUCTO,
           XFEC_CADUCIDAD);
           
    
   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `INS_TIPO_PRODUCTO` (IN `XTIP_PRODUCTO` ENUM('F','S','P','T'), IN `XDES_TIP_PRODUCTO` VARCHAR(255))  BEGIN
   START TRANSACTION;

   INSERT INTO IN_TIPO_PRODUCTO(TIP_PRODUCTO,DES_TIP_PRODUCTO)
   VALUES (XTIP_PRODUCTO, XDES_TIP_PRODUCTO);

   
   COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `IN_ROLES` (IN `ID_ROLES` BIGINT, IN `ADMINISTRADOR` VARCHAR(225), IN `VENDEDOR` VARCHAR(225), IN `INSTRUCTOR` VARCHAR(225))  BEGIN 
START TRANSACTION;
INSERT INTO ROLES (ID_ROLES,
ADMINISTRADOR,
VENDEDOR,
INSTRUCTOR)
VALUES
(ID_ROLES,
 ADMINISTRADOR,
 VENDEDOR,
INSTRUCTOR);
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `IN_TALLER` (IN `_COD_TALLER` BIGINT, IN `_NOMBRE_TALLER` VARCHAR(50), IN `_HORARIO` DATE, IN `_FECHA_INICIO` DATE, IN `_FECHA_FINAL` DATE, IN `_DESCRIPCION` VARCHAR(100))  BEGIN 
START TRANSACTION;
INSERT INTO TALLER (COD_TALLER,
NOMBRE_TALLER,
HORARIO,
FECHA_INICIO,
FECHA_FINAL,
DESCRIPCION)
VALUES
(_COD_TALLER,
_NOMBRE_TALLER,
_HORARIO,
_FECHA_INICIO,
_FECHA_FINAL,
_DESCRIPCION);
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `IN_USUARIO` (IN `ID_USUARIO` BIGINT, IN `NOMBRE_USUARIO` VARCHAR(225), IN `CORREO` VARCHAR(225), IN `CONTRASEÃ‘A` VARCHAR(225))  BEGIN 
START TRANSACTION;
INSERT INTO USUARIO (ID_USUARIO,
NOMBRE_USUARIO,
CORREO,
CONTRASEÃ‘A)
VALUES
(ID_USUARIO,
 NOMBRE_USUARIO,
 CORREO,
CONTRASEÃ‘A);
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `in_venta` (IN `_Cod_Inventario` BIGINT, IN `_Cod_Tipo_descuento` INT(10), IN `_Cod_Historial_venta` INT(10), IN `_Cod_Metodo_pago` BIGINT, IN `_Cantidad` INT(10), IN `_Precio` FLOAT(10), IN `_ISV` FLOAT(10), IN `_Fecha_Emicion` DATE)  begin 
START TRANSACTION;
INSERT INTO venta (Cod_Inventario, 
Cod_Tipo_descuento, 
Cod_Historial_venta,
Cod_Metodo_pago,
Cantidad,
Precio,
ISV,
Fecha_Emicion) 
values 
(_Cod_Inventario, 
_Cod_Tipo_descuento ,
_Cod_Historial_venta ,
_Cod_Metodo_pago ,
_Cantidad ,
_Precio,
_ISV ,
_Fecha_Emicion 
);
COMMIT;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `MET_PAGO` (IN `_Efectivo` VARCHAR(20), `Tarjeata_Credito` VARCHAR(20), `transferencia` VARCHAR(20))  BEGIN
START TRANSACTION;
 INSERT INTO metodo_pago(Efectivo
 ,Tarjeata_Credito ,transferencia) VALUES (_Efectivo,Tarjeata_Credito,transferencia);
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `MOSTRAR_EMPLEADO` (IN `XCOD_EMPLEADO` BIGINT)  BEGIN
SELECT * FROM PE_EMPLEADO
where COD_EMPLEADO = XCOD_EMPLEADO;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `MOSTRAR_HISTORIAL` (IN `Â´SCod_historial_VÂ´` INT)  BEGIN
   SELECT *
   FROM historial_ventas
   WHERE Cod_historial_V = SCod_historial_V;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `MOSTRAR_PEOPLE` (IN `XCOD_PERSONA` INT)  BEGIN
   SELECT *
   FROM PE_PERSONA
   WHERE COD_PERSONA = XCOD_PERSONA;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `MOSTRAR_PRODUCTO` (IN `XCOD_PRODUCTO` INT)  BEGIN
   SELECT *
   FROM in_producto
   WHERE COD_PRODUCTO = XCOD_PRODUCTO;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `MOSTRAR_PRODUCTOS` ()  BEGIN
   SELECT * FROM in_producto;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `MOSTRAR_ROLES` (IN `XID_ROLES` INT)  BEGIN
   SELECT *
   FROM ROLES
   WHERE ID_ROLES = XID_ROLES;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `MOSTRAR_TIPOS_PRODUCTO` (IN `XCOD_TIP_PRODUCTO` INT)  BEGIN
   SELECT a.COD_TIP_PRODUCTO, a.TIP_PRODUCTO, count(b.COD_TIP_PRODUCTO) as CANTIDAD, a.DES_TIP_PRODUCTO
   FROM in_tipo_producto a, in_producto b
   WHERE a.COD_TIP_PRODUCTO = XCOD_TIP_PRODUCTO and a.COD_TIP_PRODUCTO = b.COD_TIP_PRODUCTO
   GROUP BY b.COD_TIP_PRODUCTO;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `MOSTRAR_TIPOS_PRODUCTOS` ()  BEGIN
   SELECT a.COD_TIP_PRODUCTO, a.TIP_PRODUCTO, count(b.COD_TIP_PRODUCTO) as CANTIDAD, a.DES_TIP_PRODUCTO
   FROM in_tipo_producto a, in_producto b
   WHERE a.COD_TIP_PRODUCTO = b.COD_TIP_PRODUCTO
   GROUP BY b.COD_TIP_PRODUCTO;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `MOSTRAR_TODASPERSONA` ()  BEGIN
   SELECT *
   FROM PE_PERSONA;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `MOSTRAR_TODO_HISTORIAL` ()  BEGIN
   SELECT *
   FROM historial_ventas;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `MOSTRAR_USUARIO` (IN `XID_USUARIO` INT)  BEGIN
   SELECT *
   FROM USUARIO
   WHERE ID_USUARIO = XID_USUARIO;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SELALL_COD_QR` ()  BEGIN
 START TRANSACTION;
 /*###################################*/
 
   SELECT * FROM `ap_codigo_qr`;
     
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SELALL_PLANTA` ()  BEGIN
 START TRANSACTION;
 /*###################################*/
 
   SELECT * FROM `ap_plantas`;
     
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SEL_COD_QR` (IN `XCOD_QR` BIGINT)  BEGIN
 START TRANSACTION;
 /*###################################*/
 
   SELECT * FROM `ap_codigo_qr` WHERE COD_QR = `XCOD_QR`;
     
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SEL_PLANTA` (IN `XCOD_PLANTA` BIGINT)  BEGIN
 START TRANSACTION;
 /*###################################*/
 
   SELECT * FROM `ap_plantas` WHERE COD_PLANTA = `XCOD_PLANTA`;
     
COMMIT;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ap_codigo_qr`
--

CREATE TABLE `ap_codigo_qr` (
  `COD_QR` bigint(20) NOT NULL COMMENT 'LLAVE PRIMARIA DE LA TABLA CODIGO QR',
  `SEQ_QR` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'SECUENCIA DEL CODIGO QR',
  `USR_REGISTRO` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'USUARIO QUE HIZO EL REGISTRO DEL CODIGO QR',
  `FEC_REGISTRO` datetime NOT NULL COMMENT 'FECHA EN QUE REGISTRO EL CODIGO QR '
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ap_plantas`
--

CREATE TABLE `ap_plantas` (
  `COD_PLANTA` bigint(20) NOT NULL COMMENT 'LLAVE PRIMARIA DE LA TABLA PLANTAS',
  `NOM_PLANTA` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'NOMBRE DE LA PLANTA A ESCANEAR',
  `NOM_CIENTIFICO` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'NOMBRE CIENTIFICO DE LA PLANTA',
  `CLASE` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'VIDA UTIL DE LA PLANTA',
  `FAMILIA` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'FAMILIA DE LA PLANTA EN CUESTION',
  `ESPECIE` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'ESPECIE DE LA PLANTA',
  `DES_PLANTA` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION DE LA PLANTA',
  `FEC_REGISTRO` datetime NOT NULL COMMENT 'FECHA EN SE INGRESO AL SISTEMA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `ap_plantas`
--

INSERT INTO `ap_plantas` (`COD_PLANTA`, `NOM_PLANTA`, `NOM_CIENTIFICO`, `CLASE`, `FAMILIA`, `ESPECIE`, `DES_PLANTA`, `FEC_REGISTRO`) VALUES
(1, 'Sabila', 'jhhjh', '', 'jhj', 'njjk', 'mb', '2021-11-24 06:29:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ap_rel_qr_planta`
--

CREATE TABLE `ap_rel_qr_planta` (
  `COD_REL_QR_PLANTA` bigint(20) NOT NULL COMMENT 'LLAVE PRIMARIA DE LA TABLA RELACION QR-PLANTA',
  `COD_QR` bigint(20) DEFAULT NULL COMMENT 'LLAVE FORANEA DE LA TABLA CODIGO QR',
  `COD_PLANTA` bigint(20) DEFAULT NULL COMMENT 'LLAVE FORANEA DE LA TABLA CODIGO QR',
  `COD_PRODUCTO` int(100) DEFAULT NULL COMMENT 'LLAVE FORANEA DE LA TABLA TIPO DE PRODUCTO',
  `FEC_ADD` datetime DEFAULT NULL COMMENT 'FECHA EN QUE SE REGISTRO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_ventas`
--

CREATE TABLE `historial_ventas` (
  `Cod_historial_V` int(10) NOT NULL,
  `Cod_Ventas` bigint(20) DEFAULT NULL,
  `total` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `in_inventario`
--

CREATE TABLE `in_inventario` (
  `COD_INVENTARIO` bigint(20) NOT NULL COMMENT 'LLAVE PRIMARIA DE LA TABLA',
  `COD_PRODUCTO` int(10) NOT NULL COMMENT 'LLAVE FORANEA DE LA TABLA',
  `CAN_EXISTENCIA` int(10) NOT NULL COMMENT 'TOTAL DE PRODUCTO EN INVENTARIO',
  `FEC_INTRODUCCION` date NOT NULL COMMENT 'FECHA QUE INGRESO PRODUCTO A LA BASE DE DATOS',
  `FEC_MODIFICACION` date NOT NULL COMMENT 'FECHA QUE SE REALIZO UN CAMBIO EN EL PRODUCTO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='PERTENECE AL MODULO INVENTARIO';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `in_producto`
--

CREATE TABLE `in_producto` (
  `COD_PRODUCTO` int(10) NOT NULL COMMENT 'LLAVE PRIMARIA',
  `COD_TIP_PRODUCTO` int(10) NOT NULL COMMENT 'LLAVE FORANEA DE LA TABLA',
  `NOMBRE_PRODUCTO` varchar(100) CHARACTER SET utf16 NOT NULL COMMENT 'NOMBRE COMUN DEL PRODUCTO',
  `PRECIO` float NOT NULL COMMENT 'PRECIO DE VENTA DEL PRODUCTO',
  `FOTOGRAFIA` varchar(120) CHARACTER SET utf16 NOT NULL COMMENT 'IMAGEN PARA INDENTIFICAR EL PRODUCTO',
  `VIDA_UTIL` varchar(200) CHARACTER SET utf16 NOT NULL COMMENT 'TIEMPO QUE PERMANECE EN BUEN ESTADO EL PRODUCTO',
  `DESCRIPCION` varchar(200) CHARACTER SET utf16 NOT NULL COMMENT 'INFORMACION DEL PRODUCTO',
  `PRE_PRODUCTO` varchar(100) CHARACTER SET utf16 NOT NULL COMMENT 'PRESENTACION DEL PRODUCTO DATOS ESENCIALES',
  `FEC_CADUCIDAD` date NOT NULL COMMENT 'VENCIMIENTO DEL PRODUCTO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `in_producto`
--

INSERT INTO `in_producto` (`COD_PRODUCTO`, `COD_TIP_PRODUCTO`, `NOMBRE_PRODUCTO`, `PRECIO`, `FOTOGRAFIA`, `VIDA_UTIL`, `DESCRIPCION`, `PRE_PRODUCTO`, `FEC_CADUCIDAD`) VALUES
(2, 1, 'Pera', 12, 'imagen', '10 dias', 'ning', 'jajaj', '2021-11-27'),
(6, 1, 'Manzana', 12, 'manza.jpg', '12 dias', 'Ning', 'nan', '2021-12-14'),
(7, 1, 'Mandarina', 10, 'mandarina.jpg', '10 dias', 'ning', 'nnn', '2021-12-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `in_tipo_producto`
--

CREATE TABLE `in_tipo_producto` (
  `COD_TIP_PRODUCTO` int(100) NOT NULL COMMENT 'LLAVE PRIMARIA DE LA TABLA',
  `TIP_PRODUCTO` enum('F','S','P','T') COLLATE utf8_unicode_ci NOT NULL COMMENT 'TIPO DE PRODUCTO DENTRO DE LA FINCA(FRUTOS, SEMILLAS, PLANTAS, TUBERCULOS)',
  `DES_TIP_PRODUCTO` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'DETALLE DEL TIPO PRODUCTO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='PERTENECE AL MODULO INVENTARIO';

--
-- Volcado de datos para la tabla `in_tipo_producto`
--

INSERT INTO `in_tipo_producto` (`COD_TIP_PRODUCTO`, `TIP_PRODUCTO`, `DES_TIP_PRODUCTO`) VALUES
(1, 'F', 'rojo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

CREATE TABLE `metodo_pago` (
  `Cod_metodo_pago` bigint(20) NOT NULL,
  `Efectivo` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Tarjeata_Credito` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `transferencia` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pe_empleado`
--

CREATE TABLE `pe_empleado` (
  `COD_EMPLEADO` bigint(20) NOT NULL,
  `DESIGNACION` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `SUELDO` int(50) NOT NULL,
  `DIRECCION` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `CONTACTO` int(30) NOT NULL,
  `FEC_INICIO` date NOT NULL,
  `FEC_INGRESO` datetime NOT NULL,
  `DNI` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `NOMBRES` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `APELLIDOS` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `pe_empleado`
--

INSERT INTO `pe_empleado` (`COD_EMPLEADO`, `DESIGNACION`, `SUELDO`, `DIRECCION`, `CONTACTO`, `FEC_INICIO`, `FEC_INGRESO`, `DNI`, `NOMBRES`, `APELLIDOS`) VALUES
(17, 'Vendedor', 5000, 'Col. La Rosa', 99087890, '2021-12-16', '2021-12-04 18:18:19', '0998199078764', 'Juan', 'Perez'),
(18, 'Vendedor', 5000, 'Aldea Agua Dulce', 99870098, '2021-10-01', '2021-12-04 18:31:06', '1702199089009', 'Denis', 'Argueta'),
(19, 'Vendedor', 3500, 'Aldea Los Mangos', 99872415, '2021-09-06', '2021-12-04 18:42:03', '0903199087009', 'Denia', 'Molina'),
(20, 'Admin', 8000, 'Aldea Cordoncillo', 99085678, '2020-07-01', '2021-12-04 19:11:45', '0801198098078', 'Mateo', 'Gomez '),
(21, 'Vendedor', 5000, 'Aldea Cordoncillo', 99087654, '2021-03-01', '2021-12-04 19:38:14', '0603', 'Estaban', 'Macoton');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pe_persona`
--

CREATE TABLE `pe_persona` (
  `COD_PERSONA` bigint(50) NOT NULL,
  `DNI` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `NOMBRES` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `APELLIDOS` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `EDAD` tinyint(4) NOT NULL,
  `SEXO` enum('F','M') COLLATE utf8_unicode_ci NOT NULL,
  `ESTADOCIVIL` enum('S','C','D','UL','V') COLLATE utf8_unicode_ci NOT NULL,
  `DIRECCION` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `TELEFONO` int(50) NOT NULL,
  `CORREO` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `FEC_INGRESO` datetime NOT NULL,
  `DESCRIPCION` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `pe_persona`
--

INSERT INTO `pe_persona` (`COD_PERSONA`, `DNI`, `NOMBRES`, `APELLIDOS`, `EDAD`, `SEXO`, `ESTADOCIVIL`, `DIRECCION`, `TELEFONO`, `CORREO`, `FEC_INGRESO`, `DESCRIPCION`) VALUES
(36, '0801199815605', 'Patricia', 'Ferrufino', 23, 'F', 'S', 'Col. Arturo Quezada', 99808076, 'pfegu@gmail.com', '2021-12-04 17:50:28', 'Ning'),
(37, '1702197900185', 'Karla', 'Gutierrez', 34, 'F', 'D', 'Col. Lomas', 98303117, 'karlag@gmail.com', '2021-12-04 18:08:20', 'Maestra'),
(38, '0901198026789', 'Cesia', 'Lopez', 24, 'F', 'S', 'Col. La Ronda', 99085454, 'ceslo@gmail.com', '2021-12-04 18:10:00', 'Ning'),
(39, '1501198567908', 'Alex', 'Perez  ', 31, 'M', 'C', 'Col. La Hacienda', 99002320, 'alexpp@gmail.com', '2021-12-04 19:09:01', 'Ning'),
(40, '080119800017', 'Carlos', 'Baquedano Leveron', 26, 'M', 'C', 'Col. Kennedy', 98007654, 'carlos-leve9@gmail.com', '2021-12-04 19:39:00', 'Ning'),
(41, '0901199499087', 'Lina', 'Corrales', 29, 'F', 'C', 'Aldea Las Paredes', 99202627, 'linac@gmail.com', '2021-12-04 18:39:37', 'Ning');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rel_pago_ve`
--

CREATE TABLE `rel_pago_ve` (
  `COD_pago_me` bigint(20) NOT NULL,
  `COD_VENTAS` bigint(20) DEFAULT NULL,
  `Cod_metodo_pago` bigint(20) DEFAULT NULL,
  `fecha_pago` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rel_usuario_rol`
--

CREATE TABLE `rel_usuario_rol` (
  `COD_REL_USUROL` bigint(20) NOT NULL,
  `ID_USUARIO` bigint(20) DEFAULT NULL,
  `ID_ROLES` bigint(20) DEFAULT NULL,
  `USUARIO_ADD` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `FEC_INGRESO` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_roles`
--

CREATE TABLE `rol_roles` (
  `ID_ROLES` bigint(20) NOT NULL COMMENT 'LLAVE PRIMARIA DE LA TABLA',
  `ADMINISTRADOR` varchar(225) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ADMINISTRADORES DEL SISTEMA',
  `VENDEDOR` varchar(225) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'VENDEDOR DE LA EMPRESA',
  `CAPACITADOR` varchar(225) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'PROFESORES ASIGNADOS A IMPARTIR LAS CAPACITACIONES'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usu_usuario`
--

CREATE TABLE `usu_usuario` (
  `ID_USUARIO` bigint(20) NOT NULL COMMENT 'LLAVE PRIMARIA DE LA TABLA',
  `NOM_USUARIO` varchar(225) COLLATE utf8_unicode_ci NOT NULL COMMENT ' NOMBRE DE USUARIO',
  `CORREO` varchar(225) COLLATE utf8_unicode_ci NOT NULL COMMENT 'CORREO DE LA PERSONA',
  `CONTRASEÃƒâ€˜A` varchar(225) COLLATE utf8_unicode_ci NOT NULL COMMENT 'CONTRASEÃƒâ€˜A DEL CORREO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `Cod_Ventas` bigint(20) NOT NULL,
  `Cod_Inventario` bigint(20) DEFAULT NULL,
  `Cod_Tipo_descuento` int(10) DEFAULT NULL,
  `Cod_Historial_venta` int(10) DEFAULT NULL,
  `Cod_Metodo_pago` bigint(20) DEFAULT NULL,
  `Cantidad` int(10) DEFAULT NULL,
  `Precio` float DEFAULT NULL,
  `ISV` float DEFAULT NULL,
  `Fecha_Emicion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ap_codigo_qr`
--
ALTER TABLE `ap_codigo_qr`
  ADD PRIMARY KEY (`COD_QR`);

--
-- Indices de la tabla `ap_plantas`
--
ALTER TABLE `ap_plantas`
  ADD PRIMARY KEY (`COD_PLANTA`);

--
-- Indices de la tabla `ap_rel_qr_planta`
--
ALTER TABLE `ap_rel_qr_planta`
  ADD PRIMARY KEY (`COD_REL_QR_PLANTA`),
  ADD KEY `FK_REL_QR_PLANTA` (`COD_QR`),
  ADD KEY `FK_REL_PLANTA_QR` (`COD_PLANTA`),
  ADD KEY `FK_REL_TIP_PLANTA` (`COD_PRODUCTO`);

--
-- Indices de la tabla `historial_ventas`
--
ALTER TABLE `historial_ventas`
  ADD PRIMARY KEY (`Cod_historial_V`),
  ADD KEY `FK_historial_ventas` (`Cod_Ventas`);

--
-- Indices de la tabla `in_inventario`
--
ALTER TABLE `in_inventario`
  ADD PRIMARY KEY (`COD_INVENTARIO`),
  ADD KEY `f_inv_prod` (`COD_PRODUCTO`);

--
-- Indices de la tabla `in_producto`
--
ALTER TABLE `in_producto`
  ADD PRIMARY KEY (`COD_PRODUCTO`),
  ADD KEY `f_producto_tprod` (`COD_TIP_PRODUCTO`);

--
-- Indices de la tabla `in_tipo_producto`
--
ALTER TABLE `in_tipo_producto`
  ADD PRIMARY KEY (`COD_TIP_PRODUCTO`);

--
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD PRIMARY KEY (`Cod_metodo_pago`);

--
-- Indices de la tabla `pe_empleado`
--
ALTER TABLE `pe_empleado`
  ADD PRIMARY KEY (`COD_EMPLEADO`);

--
-- Indices de la tabla `pe_persona`
--
ALTER TABLE `pe_persona`
  ADD PRIMARY KEY (`COD_PERSONA`);

--
-- Indices de la tabla `rel_pago_ve`
--
ALTER TABLE `rel_pago_ve`
  ADD PRIMARY KEY (`COD_pago_me`),
  ADD KEY ` REL_venta_VEN` (`COD_VENTAS`),
  ADD KEY ` REL_pago_v` (`Cod_metodo_pago`);

--
-- Indices de la tabla `rel_usuario_rol`
--
ALTER TABLE `rel_usuario_rol`
  ADD PRIMARY KEY (`COD_REL_USUROL`),
  ADD KEY `FK_REL_USUARIO_ROLES` (`ID_USUARIO`),
  ADD KEY `FK_REL_ROLES_USUARIO` (`ID_ROLES`);

--
-- Indices de la tabla `rol_roles`
--
ALTER TABLE `rol_roles`
  ADD PRIMARY KEY (`ID_ROLES`);

--
-- Indices de la tabla `usu_usuario`
--
ALTER TABLE `usu_usuario`
  ADD PRIMARY KEY (`ID_USUARIO`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`Cod_Ventas`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ap_codigo_qr`
--
ALTER TABLE `ap_codigo_qr`
  MODIFY `COD_QR` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'LLAVE PRIMARIA DE LA TABLA CODIGO QR';

--
-- AUTO_INCREMENT de la tabla `ap_plantas`
--
ALTER TABLE `ap_plantas`
  MODIFY `COD_PLANTA` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'LLAVE PRIMARIA DE LA TABLA PLANTAS', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ap_rel_qr_planta`
--
ALTER TABLE `ap_rel_qr_planta`
  MODIFY `COD_REL_QR_PLANTA` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'LLAVE PRIMARIA DE LA TABLA RELACION QR-PLANTA';

--
-- AUTO_INCREMENT de la tabla `historial_ventas`
--
ALTER TABLE `historial_ventas`
  MODIFY `Cod_historial_V` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `in_inventario`
--
ALTER TABLE `in_inventario`
  MODIFY `COD_INVENTARIO` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'LLAVE PRIMARIA DE LA TABLA', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `in_producto`
--
ALTER TABLE `in_producto`
  MODIFY `COD_PRODUCTO` int(10) NOT NULL AUTO_INCREMENT COMMENT 'LLAVE PRIMARIA', AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `in_tipo_producto`
--
ALTER TABLE `in_tipo_producto`
  MODIFY `COD_TIP_PRODUCTO` int(100) NOT NULL AUTO_INCREMENT COMMENT 'LLAVE PRIMARIA DE LA TABLA', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  MODIFY `Cod_metodo_pago` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pe_empleado`
--
ALTER TABLE `pe_empleado`
  MODIFY `COD_EMPLEADO` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `pe_persona`
--
ALTER TABLE `pe_persona`
  MODIFY `COD_PERSONA` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `rel_pago_ve`
--
ALTER TABLE `rel_pago_ve`
  MODIFY `COD_pago_me` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rel_usuario_rol`
--
ALTER TABLE `rel_usuario_rol`
  MODIFY `COD_REL_USUROL` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol_roles`
--
ALTER TABLE `rol_roles`
  MODIFY `ID_ROLES` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'LLAVE PRIMARIA DE LA TABLA';

--
-- AUTO_INCREMENT de la tabla `usu_usuario`
--
ALTER TABLE `usu_usuario`
  MODIFY `ID_USUARIO` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'LLAVE PRIMARIA DE LA TABLA';

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `Cod_Ventas` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ap_rel_qr_planta`
--
ALTER TABLE `ap_rel_qr_planta`
  ADD CONSTRAINT `FK_REL_PLANTA_QR` FOREIGN KEY (`COD_PLANTA`) REFERENCES `ap_plantas` (`COD_PLANTA`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_REL_PRODUCTO_PLANTA` FOREIGN KEY (`COD_PRODUCTO`) REFERENCES `in_producto` (`COD_PRODUCTO`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_REL_QR_PLANTA` FOREIGN KEY (`COD_QR`) REFERENCES `ap_codigo_qr` (`COD_QR`) ON DELETE CASCADE;

--
-- Filtros para la tabla `historial_ventas`
--
ALTER TABLE `historial_ventas`
  ADD CONSTRAINT `FK_historial_ventas` FOREIGN KEY (`Cod_Ventas`) REFERENCES `venta` (`Cod_Ventas`) ON DELETE CASCADE;

--
-- Filtros para la tabla `in_inventario`
--
ALTER TABLE `in_inventario`
  ADD CONSTRAINT `f_inv_prod` FOREIGN KEY (`COD_PRODUCTO`) REFERENCES `in_producto` (`COD_PRODUCTO`);

--
-- Filtros para la tabla `in_producto`
--
ALTER TABLE `in_producto`
  ADD CONSTRAINT `f_producto_tprod` FOREIGN KEY (`COD_TIP_PRODUCTO`) REFERENCES `in_tipo_producto` (`COD_TIP_PRODUCTO`);

--
-- Filtros para la tabla `rel_pago_ve`
--
ALTER TABLE `rel_pago_ve`
  ADD CONSTRAINT ` REL_pago_v` FOREIGN KEY (`Cod_metodo_pago`) REFERENCES `metodo_pago` (`Cod_metodo_pago`) ON DELETE CASCADE,
  ADD CONSTRAINT ` REL_venta_VEN` FOREIGN KEY (`COD_VENTAS`) REFERENCES `venta` (`Cod_Ventas`) ON DELETE CASCADE;

--
-- Filtros para la tabla `rel_usuario_rol`
--
ALTER TABLE `rel_usuario_rol`
  ADD CONSTRAINT `FK_REL_ROLES_USUARIO` FOREIGN KEY (`ID_ROLES`) REFERENCES `rol_roles` (`ID_ROLES`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_REL_USUARIO_ROLES` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usu_usuario` (`ID_USUARIO`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
