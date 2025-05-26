-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-05-2025 a las 18:17:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `roomies_test`
--
CREATE DATABASE IF NOT EXISTS `roomies_test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `roomies_test`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `Id_Administrador` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `Identificacion` varchar(20) NOT NULL,
  `Correo` varchar(255) NOT NULL,
  `Hash` char(64) NOT NULL,
  `Salt` char(64) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `Edad` tinyint(3) UNSIGNED NOT NULL,
  `Descripcion` text NOT NULL,
  `IsAvaible` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aplicacion`
--

CREATE TABLE `aplicacion` (
  `Id_Aplicacion` int(11) NOT NULL,
  `Estado` enum('pendiente','aceptada','rechazada','cancelada') NOT NULL DEFAULT 'pendiente',
  `Id_Estudiante` int(11) DEFAULT NULL,
  `Correo_Estudiante` varchar(255) NOT NULL,
  `Descripcion` varchar(2000) NOT NULL,
  `Id_Habitacion` int(11) DEFAULT NULL,
  `Fecha_Creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `Id_Estudiante` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `Identificacion` varchar(20) NOT NULL,
  `Correo` varchar(255) NOT NULL,
  `Hash` char(64) NOT NULL,
  `Salt` char(64) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `Edad` tinyint(3) UNSIGNED NOT NULL,
  `Descripcion` text NOT NULL,
  `IsAvaible` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `Id_Habitacion` int(11) NOT NULL,
  `Precio` bigint(20) NOT NULL,
  `Descripcion` text NOT NULL,
  `Requisitos` text NOT NULL,
  `Id_Admin` int(11) DEFAULT NULL,
  `Id_Unidad` int(11) DEFAULT NULL,
  `Img_url` varchar(255) DEFAULT NULL,
  `estado` enum('habilitado','deshabilitado','ocupado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `renta`
--

CREATE TABLE `renta` (
  `Id_Renta` int(11) NOT NULL,
  `Fecha_inicio` date NOT NULL,
  `Fecha_fin` date NOT NULL,
  `Id_Admin` int(11) NOT NULL,
  `Estado` enum('pendiente','rechazada_por_estudiante','aceptada','en_curso','finalizada','cancelada_por_admin','cancelada_por_estudiante') NOT NULL DEFAULT 'pendiente',
  `Id_Estudiante` int(11) NOT NULL,
  `Id_Habitacion` int(11) NOT NULL,
  `Monto_Renta` int(11) NOT NULL,
  `Estado_Pago` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reseña_estudiante`
--

CREATE TABLE `reseña_estudiante` (
  `Id_Reseña_Estudiante` int(11) NOT NULL,
  `Titulo` varchar(100) NOT NULL,
  `Descripcion` text NOT NULL,
  `Puntuacion` int(11) NOT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Id_Admin` int(11) DEFAULT NULL,
  `Id_Estudiante` int(11) NOT NULL,
  `Estado` enum('habilitado','deshabilitado') NOT NULL DEFAULT 'habilitado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reseña_habitacion`
--

CREATE TABLE `reseña_habitacion` (
  `Id_Reseña_Habitacion` int(11) NOT NULL,
  `Titulo` varchar(100) NOT NULL,
  `Puntuacion` int(11) NOT NULL,
  `Descripcion` text NOT NULL,
  `Id_Habitacion` int(11) NOT NULL,
  `Id_Estudiante` int(11) DEFAULT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Estado` enum('habilitado','deshabilitado') NOT NULL DEFAULT 'habilitado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sector`
--

CREATE TABLE `sector` (
  `Id_Sector` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `Id_Servicio` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio_pension`
--

CREATE TABLE `servicio_pension` (
  `Id_ServicioPension` int(11) NOT NULL,
  `Id_Servicio` int(11) NOT NULL,
  `Id_Habitacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad_vivienda`
--

CREATE TABLE `unidad_vivienda` (
  `Id_Unidad` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Tipo` varchar(100) NOT NULL,
  `Id_Sector` int(11) DEFAULT NULL,
  `Id_Admin` int(11) DEFAULT NULL,
  `estado` enum('habilitado','deshabilitado') NOT NULL DEFAULT 'habilitado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`Id_Administrador`),
  ADD UNIQUE KEY `Correo` (`Correo`),
  ADD UNIQUE KEY `Identificacion` (`Identificacion`);

--
-- Indices de la tabla `aplicacion`
--
ALTER TABLE `aplicacion`
  ADD PRIMARY KEY (`Id_Aplicacion`),
  ADD KEY `Id_Estudiante` (`Id_Estudiante`),
  ADD KEY `Id_Habitacion` (`Id_Habitacion`),
  ADD KEY `Correo_Estudiante` (`Correo_Estudiante`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`Id_Estudiante`),
  ADD UNIQUE KEY `Correo` (`Correo`),
  ADD UNIQUE KEY `Identificacion` (`Identificacion`);

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`Id_Habitacion`),
  ADD KEY `Id_Unidad` (`Id_Unidad`),
  ADD KEY `Id_Admin` (`Id_Admin`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `renta`
--
ALTER TABLE `renta`
  ADD PRIMARY KEY (`Id_Renta`),
  ADD KEY `Id_Admin` (`Id_Admin`),
  ADD KEY `Id_Estudiante` (`Id_Estudiante`),
  ADD KEY `Id_Habitacion` (`Id_Habitacion`);

--
-- Indices de la tabla `reseña_estudiante`
--
ALTER TABLE `reseña_estudiante`
  ADD PRIMARY KEY (`Id_Reseña_Estudiante`),
  ADD KEY `Id_Admin` (`Id_Admin`),
  ADD KEY `Id_Estudiante` (`Id_Estudiante`);

--
-- Indices de la tabla `reseña_habitacion`
--
ALTER TABLE `reseña_habitacion`
  ADD PRIMARY KEY (`Id_Reseña_Habitacion`),
  ADD KEY `Id_Habitacion` (`Id_Habitacion`),
  ADD KEY `Id_Estudiante` (`Id_Estudiante`);

--
-- Indices de la tabla `sector`
--
ALTER TABLE `sector`
  ADD PRIMARY KEY (`Id_Sector`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`Id_Servicio`);

--
-- Indices de la tabla `servicio_pension`
--
ALTER TABLE `servicio_pension`
  ADD PRIMARY KEY (`Id_ServicioPension`),
  ADD KEY `Id_Servicio` (`Id_Servicio`),
  ADD KEY `Id_Habitacion` (`Id_Habitacion`);

--
-- Indices de la tabla `unidad_vivienda`
--
ALTER TABLE `unidad_vivienda`
  ADD PRIMARY KEY (`Id_Unidad`),
  ADD KEY `Id_Sector` (`Id_Sector`),
  ADD KEY `Id_Admin` (`Id_Admin`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `Id_Administrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `aplicacion`
--
ALTER TABLE `aplicacion`
  MODIFY `Id_Aplicacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `Id_Estudiante` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `Id_Habitacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `renta`
--
ALTER TABLE `renta`
  MODIFY `Id_Renta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reseña_estudiante`
--
ALTER TABLE `reseña_estudiante`
  MODIFY `Id_Reseña_Estudiante` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reseña_habitacion`
--
ALTER TABLE `reseña_habitacion`
  MODIFY `Id_Reseña_Habitacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sector`
--
ALTER TABLE `sector`
  MODIFY `Id_Sector` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `Id_Servicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicio_pension`
--
ALTER TABLE `servicio_pension`
  MODIFY `Id_ServicioPension` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `unidad_vivienda`
--
ALTER TABLE `unidad_vivienda`
  MODIFY `Id_Unidad` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aplicacion`
--
ALTER TABLE `aplicacion`
  ADD CONSTRAINT `aplicacion_ibfk_1` FOREIGN KEY (`Id_Estudiante`) REFERENCES `estudiante` (`Id_Estudiante`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `aplicacion_ibfk_2` FOREIGN KEY (`Id_Habitacion`) REFERENCES `habitacion` (`Id_Habitacion`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD CONSTRAINT `habitacion_ibfk_1` FOREIGN KEY (`Id_Admin`) REFERENCES `administrador` (`Id_Administrador`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `habitacion_ibfk_2` FOREIGN KEY (`Id_Unidad`) REFERENCES `unidad_vivienda` (`Id_Unidad`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `renta`
--
ALTER TABLE `renta`
  ADD CONSTRAINT `renta_ibfk_1` FOREIGN KEY (`Id_Admin`) REFERENCES `administrador` (`Id_Administrador`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `renta_ibfk_2` FOREIGN KEY (`Id_Estudiante`) REFERENCES `estudiante` (`Id_Estudiante`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `renta_ibfk_3` FOREIGN KEY (`Id_Habitacion`) REFERENCES `habitacion` (`Id_Habitacion`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `reseña_estudiante`
--
ALTER TABLE `reseña_estudiante`
  ADD CONSTRAINT `reseña_estudiante_ibfk_1` FOREIGN KEY (`Id_Estudiante`) REFERENCES `estudiante` (`Id_Estudiante`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reseña_estudiante_ibfk_2` FOREIGN KEY (`Id_Admin`) REFERENCES `administrador` (`Id_Administrador`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `reseña_habitacion`
--
ALTER TABLE `reseña_habitacion`
  ADD CONSTRAINT `reseña_habitacion_ibfk_1` FOREIGN KEY (`Id_Habitacion`) REFERENCES `habitacion` (`Id_Habitacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reseña_habitacion_ibfk_2` FOREIGN KEY (`Id_Estudiante`) REFERENCES `estudiante` (`Id_Estudiante`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `servicio_pension`
--
ALTER TABLE `servicio_pension`
  ADD CONSTRAINT `servicio_pension_ibfk_1` FOREIGN KEY (`Id_Servicio`) REFERENCES `servicio` (`Id_Servicio`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `servicio_pension_ibfk_2` FOREIGN KEY (`Id_Habitacion`) REFERENCES `habitacion` (`Id_Habitacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `unidad_vivienda`
--
ALTER TABLE `unidad_vivienda`
  ADD CONSTRAINT `unidad_vivienda_ibfk_1` FOREIGN KEY (`Id_Sector`) REFERENCES `sector` (`Id_Sector`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `unidad_vivienda_ibfk_2` FOREIGN KEY (`Id_Admin`) REFERENCES `administrador` (`Id_Administrador`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
