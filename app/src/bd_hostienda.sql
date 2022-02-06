-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 06-02-2022 a las 22:01:50
-- Versión del servidor: 8.0.27
-- Versión de PHP: 7.4.26

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

DROP TABLE IF EXISTS `tbcompradores`;
CREATE TABLE IF NOT EXISTS `tbcompradores` (
  `idComprador` int NOT NULL AUTO_INCREMENT,
  `nombreComprador` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `tlfComprador` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `direccionComprador` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `rifComprador` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ultimaCompra` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estatusComprador` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`idComprador`),
  UNIQUE KEY `nombreComprador` (`nombreComprador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbdetallespedidos`
--

DROP TABLE IF EXISTS `tbdetallespedidos`;
CREATE TABLE IF NOT EXISTS `tbdetallespedidos` (
  `idDetPedido` int NOT NULL AUTO_INCREMENT,
  `fkPedido` int NOT NULL,
  `fkProducto` int DEFAULT NULL,
  `fkMaterial` int DEFAULT NULL,
  `cantidad` double NOT NULL,
  `unidad` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `estatusDetPedido` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`idDetPedido`),
  KEY `fkPedido` (`fkPedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbdetalles_compras`
--

DROP TABLE IF EXISTS `tbdetalles_compras`;
CREATE TABLE IF NOT EXISTS `tbdetalles_compras` (
  `fkcompra` int NOT NULL,
  `idDetCompra` int NOT NULL AUTO_INCREMENT,
  `fkMateriaPrima` int NOT NULL,
  `cantidad` double NOT NULL,
  `unidad` varchar(5) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `precioUnitario` double NOT NULL,
  `subtotal` double NOT NULL,
  PRIMARY KEY (`idDetCompra`),
  KEY `fkcompra` (`fkcompra`),
  KEY `fkMateriaPrima` (`fkMateriaPrima`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbdetalles_compras`
--

INSERT INTO `tbdetalles_compras` (`fkcompra`, `idDetCompra`, `fkMateriaPrima`, `cantidad`, `unidad`, `precioUnitario`, `subtotal`) VALUES
(1, 1, 1, 1, 'Kg', 3, 3),
(1, 2, 2, 1, 'Kg', 2, 2),
(2, 3, 2, 1, 'Kg', 10, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbdetalles_ventas`
--

DROP TABLE IF EXISTS `tbdetalles_ventas`;
CREATE TABLE IF NOT EXISTS `tbdetalles_ventas` (
  `idDetVenta` int NOT NULL AUTO_INCREMENT,
  `fkVenta` int NOT NULL,
  `fkProducto` int NOT NULL,
  `cantidad` double NOT NULL,
  `unidad` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `precioUnitario` double NOT NULL,
  `subtotal` double NOT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`idDetVenta`),
  KEY `fkVenta` (`fkVenta`),
  KEY `fkProducto` (`fkProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbdetetalles_productos`
--

DROP TABLE IF EXISTS `tbdetetalles_productos`;
CREATE TABLE IF NOT EXISTS `tbdetetalles_productos` (
  `idDetProducto` int NOT NULL AUTO_INCREMENT,
  `fkProducto` int NOT NULL,
  `fkMateria` int NOT NULL,
  `cantidad` double NOT NULL,
  `unidad` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`idDetProducto`),
  KEY `fkProducto` (`fkProducto`),
  KEY `fkMateria` (`fkMateria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbempresas`
--

DROP TABLE IF EXISTS `tbempresas`;
CREATE TABLE IF NOT EXISTS `tbempresas` (
  `idEmpresa` int NOT NULL AUTO_INCREMENT,
  `nombreEmpresa` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `direccionEmpresa` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `tlfEmpresa` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `rifEmpresa` varchar(15) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `contactoEmpresa` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `emailEmpresa` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `logo` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idEmpresa`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbempresas`
--

INSERT INTO `tbempresas` (`idEmpresa`, `nombreEmpresa`, `direccionEmpresa`, `tlfEmpresa`, `rifEmpresa`, `contactoEmpresa`, `emailEmpresa`, `logo`) VALUES
(1, 'Dulces Carlotina', 'Puerto Ordaz', NULL, 'V18039590', 'Carla Astudillo', '@dulcescarlotina', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbinventarios_materiales`
--

DROP TABLE IF EXISTS `tbinventarios_materiales`;
CREATE TABLE IF NOT EXISTS `tbinventarios_materiales` (
  `idInventario` int NOT NULL AUTO_INCREMENT,
  `fkMateriaPrima` int NOT NULL,
  `cantidad` double NOT NULL,
  `unidad` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `precio1` double DEFAULT NULL,
  `precio2` double DEFAULT NULL,
  `fksucursal` int NOT NULL,
  `ubicacionA` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ubicacionB` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `loginCrea` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `fechaCrea` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `loginActualiza` varchar(15) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fechaActualiza` datetime DEFAULT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`idInventario`),
  KEY `fksucursal` (`fksucursal`),
  KEY `fkMateriaPrima` (`fkMateriaPrima`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbinventarios_productos`
--

DROP TABLE IF EXISTS `tbinventarios_productos`;
CREATE TABLE IF NOT EXISTS `tbinventarios_productos` (
  `idInventario` int NOT NULL AUTO_INCREMENT,
  `fkProducto` int NOT NULL,
  `cantidad` double NOT NULL,
  `unidad` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `precio1` double DEFAULT NULL,
  `precio2` double DEFAULT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO',
  `ubicacionA` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ubicacionB` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `logincrea` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `fechaCrea` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `loginActualiza` varchar(15) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fechaActualiza` datetime DEFAULT NULL,
  `fkSucursal` int NOT NULL,
  PRIMARY KEY (`idInventario`),
  KEY `fkProducto` (`fkProducto`),
  KEY `fkSucursal` (`fkSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbmateriales_comprados`
--

DROP TABLE IF EXISTS `tbmateriales_comprados`;
CREATE TABLE IF NOT EXISTS `tbmateriales_comprados` (
  `idCompra` int NOT NULL AUTO_INCREMENT,
  `fechaCompra` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tasaDia` double NOT NULL,
  `fkMoneda` int NOT NULL,
  `total` double NOT NULL,
  `subtotal` double NOT NULL,
  `iva` double DEFAULT '0',
  `montoIva` double DEFAULT '0',
  `neto` double NOT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO',
  `idProveedor` int NOT NULL,
  `loginCrea` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `fkSucursal` int NOT NULL,
  PRIMARY KEY (`idCompra`),
  KEY `idProveedor` (`idProveedor`),
  KEY `fkMoneda` (`fkMoneda`),
  KEY `loginCrea` (`loginCrea`),
  KEY `fkSucursal` (`fkSucursal`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbmateriales_comprados`
--

INSERT INTO `tbmateriales_comprados` (`idCompra`, `fechaCompra`, `tasaDia`, `fkMoneda`, `total`, `subtotal`, `iva`, `montoIva`, `neto`, `estatus`, `idProveedor`, `loginCrea`, `fkSucursal`) VALUES
(1, '2022-01-22 11:56:07', 4.7, 1, 5, 5, 0, 0, 5, 'ACTIVO', 1, 'rlunar', 1),
(2, '2022-01-22 11:57:30', 4.7, 1, 3, 3, 0, 0, 3, 'ACTIVO', 1, 'rlunar', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbmateria_prima`
--

DROP TABLE IF EXISTS `tbmateria_prima`;
CREATE TABLE IF NOT EXISTS `tbmateria_prima` (
  `idMateriaPrima` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  `marca` varchar(80) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`idMateriaPrima`),
  UNIQUE KEY `idMateriaPrima` (`idMateriaPrima`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbmateria_prima`
--

INSERT INTO `tbmateria_prima` (`idMateriaPrima`, `descripcion`, `marca`) VALUES
(1, 'Azucar 1kg', 'Montalban'),
(2, 'Harina de trigo 1Kg', 'Dona Maria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbmonedas`
--

DROP TABLE IF EXISTS `tbmonedas`;
CREATE TABLE IF NOT EXISTS `tbmonedas` (
  `idMoneda` int NOT NULL AUTO_INCREMENT,
  `descripcionMoneda` varchar(25) COLLATE utf8_spanish2_ci NOT NULL,
  `abrevMoneda` varchar(5) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `tipoMoneda` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'Extrangera',
  PRIMARY KEY (`idMoneda`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbmonedas`
--

INSERT INTO `tbmonedas` (`idMoneda`, `descripcionMoneda`, `abrevMoneda`, `tipoMoneda`) VALUES
(1, 'Bolivares Digitales', 'Bs.D', 'Local'),
(2, 'Dolar', '$', 'Extrangera');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbpedidos`
--

DROP TABLE IF EXISTS `tbpedidos`;
CREATE TABLE IF NOT EXISTS `tbpedidos` (
  `idPedido` int NOT NULL AUTO_INCREMENT,
  `fechaPedido` int NOT NULL,
  `idVentaAsociada` int DEFAULT NULL,
  `idCompraAsociada` int DEFAULT NULL,
  `idProveedor` int DEFAULT NULL,
  `idComprador` int DEFAULT NULL,
  `tipoPedido` varchar(7) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ENTRADA' COMMENT 'tipo: ENTRADA=proviene proveedor. SALIDA=dirigida a un comprador',
  `estatusPedido` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO',
  `loginCrea` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `fkSucursal` int NOT NULL,
  PRIMARY KEY (`idPedido`),
  UNIQUE KEY `idCompraAsociada` (`idCompraAsociada`),
  KEY `idVentaAsociada` (`idVentaAsociada`),
  KEY `idProveedor` (`idProveedor`),
  KEY `idComprador` (`idComprador`),
  KEY `loginCrea` (`loginCrea`),
  KEY `idSucursal` (`fkSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbpedidos_asociados`
--

DROP TABLE IF EXISTS `tbpedidos_asociados`;
CREATE TABLE IF NOT EXISTS `tbpedidos_asociados` (
  `idAsociado` int NOT NULL AUTO_INCREMENT,
  `fkVenta` int DEFAULT NULL,
  `fkPedido` int NOT NULL,
  `fkMaterialesComprados` int DEFAULT NULL,
  PRIMARY KEY (`idAsociado`),
  KEY `fkVenta` (`fkVenta`),
  KEY `fkPedido` (`fkPedido`),
  KEY `fkMaterialesComprados` (`fkMaterialesComprados`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbproductos`
--

DROP TABLE IF EXISTS `tbproductos`;
CREATE TABLE IF NOT EXISTS `tbproductos` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `descripcionProducto` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `fechaProduccion` datetime DEFAULT CURRENT_TIMESTAMP,
  `imagenProducto` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbproveerdores`
--

DROP TABLE IF EXISTS `tbproveerdores`;
CREATE TABLE IF NOT EXISTS `tbproveerdores` (
  `idProveedor` int NOT NULL AUTO_INCREMENT,
  `NombresProveedor` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `direccionProveedor` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`idProveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbproveerdores`
--

INSERT INTO `tbproveerdores` (`idProveedor`, `NombresProveedor`, `direccionProveedor`, `estatus`) VALUES
(1, 'Bodeguita', 'en la esquina', 'ACTIVO'),
(2, 'Los chinos', 'en la otra calle de atras', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbsucursales`
--

DROP TABLE IF EXISTS `tbsucursales`;
CREATE TABLE IF NOT EXISTS `tbsucursales` (
  `idSucursal` int NOT NULL AUTO_INCREMENT,
  `nombreSucursal` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `rifSucursal` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `direccionSucursal` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `tlfSucursal` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `encargado` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `emailSucursal` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fkempresa` int NOT NULL,
  `logoSucursal` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idSucursal`),
  KEY `fkempresa` (`fkempresa`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbsucursales`
--

INSERT INTO `tbsucursales` (`idSucursal`, `nombreSucursal`, `rifSucursal`, `direccionSucursal`, `tlfSucursal`, `encargado`, `emailSucursal`, `fkempresa`, `logoSucursal`) VALUES
(1, 'Dulces Carlotina', '', 'Puerto Ordaz', NULL, 'Carla Astudillo', '@dulcescarlotina', 1, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbtasas_cambios`
--

DROP TABLE IF EXISTS `tbtasas_cambios`;
CREATE TABLE IF NOT EXISTS `tbtasas_cambios` (
  `idCambio` int NOT NULL AUTO_INCREMENT,
  `fechaCambio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tasaDia` double NOT NULL,
  `idMoneda` int NOT NULL,
  PRIMARY KEY (`idCambio`),
  KEY `idMoneda` (`idMoneda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbunidades`
--

DROP TABLE IF EXISTS `tbunidades`;
CREATE TABLE IF NOT EXISTS `tbunidades` (
  `idUnidad` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `abreviado` varchar(5) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idUnidad`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tbunidades`
--

INSERT INTO `tbunidades` (`idUnidad`, `descripcion`, `abreviado`) VALUES
(1, 'Mililitros', 'ML'),
(2, 'Gramos', 'GM'),
(3, 'Unidad', 'UND'),
(4, 'Kilogramos', 'KG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbusuarios`
--

DROP TABLE IF EXISTS `tbusuarios`;
CREATE TABLE IF NOT EXISTS `tbusuarios` (
  `login` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `passw` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `nombres` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `cargo` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `nivel` int DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `fksucursal` int NOT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'ACTIVO',
  `imagen` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`login`),
  KEY `fksucursal` (`fksucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbventas`
--

DROP TABLE IF EXISTS `tbventas`;
CREATE TABLE IF NOT EXISTS `tbventas` (
  `idVenta` int NOT NULL AUTO_INCREMENT,
  `nroFactura` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fechaVenta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` double NOT NULL,
  `iva` double NOT NULL,
  `montoIva` double NOT NULL,
  `tasaDia` double NOT NULL,
  `fkMoneda` int NOT NULL,
  `neto` double NOT NULL,
  `comprador` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `direccionComprador` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `tlfComprador` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `loginCrea` varchar(15) COLLATE utf8_spanish2_ci NOT NULL,
  `fkSucursal` int NOT NULL,
  `estatus` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (`idVenta`),
  KEY `nroFactura` (`nroFactura`),
  KEY `fkMoneda` (`fkMoneda`),
  KEY `loginCrea` (`loginCrea`),
  KEY `fkSucursal` (`fkSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

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
-- Filtros para la tabla `tbdetalles_ventas`
--
ALTER TABLE `tbdetalles_ventas`
  ADD CONSTRAINT `tbdetalles_ventas_ibfk_1` FOREIGN KEY (`fkVenta`) REFERENCES `tbventas` (`idVenta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbdetalles_ventas_ibfk_2` FOREIGN KEY (`fkProducto`) REFERENCES `tbproductos` (`idProducto`);

--
-- Filtros para la tabla `tbdetetalles_productos`
--
ALTER TABLE `tbdetetalles_productos`
  ADD CONSTRAINT `tbdetetalles_productos_ibfk_1` FOREIGN KEY (`fkProducto`) REFERENCES `tbproductos` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbdetetalles_productos_ibfk_2` FOREIGN KEY (`fkMateria`) REFERENCES `tbmateria_prima` (`idMateriaPrima`);

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
  ADD CONSTRAINT `tbmateriales_comprados_ibfk_2` FOREIGN KEY (`idProveedor`) REFERENCES `tbproveerdores` (`idProveedor`),
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
