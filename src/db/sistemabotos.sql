-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-10-2022 a las 05:14:43
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
(25, 'siceColinas1@gmail.com', '$2b$10$MHW.LRCDnehEyPWgBGR/6uMdACJQ3CWW5mdTZRfQ1J4G2drtWa722', NULL, NULL);

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
(22222, 'https://res.cloudinary.com/dkqp3wkbi/image/upload/v1665015529/votos/ijeylbp3rfpkpon001hr.png', 'votos/ijeylbp3rfpkpon001hr', 'German', 'Adsi', '7777777', 'Activo', 0, 4),
(123456, 'https://res.cloudinary.com/dkqp3wkbi/image/upload/v1665063688/votos/s8xqmsk8ts3o2ywxizo4.png', 'votos/s8xqmsk8ts3o2ywxizo4', 'cratus', 'Adsi', '111111', 'Activo', 0, 4),
(888888, NULL, NULL, 'German', 'Adsi', '7777777', 'Activo', 0, 4),
(999999, 'https://res.cloudinary.com/dkqp3wkbi/image/upload/v1665016218/votos/xzg3scbhlmtyyjgt0qri.gif', 'votos/xzg3scbhlmtyyjgt0qri', 'German', 'Adsi', '7777777', 'Activo', 0, 4),
(1234564, 'https://res.cloudinary.com/dkqp3wkbi/image/upload/v1665063779/votos/xl5gwwfkddreiqs1bnsd.png', 'votos/xl5gwwfkddreiqs1bnsd', 'cratus', 'Adsi', '111111', 'Activo', 0, 4),
(2334243, 'wwwwwwwww', 'wwwwwwww', 'newwwww', 'ooooooo', '334', 'Activo', 0, 5),
(2345677, 'https://res.cloudinary.com/dkqp3wkbi/image/upload/v1665064027/votos/zfqjzyyqksa257dhe85a.png', 'votos/zfqjzyyqksa257dhe85a', 'cratus', 'Adsi', '111111', 'Activo', 0, 4),
(2469181, 'https://res.cloudinary.com/dkqp3wkbi/image/upload/v1665057904/votos/xrt2evupxyf52xz5sr21.jpg', 'votos/xrt2evupxyf52xz5sr21', 'German', 'Adsi', '7777777', 'Activo', 0, 4),
(22222228, '', '', 'German', 'Adsi', '7777777', 'Activo', 0, 4),
(23456776, 'https://res.cloudinary.com/dkqp3wkbi/image/upload/v1665064076/votos/v7bxzwsonkxaxk6dz0nz.png', 'votos/v7bxzwsonkxaxk6dz0nz', 'cratus', 'Adsi', '111111', 'Activo', 0, 4),
(246918119, 'https://res.cloudinary.com/dkqp3wkbi/image/upload/v1665059937/votos/j3ola9sgklyn5tjbpcvq.png', 'votos/j3ola9sgklyn5tjbpcvq', 'cratus', 'Adsi', '111111', 'Activo', 0, 4),
(1005090348, 'url_imagen', 'id_imagen', 'Estevan jajja', 'adsi', '2469281', 'Activo', 3, 4),
(2222334243, 'wwwwwwwww', 'wwwwwwww', 'newwwww', 'ooooooo', '334', 'Activo', 0, 5),
(2345677655, 'https://res.cloudinary.com/dkqp3wkbi/image/upload/v1665099772/votos/cvsqqmexirijql6i38fj.png', 'votos/cvsqqmexirijql6i38fj', 'cratus', 'Adsi', '111111', 'Activo', 0, 4);

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
(4, 'primera convocatoria', 'new post Eleccion', 'Activo', 24, '2022-10-06'),
(5, 'segunda convocatoria', 'new post Eleccion', 'Activo', 24, '2022-01-01'),
(6, 'tttttt', 'guyi', 'Activo', 24, '2022-10-06');

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
-- Volcado de datos para la tabla `votantes`
--

INSERT INTO `votantes` (`id`, `documento`, `nombresApellidos`, `programaFormacion`, `fichaPrograma`, `emitioVoto`, `estado`, `documento1`, `idEleccion2`) VALUES
(1, 1005090349, 'ana maria', 'Enfermeria', '2455488', 'Si', 'Inactivo', 1005090348, 4),
(2, 556565, 'jose', 'Enfermeria', '2455488', 'Si', 'Inactivo', 1005090348, 5),
(3, 67676, 'jose', 'Enfermeria', '2455488', 'Si', 'Inactivo', 1005090348, 5),
(4, 45456, 'ana maria', 'Enfermeria', '2455488', 'No', 'Activo', NULL, 4),
(5, 756767, 'jose', 'Enfermeria', '2455488', 'No', 'Activo', NULL, 5),
(6, 5765675, 'ana maria', 'Enfermeria', '2455488', 'No', 'Activo', NULL, 4),
(7, 87878, 'ana maria', 'Enfermeria', '2455488', 'No', 'Activo', NULL, 4),
(8, 7676, 'Esteban gonzales', 'Talento humano', '2455488', 'No', 'Activo', NULL, 5),
(9, 76767, 'ana maria', 'Enfermeria', '2455488', 'No', 'Activo', NULL, 4);

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
  MODIFY `idAdmin` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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
