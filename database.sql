-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql:3306
-- Tiempo de generación: 23-02-2026 a las 04:48:45
-- Versión del servidor: 8.0.44
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@OLD_COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veterinaria_patitas_felices`
--
CREATE DATABASE IF NOT EXISTS `veterinaria_patitas_felices` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `veterinaria_patitas_felices`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `duenos`
--

DROP TABLE IF EXISTS `duenos`;
CREATE TABLE IF NOT EXISTS `duenos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `created_by` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `duenos`
--

INSERT INTO `duenos` (`id`, `nombre`, `telefono`, `email`, `direccion`, `created_by`, `created_at`) VALUES
(1, 'Carlos Lopez', '1122334455', 'carlos@test.com', 'Av Siempre Viva 123', 3, '2026-02-20 01:49:50'),
(2, 'Jorge Gomez', '1150408970', 'Jorge@test.com', 'Av de la plata', 1, '2026-02-22 00:11:17'),
(3, 'Jesus christ', '1177777777', 'Jesus@test.com', NULL, 1, '2026-02-22 22:54:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_clinico`
--

DROP TABLE IF EXISTS `historial_clinico`;
CREATE TABLE IF NOT EXISTS `historial_clinico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mascota_id` int NOT NULL,
  `veterinario_id` int NOT NULL,
  `descripcion` text NOT NULL,
  `tratamiento` text,
  `fecha_consulta` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `mascota_id` (`mascota_id`),
  KEY `veterinario_id` (`veterinario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `historial_clinico`
--

INSERT INTO `historial_clinico` (`id`, `mascota_id`, `veterinario_id`, `descripcion`, `tratamiento`, `fecha_consulta`, `created_at`) VALUES
(1, 1, 1, 'Control general y vacunación', 'Vacuna antirrábica', '2026-02-19', '2026-02-21 22:21:45'),
(2, 2, 5, 'Control general', 'Nada, esta de 10', '2026-02-22', '2026-02-22 22:53:03'),
(3, 5, 5, 'Control general', 'una maquina, tiene para 100 años mas', '2026-02-23', '2026-02-22 23:05:36'),
(5, 5, 1, 'control', 'sigue barbaro', '2026-02-23', '2026-02-23 04:32:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

DROP TABLE IF EXISTS `mascotas`;
CREATE TABLE IF NOT EXISTS `mascotas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `especie` varchar(100) NOT NULL,
  `raza` varchar(100) DEFAULT NULL,
  `edad` int DEFAULT NULL,
  `dueno_id` int NOT NULL,
  `created_by` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `dueno_id` (`dueno_id`),
  KEY `created_by` (`created_by`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `nombre`, `especie`, `raza`, `edad`, `dueno_id`, `created_by`, `created_at`) VALUES
(1, 'Firulais', 'Perro', 'Labrador', 5, 1, 3, '2026-02-20 02:07:23'),
(2, 'Socrates', 'Gato', '', 3, 1, '2026-02-22 00:08:57'),
(5, 'Pepe', 'Otro', 'Tortuga', 30, 3, 1, '2026-02-22 23:04:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','veterinario') NOT NULL DEFAULT 'veterinario',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `apellido`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Admin', 'Principal', 'admin@patitasfelices.com', '$2b$10$yFwzs5I5ARnuVtVil6a41.5az.i7bGz/5FhURsxiYKuVy7HpuEb0O', 'admin', '2026-02-19 19:41:37'),
(3, 'Pedro', 'Gomez', 'pedro@test.com', '$2b$10$ToLYqIPL/vPfNUxZPQzAC.q4H3OVFG2eXeE3ax1IgihGVVMNk0Ec.', 'veterinario', '2026-02-20 00:04:39'),
(5, 'Victor', 'Gonzalez', 'Victor@test.com', '$2b$10$ov9S8uh/PakD.6nPyf2OCeV10MoX9O921fUkVn3fC/lAZEC1LKhKu', 'veterinario', '2026-02-22 23:58:33');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `duenos`
--
ALTER TABLE `duenos`
  ADD CONSTRAINT `duenos_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT;

--
-- Filtros para la tabla `historial_clinico`
--
ALTER TABLE `historial_clinico`
  ADD CONSTRAINT `historial_clinico_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `historial_clinico_ibfk_2` FOREIGN KEY (`veterinario_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT;

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`dueno_id`) REFERENCES `duenos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
