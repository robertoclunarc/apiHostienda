-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-01-2023 a las 02:08:40
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_hostienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbcompradores`
--

CREATE TABLE `tbcompradores` (
  `idComprador` int(11) NOT NULL,
  `nombreComprador` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `tlfComprador` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `direccionComprador` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `rifComprador` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ultimaCompra` datetime NOT NULL DEFAULT current_timestamp(),
  `estatusComprador` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbdetallespedidos`
--

CREATE TABLE `tbdetallespedidos` (
  `idDetPedido` int(11) NOT NULL,
  `fkPedido` int(11) NOT NULL,
  `fkProducto` int(11) DEFAULT NULL,
  `fkMaterial` int(11) DEFAULT NULL,
  `cantidad` double NOT NULL,
  `unidad` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `estatusDetPedido` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbdetalles_compras`
--

CREATE TABLE `tbdetalles_compras` (
  `fkcompra` int(11) NOT NULL,
  `idDetCompra` int(11) NOT NULL,
  `fkMateriaPrima` int(11) NOT NULL,
  `cantidad` double NOT NULL,
  `unidad` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `precioUnitario` double NOT NULL,
  `subtotal` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbdetalles_compras`
--

INSERT INTO `tbdetalles_compras` (`fkcompra`, `idDetCompra`, `fkMateriaPrima`, `cantidad`, `unidad`, `precioUnitario`, `subtotal`) VALUES
(2, 3, 2, 1, 'Kg', 10, 10),
(9, 4, 2, 2, 'Kg', 1.3, 2.6),
(9, 5, 3, 1, 'Kg', 1.2, 1.2),
(9, 6, 6, 2, 'Gr', 1.2, 2.4),
(10, 7, 6, 250, 'UND', 1.2, 1.2),
(10, 8, 5, 2, 'UND', 3, 3),
(1, 9, 1, 1, 'Kg', 3, 3),
(1, 10, 2, 1, 'Kg', 2, 2),
(1, 11, 5, 1, 'Kg', 1.2, 1.2),
(11, 12, 1, 2, 'Kg', 5.52, 11.04),
(11, 13, 4, 1, 'Kg', 1, 1),
(12, 14, 5, 150, 'Gr', 2, 2),
(12, 15, 1, 2, 'Kg', 5.52, 11.04),
(13, 20, 5, 1, 'Kg', 1, 1),
(13, 21, 6, 300, 'Gr', 2, 2),
(14, 22, 3, 30, 'UND', 5.1, 5.1),
(15, 23, 2, 2, 'Kg', 2, 4),
(23, 24, 2, 1, 'Gr', 2, 2),
(23, 25, 7, 1, 'Gr', 1, 1),
(24, 26, 1, 1, 'Gr', 1, 1),
(25, 28, 4, 1, 'Gr', 1, 1),
(26, 30, 6, 1, 'Gr', 1, 1),
(28, 33, 2, 1, 'Ml', 1, 1),
(29, 35, 10, 1, 'Kg', 1, 1),
(29, 36, 1, 1, 'Kg', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbdetalles_productos`
--

CREATE TABLE `tbdetalles_productos` (
  `idDetProducto` int(11) NOT NULL,
  `fkProducto` int(11) NOT NULL,
  `fkMateria` int(11) NOT NULL,
  `cantidad` double NOT NULL,
  `unidad` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `precio` double NOT NULL,
  `moneda` varchar(5) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbdetalles_productos`
--

INSERT INTO `tbdetalles_productos` (`idDetProducto`, `fkProducto`, `fkMateria`, `cantidad`, `unidad`, `precio`, `moneda`) VALUES
(1, 4, 1, 1, 'Kg', 0, ''),
(2, 4, 2, 1, 'Kg', 0, ''),
(3, 2, 6, 10, 'Gr', 0, ''),
(4, 2, 4, 1, 'UND', 0, ''),
(5, 10, 3, 1, 'UND', 5.1, 'Bs'),
(6, 10, 4, 1, 'Gr', 1, 'Bs'),
(7, 10, 2, 1, 'Kg', 1, 'Bs');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbdetalles_ventas`
--

CREATE TABLE `tbdetalles_ventas` (
  `idDetVenta` int(11) NOT NULL,
  `fkVenta` int(11) NOT NULL,
  `fkProducto` int(11) NOT NULL,
  `cantidad` double NOT NULL,
  `unidad` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `precioUnitario` double NOT NULL,
  `subtotal` double NOT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbempresas`
--

CREATE TABLE `tbempresas` (
  `idEmpresa` int(11) NOT NULL,
  `nombreEmpresa` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `direccionEmpresa` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `tlfEmpresa` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `rifEmpresa` varchar(15) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `contactoEmpresa` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `emailEmpresa` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `logo` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbempresas`
--

INSERT INTO `tbempresas` (`idEmpresa`, `nombreEmpresa`, `direccionEmpresa`, `tlfEmpresa`, `rifEmpresa`, `contactoEmpresa`, `emailEmpresa`, `logo`) VALUES
(1, 'Dulces Carlotina', 'Puerto Ordaz', NULL, 'V18039590', 'Carla Astudillo', '@dulcescarlotina', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbgastos_productos`
--

CREATE TABLE `tbgastos_productos` (
  `idgasto` int(11) NOT NULL,
  `descripcion_gasto` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `fkProducto` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `fkmoneda` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbinventarios_materiales`
--

CREATE TABLE `tbinventarios_materiales` (
  `idInventario` int(11) NOT NULL,
  `fkMateriaPrima` int(11) NOT NULL,
  `cantidad` double NOT NULL,
  `cantidadAcumulada` double NOT NULL DEFAULT 0,
  `unidad` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `precio1` double DEFAULT NULL,
  `fkMonedaPrecio1` int(11) NOT NULL,
  `precio2` double DEFAULT NULL,
  `fkMonedaPrecio2` int(11) NOT NULL,
  `fksucursal` int(11) NOT NULL,
  `ubicacionA` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ubicacionB` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `loginCrea` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `fechaCrea` datetime NOT NULL DEFAULT current_timestamp(),
  `loginActualiza` varchar(15) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fechaActualiza` datetime DEFAULT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbinventarios_materiales`
--

INSERT INTO `tbinventarios_materiales` (`idInventario`, `fkMateriaPrima`, `cantidad`, `cantidadAcumulada`, `unidad`, `precio1`, `fkMonedaPrecio1`, `precio2`, `fkMonedaPrecio2`, `fksucursal`, `ubicacionA`, `ubicacionB`, `loginCrea`, `fechaCrea`, `loginActualiza`, `fechaActualiza`, `estatus`) VALUES
(1, 1, 1, 2, 'Kg', 1, 2, NULL, 0, 1, NULL, NULL, 'rlunar', '2022-03-05 00:00:00', 'rlunar', '2022-07-12 18:58:26', 'ACTIVO'),
(2, 5, 1, -1, 'Kg', 1, 2, NULL, 0, 1, NULL, NULL, 'rlunar', '2022-03-05 00:00:00', NULL, NULL, 'ACTIVO'),
(3, 3, 3, 36, 'UND', 5.1, 2, NULL, 0, 1, NULL, NULL, 'rlunar', '2022-03-05 00:00:00', 'rlunar', '2022-03-05 00:00:00', 'ACTIVO'),
(4, 4, 3, 0, 'Kg', 3.4, 2, NULL, 0, 1, NULL, NULL, 'rlunar', '2022-03-05 00:00:00', NULL, NULL, 'ACTIVO'),
(5, 4, 3, 0, 'Kg', 3.4, 2, NULL, 0, 1, NULL, NULL, 'rlunar', '2022-03-05 00:00:00', NULL, NULL, 'ACTIVO'),
(12, 6, 1, 0, 'Gr', 1, 2, NULL, 0, 1, NULL, NULL, 'rlunar', '2022-03-05 00:00:00', 'rlunar', '2022-07-10 20:01:00', 'ACTIVO'),
(13, 2, 2, 2, 'Kg', 2, 2, NULL, 0, 1, NULL, NULL, 'rlunar', '2022-03-05 00:00:00', NULL, NULL, 'ACTIVO'),
(14, 2, 1, 1, 'Gr', 2, 1, NULL, 0, 1, NULL, NULL, 'rlunar', '2022-07-10 19:38:57', NULL, NULL, 'ACTIVO'),
(15, 7, 1, 1, 'Gr', 1, 1, NULL, 0, 1, NULL, NULL, 'rlunar', '2022-07-10 19:38:57', NULL, NULL, 'ACTIVO'),
(19, 4, 1, 1, 'Gr', 1, 1, NULL, 0, 1, NULL, NULL, 'rlunar', '2022-07-10 19:52:43', NULL, NULL, 'ACTIVO'),
(23, 2, 1, 1, 'Ml', 1, 2, NULL, 0, 1, NULL, NULL, 'rlunar', '2022-07-10 20:16:32', NULL, NULL, 'ACTIVO'),
(25, 10, 1, 1, 'Kg', 1, 1, NULL, 0, 1, NULL, NULL, 'rlunar', '2022-07-12 18:58:26', NULL, NULL, 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbinventarios_productos`
--

CREATE TABLE `tbinventarios_productos` (
  `idInventario` int(11) NOT NULL,
  `fkProducto` int(11) NOT NULL,
  `cantidad` double NOT NULL,
  `unidad` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `precio1` double DEFAULT NULL,
  `precio2` double DEFAULT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO',
  `ubicacionA` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ubicacionB` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `logincrea` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `fechaCrea` datetime NOT NULL DEFAULT current_timestamp(),
  `loginActualiza` varchar(15) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fechaActualiza` datetime DEFAULT NULL,
  `fkSucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblparametros_grales`
--

CREATE TABLE `tblparametros_grales` (
  `idParametro` int(11) NOT NULL,
  `iva` double DEFAULT NULL,
  `fechaAct` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tblparametros_grales`
--

INSERT INTO `tblparametros_grales` (`idParametro`, `iva`, `fechaAct`) VALUES
(1, 16, '2022-02-27 11:48:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbmateriales_comprados`
--

CREATE TABLE `tbmateriales_comprados` (
  `idCompra` int(11) NOT NULL,
  `fechaCompra` datetime NOT NULL DEFAULT current_timestamp(),
  `tasaDia` double NOT NULL,
  `fkMoneda` int(11) NOT NULL,
  `subtotal` double NOT NULL,
  `iva` double DEFAULT 0,
  `montoIva` double DEFAULT 0,
  `neto` double NOT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO',
  `idProveedor` int(11) NOT NULL,
  `loginCrea` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `fkSucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbmateriales_comprados`
--

INSERT INTO `tbmateriales_comprados` (`idCompra`, `fechaCompra`, `tasaDia`, `fkMoneda`, `subtotal`, `iva`, `montoIva`, `neto`, `estatus`, `idProveedor`, `loginCrea`, `fkSucursal`) VALUES
(1, '2022-01-22 00:00:00', 4.7, 1, 6.2, 0, 0, 6.2, 'ACTIVO', 1, 'rlunar', 1),
(2, '2022-01-22 11:57:30', 4.7, 1, 3, 0, 0, 3, 'ACTIVO', 1, 'rlunar', 1),
(4, '2022-02-28 00:00:00', 4.6, 1, 17.02, 16, 1.77, 18.79, 'ACTIVO', 1, 'rlunar', 1),
(5, '2022-02-28 00:00:00', 4.6, 2, 2.4, 16, 0.19, 2.59, 'ACTIVO', 2, 'rlunar', 1),
(6, '2022-02-28 00:00:00', 4.6, 2, 2.5, 16, 0.19, 2.69, 'ACTIVO', 2, 'rlunar', 1),
(7, '2022-02-28 00:00:00', 4.6, 2, 302.4, 16, 48.38, 350.78, 'ACTIVO', 2, 'rlunar', 1),
(8, '2022-02-28 00:00:00', 4.6, 2, 9.42, 16, 0.88, 10.3, 'ACTIVO', 2, 'rlunar', 1),
(9, '2022-02-28 00:00:00', 4.6, 2, 6.2, 16, 0.38, 6.58, 'ACTIVO', 2, 'rlunar', 1),
(10, '2022-03-01 00:00:00', 4.6, 2, 4.2, 16, 0.67, 4.87, 'ACTIVO', 2, 'rlunar', 1),
(11, '2022-03-05 00:00:00', 4.6, 1, 12.04, 16, 1.77, 13.81, 'ACTIVO', 1, 'rlunar', 1),
(12, '2022-03-05 00:00:00', 4.6, 1, 13.04, 16, 2.09, 15.13, 'ACTIVO', 2, 'rlunar', 1),
(13, '2022-03-05 00:00:00', 4.6, 2, 3, 16, 0.32, 3.32, 'ACTIVO', 2, 'rlunar', 1),
(14, '2022-03-05 00:00:00', 4.4, 2, 5.1, 16, 0, 5.1, 'ACTIVO', 1, 'rlunar', 1),
(15, '2022-03-05 00:00:00', 4.6, 2, 4, 16, 0, 4, 'ACTIVO', 1, 'rlunar', 1),
(16, '2022-07-10 00:00:00', 5.8, 1, 13.6, 16, 0, 13.6, 'ACTIVO', 1, 'rlunar', 1),
(17, '2022-07-10 00:00:00', 5.8, 1, 2, 16, 0, 2, 'ACTIVO', 2, 'rlunar', 1),
(18, '2022-07-10 00:00:00', 5.8, 2, 2, 16, 0, 2, 'ACTIVO', 2, 'rlunar', 1),
(19, '2022-07-10 00:00:00', 5.8, 1, 1, 16, 0, 1, 'ACTIVO', 1, 'rlunar', 1),
(20, '2022-07-10 00:00:00', 5.8, 1, 4, 16, 0, 4, 'ACTIVO', 2, 'rlunar', 1),
(21, '2022-07-10 00:00:00', 5.8, 1, 33.58, 16, 0.32, 33.9, 'ACTIVO', 1, 'rlunar', 1),
(22, '2022-07-10 00:00:00', 5.8, 1, 5, 16, 0.16, 5.16, 'ACTIVO', 1, 'rlunar', 1),
(23, '2022-07-10 00:00:00', 5.8, 1, 3, 16, 0, 3, 'ACTIVO', 1, 'rlunar', 1),
(24, '2022-07-10 00:00:00', 5.8, 1, 2, 16, 0.16, 2.16, 'ACTIVO', 1, 'rlunar', 1),
(25, '2022-07-10 00:00:00', 5.8, 1, 2, 16, 0, 2, 'ACTIVO', 1, 'rlunar', 1),
(26, '2022-07-10 00:00:00', 5.8, 1, 2, 16, 0, 2, 'ACTIVO', 1, 'rlunar', 1),
(27, '2022-07-10 00:00:00', 5.8, 1, 3, 16, 0, 3, 'ACTIVO', 1, 'rlunar', 1),
(28, '2022-07-10 00:00:00', 5.8, 2, 2, 16, 0, 2, 'ACTIVO', 1, 'rlunar', 1),
(29, '2022-07-12 00:00:00', 5.8, 1, 2, 16, 0.16, 2.16, 'ACTIVO', 1, 'rlunar', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbmateria_prima`
--

CREATE TABLE `tbmateria_prima` (
  `idMateriaPrima` int(11) NOT NULL,
  `descripcion` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `marca` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `retieneIva` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbmateria_prima`
--

INSERT INTO `tbmateria_prima` (`idMateriaPrima`, `descripcion`, `marca`, `retieneIva`) VALUES
(1, 'Azucar 1kg', 'Montalban', 1),
(2, 'Harina de trigo 1Kg', 'Dona Maria', 0),
(3, 'Huevos', '.', 0),
(4, 'Mantequilla 1Kg', 'Mavesa', 0),
(5, 'Chocolate en Barra', 'Savoy', 1),
(6, 'Cacao', '.', 1),
(7, 'manteca', 'los tres cochinitos', 0),
(8, 'manteca', 'QWE', 0),
(9, 'lache', 'don bom', 0),
(10, 'sal', 'de mar', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbmonedas`
--

CREATE TABLE `tbmonedas` (
  `idMoneda` int(11) NOT NULL,
  `descripcionMoneda` varchar(25) COLLATE utf8_spanish2_ci NOT NULL,
  `abrevMoneda` varchar(5) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `tipoMoneda` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'Extrangera'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbmonedas`
--

INSERT INTO `tbmonedas` (`idMoneda`, `descripcionMoneda`, `abrevMoneda`, `tipoMoneda`) VALUES
(1, 'Bolivares', 'Bs', 'Local'),
(2, 'Dolar', '$', 'Extrangera');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbpedidos`
--

CREATE TABLE `tbpedidos` (
  `idPedido` int(11) NOT NULL,
  `fechaPedido` int(11) NOT NULL,
  `idVentaAsociada` int(11) DEFAULT NULL,
  `idCompraAsociada` int(11) DEFAULT NULL,
  `idProveedor` int(11) DEFAULT NULL,
  `idComprador` int(11) DEFAULT NULL,
  `tipoPedido` varchar(7) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ENTRADA' COMMENT 'tipo: ENTRADA=proviene proveedor. SALIDA=dirigida a un comprador',
  `estatusPedido` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO',
  `loginCrea` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `fkSucursal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbpedidos_asociados`
--

CREATE TABLE `tbpedidos_asociados` (
  `idAsociado` int(11) NOT NULL,
  `fkVenta` int(11) DEFAULT NULL,
  `fkPedido` int(11) NOT NULL,
  `fkMaterialesComprados` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbprecios`
--

CREATE TABLE `tbprecios` (
  `idPrecio` int(11) NOT NULL,
  `fkMaterial` int(11) DEFAULT NULL,
  `fkProducto` int(11) DEFAULT NULL,
  `Precio` double NOT NULL,
  `fkMoneda` int(11) NOT NULL,
  `fechaPrecio` datetime NOT NULL DEFAULT current_timestamp(),
  `tipo` varchar(10) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbprecios`
--

INSERT INTO `tbprecios` (`idPrecio`, `fkMaterial`, `fkProducto`, `Precio`, `fkMoneda`, `fechaPrecio`, `tipo`) VALUES
(1, 1, NULL, 1.2, 1, '2022-02-27 13:10:12', 'MATERIAL'),
(2, 2, NULL, 1.3, 1, '2022-02-27 13:10:12', 'MATERIAL'),
(3, 3, NULL, 5.1, 1, '2022-03-05 00:00:00', 'MATERIAL'),
(4, 2, NULL, 2, 1, '2022-03-05 00:00:00', 'MATERIAL'),
(5, 2, NULL, 2, 1, '2022-07-10 19:38:57', 'MATERIAL'),
(6, 7, NULL, 1, 1, '2022-07-10 19:38:57', 'MATERIAL'),
(7, 1, NULL, 1, 1, '2022-07-10 19:39:40', 'MATERIAL'),
(9, 4, NULL, 1, 1, '2022-07-10 19:52:43', 'MATERIAL'),
(11, 6, NULL, 1, 1, '2022-07-10 20:01:00', 'MATERIAL'),
(14, 2, NULL, 1, 1, '2022-07-10 20:16:31', 'MATERIAL'),
(17, 1, NULL, 1, 1, '2022-07-12 18:58:26', 'MATERIAL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbproductos`
--

CREATE TABLE `tbproductos` (
  `idProducto` int(11) NOT NULL,
  `descripcionProducto` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `marcaProducto` varchar(900) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `retieneIva_prod` tinyint(1) NOT NULL,
  `iva` double DEFAULT NULL,
  `montoIva` double DEFAULT NULL,
  `precio` double NOT NULL,
  `tasaDiaProd` double DEFAULT NULL,
  `fkMoneda` int(11) NOT NULL,
  `fechaProduccion` datetime DEFAULT current_timestamp(),
  `imagenProducto` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fkSucursal` int(11) NOT NULL,
  `loginCrea` varchar(10) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbproductos`
--

INSERT INTO `tbproductos` (`idProducto`, `descripcionProducto`, `marcaProducto`, `retieneIva_prod`, `iva`, `montoIva`, `precio`, `tasaDiaProd`, `fkMoneda`, `fechaProduccion`, `imagenProducto`, `fkSucursal`, `loginCrea`) VALUES
(1, 'Cheetos', NULL, 0, NULL, NULL, 10, NULL, 1, '2022-03-19 14:20:10', NULL, 1, 'rlunar'),
(2, 'Torta de chocolate', NULL, 0, NULL, NULL, 9, NULL, 2, '2022-03-19 14:20:10', NULL, 1, 'rlunar'),
(3, 'Chupeta', NULL, 0, NULL, NULL, 13, NULL, 1, '2022-03-19 14:20:59', NULL, 1, 'rlunar'),
(4, 'Torta burrera', NULL, 0, NULL, NULL, 15, NULL, 2, '2022-03-19 14:20:59', NULL, 1, 'rlunar'),
(5, 'marqueza de chocolate', 'dulcescarlotina', 0, 16, 2, 2, 19.27, 1, '2023-01-14 00:00:00', NULL, 1, 'rlunar'),
(6, 'marqueza de chocolate', 'dulcescarlotina', 0, 16, 0, 3, 19.27, 2, '2023-01-15 00:00:00', NULL, 1, 'rlunar'),
(7, 'marqueza de chocolate', 'dulcescarlotina', 0, 16, 1, 4, 15.27, 2, '2023-01-15 00:00:00', NULL, 1, 'rlunar'),
(8, 'marqueza de chocolate', 'dulcescarlotina', 0, 16, 0.48, 3, 2, 1, '2023-01-21 00:00:00', NULL, 1, 'rlunar'),
(9, 'torta humeda', 'dulcescarlotina', 0, 16, 0.48, 3, 20, 1, '2023-01-21 00:00:00', NULL, 1, 'rlunar'),
(10, 'torta de chocolate', 'dulcescarlotina', 0, 16, 0.48, 3, 20, 1, '2023-01-21 00:00:00', NULL, 1, 'rlunar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbproveedores`
--

CREATE TABLE `tbproveedores` (
  `idProveedor` int(11) NOT NULL,
  `NombresProveedor` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `direccionProveedor` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbproveedores`
--

INSERT INTO `tbproveedores` (`idProveedor`, `NombresProveedor`, `direccionProveedor`, `estatus`) VALUES
(1, 'Bodeguita', 'en la esquina', 'ACTIVO'),
(2, 'Los chinos', 'en la otra calle de atras', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbsucursales`
--

CREATE TABLE `tbsucursales` (
  `idSucursal` int(11) NOT NULL,
  `nombreSucursal` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `rifSucursal` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `direccionSucursal` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `tlfSucursal` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `encargado` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `emailSucursal` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fkempresa` int(11) NOT NULL,
  `logoSucursal` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbsucursales`
--

INSERT INTO `tbsucursales` (`idSucursal`, `nombreSucursal`, `rifSucursal`, `direccionSucursal`, `tlfSucursal`, `encargado`, `emailSucursal`, `fkempresa`, `logoSucursal`) VALUES
(1, 'Dulces Carlotina', '', 'Puerto Ordaz', NULL, 'Carla Astudillo', '@dulcescarlotina', 1, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbtasas_cambios`
--

CREATE TABLE `tbtasas_cambios` (
  `idCambio` int(11) NOT NULL,
  `fechaCambio` datetime NOT NULL DEFAULT current_timestamp(),
  `tasaDia` double NOT NULL,
  `idMoneda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbunidades`
--

CREATE TABLE `tbunidades` (
  `idUnidad` int(11) NOT NULL,
  `descripcion` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `abreviado` varchar(5) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbunidades`
--

INSERT INTO `tbunidades` (`idUnidad`, `descripcion`, `abreviado`) VALUES
(1, 'Mililitros', 'Ml'),
(2, 'Gramos', 'Gr'),
(3, 'Unidad', 'UND'),
(4, 'Kilogramos', 'Kg'),
(5, 'Litro(s)', 'Lt');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbusuarios`
--

CREATE TABLE `tbusuarios` (
  `login` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `passw` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `nombres` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `cargo` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `nivel` int(11) DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `fksucursal` int(11) NOT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO',
  `imagen` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbusuarios`
--

INSERT INTO `tbusuarios` (`login`, `passw`, `nombres`, `cargo`, `nivel`, `email`, `fksucursal`, `estatus`, `imagen`) VALUES
('castudillo', '98765', 'Carla Astudillo', 'Repostera', 2, 'carlotinaderussia@gmail.com', 1, 'ACTIVO', NULL),
('rlunar', '12345', 'Roberto Lunar', 'Developer', 1, 'robertoclunag@gmail.com', 1, 'ACTIVO', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbventas`
--

CREATE TABLE `tbventas` (
  `idVenta` int(11) NOT NULL,
  `nroFactura` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fechaVenta` datetime NOT NULL DEFAULT current_timestamp(),
  `total` double NOT NULL,
  `iva` double NOT NULL,
  `montoIva` double NOT NULL,
  `tasaDia` double NOT NULL,
  `fkMoneda` int(11) NOT NULL,
  `neto` double NOT NULL,
  `comprador` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `direccionComprador` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `tlfComprador` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `loginCrea` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `fkSucursal` int(11) NOT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbcompradores`
--
ALTER TABLE `tbcompradores`
  ADD PRIMARY KEY (`idComprador`),
  ADD UNIQUE KEY `nombreComprador` (`nombreComprador`);

--
-- Indices de la tabla `tbdetallespedidos`
--
ALTER TABLE `tbdetallespedidos`
  ADD PRIMARY KEY (`idDetPedido`),
  ADD KEY `fkPedido` (`fkPedido`);

--
-- Indices de la tabla `tbdetalles_compras`
--
ALTER TABLE `tbdetalles_compras`
  ADD PRIMARY KEY (`idDetCompra`),
  ADD KEY `fkcompra` (`fkcompra`),
  ADD KEY `fkMateriaPrima` (`fkMateriaPrima`);

--
-- Indices de la tabla `tbdetalles_productos`
--
ALTER TABLE `tbdetalles_productos`
  ADD PRIMARY KEY (`idDetProducto`),
  ADD KEY `fkProducto` (`fkProducto`),
  ADD KEY `fkMateria` (`fkMateria`);

--
-- Indices de la tabla `tbdetalles_ventas`
--
ALTER TABLE `tbdetalles_ventas`
  ADD PRIMARY KEY (`idDetVenta`),
  ADD KEY `fkVenta` (`fkVenta`),
  ADD KEY `fkProducto` (`fkProducto`);

--
-- Indices de la tabla `tbempresas`
--
ALTER TABLE `tbempresas`
  ADD PRIMARY KEY (`idEmpresa`);

--
-- Indices de la tabla `tbgastos_productos`
--
ALTER TABLE `tbgastos_productos`
  ADD PRIMARY KEY (`idgasto`),
  ADD KEY `fkProducto` (`fkProducto`),
  ADD KEY `fkmoneda` (`fkmoneda`);

--
-- Indices de la tabla `tbinventarios_materiales`
--
ALTER TABLE `tbinventarios_materiales`
  ADD PRIMARY KEY (`idInventario`),
  ADD KEY `fksucursal` (`fksucursal`),
  ADD KEY `fkMateriaPrima` (`fkMateriaPrima`),
  ADD KEY `fkMonedaPrecio1` (`fkMonedaPrecio1`),
  ADD KEY `fkMonedaPrecio2` (`fkMonedaPrecio2`);

--
-- Indices de la tabla `tbinventarios_productos`
--
ALTER TABLE `tbinventarios_productos`
  ADD PRIMARY KEY (`idInventario`),
  ADD KEY `fkProducto` (`fkProducto`),
  ADD KEY `fkSucursal` (`fkSucursal`);

--
-- Indices de la tabla `tblparametros_grales`
--
ALTER TABLE `tblparametros_grales`
  ADD PRIMARY KEY (`idParametro`);

--
-- Indices de la tabla `tbmateriales_comprados`
--
ALTER TABLE `tbmateriales_comprados`
  ADD PRIMARY KEY (`idCompra`),
  ADD KEY `idProveedor` (`idProveedor`),
  ADD KEY `fkMoneda` (`fkMoneda`),
  ADD KEY `loginCrea` (`loginCrea`),
  ADD KEY `fkSucursal` (`fkSucursal`);

--
-- Indices de la tabla `tbmateria_prima`
--
ALTER TABLE `tbmateria_prima`
  ADD PRIMARY KEY (`idMateriaPrima`),
  ADD UNIQUE KEY `idMateriaPrima` (`idMateriaPrima`);

--
-- Indices de la tabla `tbmonedas`
--
ALTER TABLE `tbmonedas`
  ADD PRIMARY KEY (`idMoneda`);

--
-- Indices de la tabla `tbpedidos`
--
ALTER TABLE `tbpedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD UNIQUE KEY `idCompraAsociada` (`idCompraAsociada`),
  ADD KEY `idVentaAsociada` (`idVentaAsociada`),
  ADD KEY `idProveedor` (`idProveedor`),
  ADD KEY `idComprador` (`idComprador`),
  ADD KEY `loginCrea` (`loginCrea`),
  ADD KEY `idSucursal` (`fkSucursal`);

--
-- Indices de la tabla `tbpedidos_asociados`
--
ALTER TABLE `tbpedidos_asociados`
  ADD PRIMARY KEY (`idAsociado`),
  ADD KEY `fkVenta` (`fkVenta`),
  ADD KEY `fkPedido` (`fkPedido`),
  ADD KEY `fkMaterialesComprados` (`fkMaterialesComprados`);

--
-- Indices de la tabla `tbprecios`
--
ALTER TABLE `tbprecios`
  ADD PRIMARY KEY (`idPrecio`),
  ADD KEY `fkMoneda` (`fkMoneda`),
  ADD KEY `fkMaterial` (`fkMaterial`),
  ADD KEY `fkProducto` (`fkProducto`);

--
-- Indices de la tabla `tbproductos`
--
ALTER TABLE `tbproductos`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `fkSucursal` (`fkSucursal`),
  ADD KEY `fkModena` (`fkMoneda`);

--
-- Indices de la tabla `tbproveedores`
--
ALTER TABLE `tbproveedores`
  ADD PRIMARY KEY (`idProveedor`);

--
-- Indices de la tabla `tbsucursales`
--
ALTER TABLE `tbsucursales`
  ADD PRIMARY KEY (`idSucursal`),
  ADD KEY `fkempresa` (`fkempresa`);

--
-- Indices de la tabla `tbtasas_cambios`
--
ALTER TABLE `tbtasas_cambios`
  ADD PRIMARY KEY (`idCambio`),
  ADD KEY `idMoneda` (`idMoneda`);

--
-- Indices de la tabla `tbunidades`
--
ALTER TABLE `tbunidades`
  ADD PRIMARY KEY (`idUnidad`);

--
-- Indices de la tabla `tbusuarios`
--
ALTER TABLE `tbusuarios`
  ADD PRIMARY KEY (`login`),
  ADD KEY `fksucursal` (`fksucursal`);

--
-- Indices de la tabla `tbventas`
--
ALTER TABLE `tbventas`
  ADD PRIMARY KEY (`idVenta`),
  ADD KEY `nroFactura` (`nroFactura`),
  ADD KEY `fkMoneda` (`fkMoneda`),
  ADD KEY `loginCrea` (`loginCrea`),
  ADD KEY `fkSucursal` (`fkSucursal`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbcompradores`
--
ALTER TABLE `tbcompradores`
  MODIFY `idComprador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbdetallespedidos`
--
ALTER TABLE `tbdetallespedidos`
  MODIFY `idDetPedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbdetalles_compras`
--
ALTER TABLE `tbdetalles_compras`
  MODIFY `idDetCompra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `tbdetalles_productos`
--
ALTER TABLE `tbdetalles_productos`
  MODIFY `idDetProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tbdetalles_ventas`
--
ALTER TABLE `tbdetalles_ventas`
  MODIFY `idDetVenta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbempresas`
--
ALTER TABLE `tbempresas`
  MODIFY `idEmpresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbgastos_productos`
--
ALTER TABLE `tbgastos_productos`
  MODIFY `idgasto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbinventarios_materiales`
--
ALTER TABLE `tbinventarios_materiales`
  MODIFY `idInventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `tbinventarios_productos`
--
ALTER TABLE `tbinventarios_productos`
  MODIFY `idInventario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblparametros_grales`
--
ALTER TABLE `tblparametros_grales`
  MODIFY `idParametro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbmateriales_comprados`
--
ALTER TABLE `tbmateriales_comprados`
  MODIFY `idCompra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `tbmateria_prima`
--
ALTER TABLE `tbmateria_prima`
  MODIFY `idMateriaPrima` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tbmonedas`
--
ALTER TABLE `tbmonedas`
  MODIFY `idMoneda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbpedidos`
--
ALTER TABLE `tbpedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbpedidos_asociados`
--
ALTER TABLE `tbpedidos_asociados`
  MODIFY `idAsociado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbprecios`
--
ALTER TABLE `tbprecios`
  MODIFY `idPrecio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `tbproductos`
--
ALTER TABLE `tbproductos`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tbproveedores`
--
ALTER TABLE `tbproveedores`
  MODIFY `idProveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbsucursales`
--
ALTER TABLE `tbsucursales`
  MODIFY `idSucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbtasas_cambios`
--
ALTER TABLE `tbtasas_cambios`
  MODIFY `idCambio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbunidades`
--
ALTER TABLE `tbunidades`
  MODIFY `idUnidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbventas`
--
ALTER TABLE `tbventas`
  MODIFY `idVenta` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbdetallespedidos`
--
ALTER TABLE `tbdetallespedidos`
  ADD CONSTRAINT `tbdetallespedidos_ibfk_1` FOREIGN KEY (`fkPedido`) REFERENCES `tbpedidos` (`idPedido`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbdetalles_compras`
--
ALTER TABLE `tbdetalles_compras`
  ADD CONSTRAINT `tbdetalles_compras_ibfk_1` FOREIGN KEY (`fkcompra`) REFERENCES `tbmateriales_comprados` (`idCompra`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbdetalles_compras_ibfk_2` FOREIGN KEY (`fkMateriaPrima`) REFERENCES `tbmateria_prima` (`idMateriaPrima`);

--
-- Filtros para la tabla `tbdetalles_productos`
--
ALTER TABLE `tbdetalles_productos`
  ADD CONSTRAINT `tbdetalles_productos_ibfk_1` FOREIGN KEY (`fkProducto`) REFERENCES `tbproductos` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbdetalles_productos_ibfk_2` FOREIGN KEY (`fkMateria`) REFERENCES `tbmateria_prima` (`idMateriaPrima`);

--
-- Filtros para la tabla `tbdetalles_ventas`
--
ALTER TABLE `tbdetalles_ventas`
  ADD CONSTRAINT `tbdetalles_ventas_ibfk_1` FOREIGN KEY (`fkVenta`) REFERENCES `tbventas` (`idVenta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbdetalles_ventas_ibfk_2` FOREIGN KEY (`fkProducto`) REFERENCES `tbproductos` (`idProducto`);

--
-- Filtros para la tabla `tbgastos_productos`
--
ALTER TABLE `tbgastos_productos`
  ADD CONSTRAINT `tbgastos_productos_ibfk_1` FOREIGN KEY (`fkProducto`) REFERENCES `tbproductos` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbgastos_productos_ibfk_2` FOREIGN KEY (`fkmoneda`) REFERENCES `tbmonedas` (`idMoneda`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbinventarios_materiales`
--
ALTER TABLE `tbinventarios_materiales`
  ADD CONSTRAINT `tbinventarios_materiales_ibfk_1` FOREIGN KEY (`fkMateriaPrima`) REFERENCES `tbmateria_prima` (`idMateriaPrima`),
  ADD CONSTRAINT `tbinventarios_materiales_ibfk_2` FOREIGN KEY (`fksucursal`) REFERENCES `tbsucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbinventarios_productos`
--
ALTER TABLE `tbinventarios_productos`
  ADD CONSTRAINT `tbinventarios_productos_ibfk_1` FOREIGN KEY (`fkSucursal`) REFERENCES `tbsucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbinventarios_productos_ibfk_2` FOREIGN KEY (`fkProducto`) REFERENCES `tbproductos` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbmateriales_comprados`
--
ALTER TABLE `tbmateriales_comprados`
  ADD CONSTRAINT `tbmateriales_comprados_ibfk_1` FOREIGN KEY (`fkMoneda`) REFERENCES `tbmonedas` (`idMoneda`),
  ADD CONSTRAINT `tbmateriales_comprados_ibfk_2` FOREIGN KEY (`idProveedor`) REFERENCES `tbproveedores` (`idProveedor`),
  ADD CONSTRAINT `tbmateriales_comprados_ibfk_3` FOREIGN KEY (`fkSucursal`) REFERENCES `tbsucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbpedidos`
--
ALTER TABLE `tbpedidos`
  ADD CONSTRAINT `tbpedidos_ibfk_1` FOREIGN KEY (`fkSucursal`) REFERENCES `tbsucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbpedidos_asociados`
--
ALTER TABLE `tbpedidos_asociados`
  ADD CONSTRAINT `tbpedidos_asociados_ibfk_1` FOREIGN KEY (`fkPedido`) REFERENCES `tbpedidos` (`idPedido`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbsucursales`
--
ALTER TABLE `tbsucursales`
  ADD CONSTRAINT `tbsucursales_ibfk_1` FOREIGN KEY (`fkempresa`) REFERENCES `tbempresas` (`idEmpresa`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbtasas_cambios`
--
ALTER TABLE `tbtasas_cambios`
  ADD CONSTRAINT `tbtasas_cambios_ibfk_1` FOREIGN KEY (`idMoneda`) REFERENCES `tbmonedas` (`idMoneda`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbusuarios`
--
ALTER TABLE `tbusuarios`
  ADD CONSTRAINT `tbusuarios_ibfk_1` FOREIGN KEY (`fksucursal`) REFERENCES `tbsucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbventas`
--
ALTER TABLE `tbventas`
  ADD CONSTRAINT `tbventas_ibfk_1` FOREIGN KEY (`fkMoneda`) REFERENCES `tbmonedas` (`idMoneda`),
  ADD CONSTRAINT `tbventas_ibfk_2` FOREIGN KEY (`fkSucursal`) REFERENCES `tbsucursales` (`idSucursal`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
