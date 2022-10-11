-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-10-2022 a las 04:20:06
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
(12, 'ospina@gmail.com', '$2b$10$tEuz7alflK2WQpSE7x0jguAcclToU3NAHxsKcm.epTAStCqm1Lvt.', NULL, NULL),
(24, 'siceColinas@gmail.com', '$2b$10$/FWPDDw2a/oTP8kvIrGRMOat8uQKQeB18nW/H6MxbHzS1Wj3H8.V6', NULL, NULL),
(25, 'siceColinas1@gmail.com', '$2b$10$MHW.LRCDnehEyPWgBGR/6uMdACJQ3CWW5mdTZRfQ1J4G2drtWa722', NULL, NULL),
(26, 'daniel@gmail.com', '$2b$10$GthD7Ui4t7g7ToVpIHT1ZuOKsFaTtP2qyOt9W.6nc228JWvsoYiPy', NULL, NULL);

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

--
-- Volcado de datos para la tabla `candidato`
--

INSERT INTO `candidato` (`documento`, `imgUrl`, `imgId`, `nombreCandidato`, `programaFormacion`, `fichaPrograma`, `estado`, `totalVotos`, `idEleccion1`) VALUES
(1, 'rtfgrtgrghrt', NULL, 'Daniel', 'Adsi', '435456', 'Activo', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elecciones`
--

CREATE TABLE `elecciones` (
  `idEleccion` bigint(20) NOT NULL,
  `descripcion` text NOT NULL,
  `cargo` varchar(70) NOT NULL,
  `estado` set('Activo','Inactivo') DEFAULT NULL,
  `idAdmin1` bigint(20) DEFAULT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `elecciones`
--

INSERT INTO `elecciones` (`idEleccion`, `descripcion`, `cargo`, `estado`, `idAdmin1`, `fecha`) VALUES
(1, '2344', 'heloww word', 'Activo', 12, '2022-10-10'),
(2, 'tttttttttt', 'qqqqqqqqqqq', 'Activo', 26, '2022-10-10'),
(3, 'tttttttttt', 'qqqqqqqqqqq', 'Activo', 26, '2022-10-10'),
(4, 'primer eleccion', 'suministrar', 'Activo', NULL, '2022-10-10'),
(5, 'holaaaaaaaa', 'qqqqqqqqqqq', 'Activo', 26, '2022-10-10'),
(6, 'holaaaaaaaa', 'qqqqqqqqqqq', 'Activo', 26, '2022-10-10'),
(7, 'holaaaaaaaa', 'qqqqqqqqqqq', 'Activo', 26, '2022-10-10');

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
  `id` bigint(20) NOT NULL,
  `documento` int(11) NOT NULL,
  `nombresApellidos` varchar(150) NOT NULL,
  `programaFormacion` varchar(30) NOT NULL,
  `fichaPrograma` varchar(20) NOT NULL,
  `emitioVoto` set('Si','No') DEFAULT 'No',
  `estado` text NOT NULL DEFAULT 'Activo',
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
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_votoCandi` (`documento1`),
  ADD KEY `fk_votoEle` (`idEleccion2`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `idAdmin` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `candidato`
--
ALTER TABLE `candidato`
  MODIFY `documento` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `elecciones`
--
ALTER TABLE `elecciones`
  MODIFY `idEleccion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `reportes`
--
ALTER TABLE `reportes`
  MODIFY `id_reporte` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `votantes`
--
ALTER TABLE `votantes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `candidato`
--
ALTER TABLE `candidato`
  ADD CONSTRAINT `candeleccion` FOREIGN KEY (`idEleccion1`) REFERENCES `elecciones` (`idEleccion`);

--
-- Filtros para la tabla `elecciones`
--
ALTER TABLE `elecciones`
  ADD CONSTRAINT `adminelecion` FOREIGN KEY (`idAdmin1`) REFERENCES `admin` (`idAdmin`);

--
-- Filtros para la tabla `votantes`
--
ALTER TABLE `votantes`
  ADD CONSTRAINT `candidatoeleccion` FOREIGN KEY (`documento1`) REFERENCES `candidato` (`documento`),
  ADD CONSTRAINT `insertdatrs` FOREIGN KEY (`idEleccion2`) REFERENCES `elecciones` (`idEleccion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
