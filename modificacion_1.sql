-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-01-2023 a las 19:24:01
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
-- Estructura de tabla para la tabla `tbcostos_productos`
--

CREATE TABLE `tbcostos_productos` (
  `idCosto` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `fkProducto` int(11) NOT NULL,
  `ganancia_porc` double DEFAULT 0,
  `total` double DEFAULT 0,
  `neto` double DEFAULT 0,
  `raciones` int(11) DEFAULT 0,
  `tasa` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbcostos_productos`
--
ALTER TABLE `tbcostos_productos`
  ADD PRIMARY KEY (`idCosto`),
  ADD KEY `fkProducto` (`fkProducto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbcostos_productos`
--
ALTER TABLE `tbcostos_productos`
  MODIFY `idCosto` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

ALTER TABLE `tbcostos_productos` ADD `precio_venta` DOUBLE NULL AFTER `tasa`;

ALTER TABLE bd_hostienda.tbgastos_productos DROP FOREIGN KEY tbgastos_productos_ibfk_1;

ALTER TABLE `tbgastos_productos` CHANGE `fkProducto` `fkCosto` INT(11) NOT NULL;

ALTER TABLE `tbgastos_productos` ADD FOREIGN KEY (`fkCosto`) REFERENCES `tbcostos_productos`(`idCosto`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tbcostos_productos` ADD FOREIGN KEY (`fkProducto`) REFERENCES `tbproductos`(`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO `tbcostos_productos` (`idCosto`, `fecha`, `fkProducto`, `ganancia_porc`, `total`, `neto`, `raciones`, `tasa`, `precio_venta`) VALUES (NULL, '2023-01-25', '8', '10', '10', '10', '1', '10', NULL), (NULL, '2023-01-24', '4', '0', '0', '0', '0', '0', '0');