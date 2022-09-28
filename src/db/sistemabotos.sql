-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-09-2022 a las 04:16:26
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `systembotos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `idAdmin` bigint(20) NOT NULL,
  `correo` text NOT NULL,
  `password` text NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `codeAuth` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`idAdmin`, `correo`, `password`, `nombre`, `codeAuth`) VALUES
(5, 'ospina@gmail.com', '$2b$10$cvvlsY8vjwom/eOPDL3VDuHC26akEnIct.Z4AYjBp8xIhGPiqM5Z2', NULL, NULL),
(6, 'ospina@gmail.com', '$2b$10$7CF66ksMs6ScRCOjo4C4Buhb1P9imVxOP6Gjzyuk72144gfuzomNu', NULL, NULL),
(7, '', '$2b$10$H6EzkxBLE3pPPm.LF7duguRwq5phdwawIycFGEnuf71S1J5Bv9DWS', NULL, NULL),
(8, 'ospina@gmail.com', '$2b$10$8JsA1vVgqvKP5YJLZFn7t..1mGH878o/D2j1pd/qJBWNckczFjuju', NULL, NULL),
(9, 'ospina@gmail.com', '$2b$10$T5pYvtxHrKSJP1xNR2QMxOs8hPABm43ku1h9Ec/ngiMCfs94zw.2W', NULL, NULL),
(10, 'ospina@gmail.com', '$2b$10$FJ3MATE/j0x1Yrzq4YOKSO5xwBS4zmzDKprjoN4K98MpnG9/Gt1TW', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `candidato`
--

CREATE TABLE `candidato` (
  `documento` bigint(20) NOT NULL,
  `imgUrl` text DEFAULT NULL,
  `imgId` text DEFAULT NULL,
  `nombreCandidato` varchar(30) NOT NULL,
  `programaFormacion` varchar(30) NOT NULL,
  `fichaPrograma` varchar(20) NOT NULL,
  `estado` set('Activo','Inactivo') DEFAULT NULL,
  `totalVotos` bigint(20) DEFAULT NULL,
  `idEleccion1` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elecciones`
--

CREATE TABLE `elecciones` (
  `idEleccion` bigint(20) NOT NULL,
  `descripcion` text NOT NULL,
  `cargo` varchar(70) NOT NULL,
  `fechaRegistro` date DEFAULT NULL,
  `estado` set('Activo','Inactivo') DEFAULT NULL,
  `idAdmin1` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `id_reporte` bigint(20) NOT NULL,
  `documento` bigint(20) DEFAULT NULL,
  `nombreApellido` text DEFAULT NULL,
  `programaFormacion` varchar(30) DEFAULT NULL,
  `fichaPrograma` varchar(20) DEFAULT NULL,
  `eleccionPostula` text DEFAULT NULL,
  `estado` text DEFAULT NULL,
  `candidatoGanador` varchar(20) DEFAULT NULL,
  `totalVotos` bigint(20) DEFAULT NULL,
  `documento2` bigint(20) DEFAULT NULL,
  `idEleccion3` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votantes`
--

CREATE TABLE `votantes` (
  `documento` bigint(20) NOT NULL,
  `nombres` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `programaFormacion` varchar(30) NOT NULL,
  `fichaPrograma` varchar(20) NOT NULL,
  `fechaRegistro` date NOT NULL DEFAULT current_timestamp(),
  `emitioVoto` set('Si','No') DEFAULT NULL,
  `documento1` bigint(20) DEFAULT NULL,
  `idEleccion2` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Indices de la tabla `candidato`
--
ALTER TABLE `candidato`
  ADD PRIMARY KEY (`documento`),
  ADD KEY `fk_candiElec` (`idEleccion1`);

--
-- Indices de la tabla `elecciones`
--
ALTER TABLE `elecciones`
  ADD PRIMARY KEY (`idEleccion`),
  ADD KEY `fk_eleAdmin` (`idAdmin1`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD PRIMARY KEY (`id_reporte`),
  ADD KEY `fk_reportCandi` (`documento2`),
  ADD KEY `fk_reportEle` (`idEleccion3`);

--
-- Indices de la tabla `votantes`
--
ALTER TABLE `votantes`
  ADD PRIMARY KEY (`documento`),
  ADD KEY `fk_votoCandi` (`documento1`),
  ADD KEY `fk_votoEle` (`idEleccion2`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `idAdmin` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `candidato`
--
ALTER TABLE `candidato`
  ADD CONSTRAINT `fk_candiElec` FOREIGN KEY (`idEleccion1`) REFERENCES `elecciones` (`idEleccion`);

--
-- Filtros para la tabla `elecciones`
--
ALTER TABLE `elecciones`
  ADD CONSTRAINT `fk_eleAdmin` FOREIGN KEY (`idAdmin1`) REFERENCES `admin` (`idAdmin`);

--
-- Filtros para la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD CONSTRAINT `fk_reportCandi` FOREIGN KEY (`documento2`) REFERENCES `candidato` (`documento`),
  ADD CONSTRAINT `fk_reportEle` FOREIGN KEY (`idEleccion3`) REFERENCES `elecciones` (`idEleccion`);

--
-- Filtros para la tabla `votantes`
--
ALTER TABLE `votantes`
  ADD CONSTRAINT `fk_votoCandi` FOREIGN KEY (`documento1`) REFERENCES `candidato` (`documento`),
  ADD CONSTRAINT `fk_votoEle` FOREIGN KEY (`idEleccion2`) REFERENCES `elecciones` (`idEleccion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
