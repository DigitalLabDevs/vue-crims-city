-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 29, 2024 at 04:37 PM
-- Server version: 5.7.24
-- PHP Version: 8.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crimscity`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `b_ids` int(11) NOT NULL,
  `b_player_ids` int(11) NOT NULL,
  `b_player_money` int(11) NOT NULL,
  `b_bb` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`b_ids`, `b_player_ids`, `b_player_money`, `b_bb`) VALUES
(1, 77, 220000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `buildings`
--

CREATE TABLE `buildings` (
  `buildings_ids` int(11) NOT NULL,
  `buildings_name` varchar(30) NOT NULL,
  `buildings_img` varchar(30) NOT NULL,
  `buildings_description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buildings`
--

INSERT INTO `buildings` (`buildings_ids`, `buildings_name`, `buildings_img`, `buildings_description`) VALUES
(1, 'CounterfeitMoneyFactory', 'CounterfeitMoneyFactory', 'Fabryka banknotów'),
(2, 'Garage', 'Garage', 'Garage'),
(3, 'SafeHouse', 'SafeHouse', 'SafeHouse - Descriptions'),
(4, 'DrugLab', 'DrugLab', 'Drug Lab - Descriptions'),
(5, 'WeaponsDepot', 'WeaponsDepot', 'WeaponsDepot - Descriptions'),
(6, 'HackersHub', 'HackersHub', 'HackersHub - Descriptions'),
(7, 'IllegalCasino', 'IllegalCasino', 'Illegal Casino - Descriptions');

-- --------------------------------------------------------

--
-- Table structure for table `buildings_upgrades`
--

CREATE TABLE `buildings_upgrades` (
  `id` int(11) NOT NULL,
  `building_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `build_time` int(11) NOT NULL,
  `upgrade_cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buildings_upgrades`
--

INSERT INTO `buildings_upgrades` (`id`, `building_id`, `level`, `build_time`, `upgrade_cost`) VALUES
(1, 5, 0, 9, 5),
(2, 5, 1, 18, 5),
(3, 5, 2, 52, 5),
(4, 1, 0, 5, 5),
(5, 1, 1, 5, 5),
(6, 1, 2, 5, 158),
(7, 2, 0, 10, 52),
(8, 2, 1, 15, 45),
(9, 2, 2, 5, 5),
(10, 4, 0, 7, 5),
(11, 4, 1, 11, 5),
(12, 4, 2, 15, 5),
(13, 6, 0, 7, 5),
(14, 6, 1, 4, 5),
(15, 6, 2, 45, 5),
(16, 7, 0, 14, 5),
(17, 7, 1, 4, 5),
(18, 7, 2, 6, 5),
(19, 3, 0, 11, 520),
(20, 3, 1, 111, 5200),
(21, 3, 2, 245, 52078);

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `email`, `subject`, `message`, `created_at`) VALUES
(1, 'matrix_neo@o2.pl', 'general_inquiry', '12', '2024-05-29 16:12:58');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `category` enum('Weapon','Defense','Items','Trash') NOT NULL,
  `attack` int(11) DEFAULT NULL,
  `defense` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `durability` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `name`, `description`, `img_url`, `category`, `attack`, `defense`, `price`, `weight`, `durability`) VALUES
(1, 'Pistolet', 'Mały pistolet kaliber 9mm.', 'pistol1.jpg', 'Weapon', 50, NULL, 100.00, 1.50, 100),
(2, 'Kamizelka kuloodporna', 'Kamizelka chroniąca przed pociskami.', 'vest1.jpg', 'Defense', NULL, 30, 200.00, 2.00, 200),
(3, 'Telefon', 'Nowoczesny smartfon.', 'phone1.jpg', 'Items', NULL, NULL, 500.00, 0.50, NULL),
(4, 'Stare Buty', 'Podarte stare buty.', 'old_shoes.jpg', 'Trash', NULL, NULL, 0.10, 1.00, NULL),
(5, 'Karabin', 'Szybkostrzelny karabin automatyczny.', 'rifle1.jpg', 'Weapon', 80, NULL, 200.00, 3.00, 150),
(6, 'Hełm', 'Hełm ochronny.', 'helmet3.jpg', 'Defense', NULL, 40, 150.00, 1.00, 250);

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `p_ids` int(11) NOT NULL,
  `p_ids_user` int(11) NOT NULL,
  `p_nick` varchar(40) NOT NULL,
  `p_img` varchar(20) DEFAULT NULL,
  `p_money` int(11) NOT NULL DEFAULT '0',
  `p_experience` int(11) NOT NULL DEFAULT '0',
  `p_level` smallint(11) DEFAULT '0',
  `p_health_points` tinyint(11) NOT NULL DEFAULT '100',
  `p_reputation` int(11) NOT NULL DEFAULT '0',
  `p_eq_slots` int(11) NOT NULL DEFAULT '3'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`p_ids`, `p_ids_user`, `p_nick`, `p_img`, `p_money`, `p_experience`, `p_level`, `p_health_points`, `p_reputation`, `p_eq_slots`) VALUES
(1, 77, 'Admirał Admin', NULL, 124836, 127, 1, 100, 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `player_buildings`
--

CREATE TABLE `player_buildings` (
  `pb_ids` int(11) NOT NULL,
  `pb_player_ids` int(11) DEFAULT NULL,
  `pb_buildings_ids` int(11) DEFAULT NULL,
  `pb_level` int(11) NOT NULL DEFAULT '0',
  `pb_capacity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `player_buildings`
--

INSERT INTO `player_buildings` (`pb_ids`, `pb_player_ids`, `pb_buildings_ids`, `pb_level`, `pb_capacity`) VALUES
(1, 77, 1, 0, 3),
(2, 77, 2, 0, 3),
(3, 77, 3, 0, 0),
(4, 77, 4, 0, 0),
(5, 77, 5, 0, 0),
(6, 77, 6, 0, 0),
(7, 77, 7, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `player_items`
--

CREATE TABLE `player_items` (
  `id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT '1',
  `current_durability` int(11) DEFAULT NULL,
  `equipped` tinyint(1) DEFAULT NULL,
  `item_slot` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `player_items`
--

INSERT INTO `player_items` (`id`, `player_id`, `item_id`, `quantity`, `current_durability`, `equipped`, `item_slot`) VALUES
(1, 77, 1, 1, 100, NULL, 0),
(2, 77, 2, 1, 100, NULL, 0),
(3, 77, 3, 1, 100, NULL, 0),
(4, 77, 5, 1, 100, NULL, 0),
(5, 77, 4, 1, 100, NULL, 0),
(6, 77, 6, 1, 100, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `ids` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `access_token` varchar(512) DEFAULT NULL,
  `session_token` varchar(255) DEFAULT NULL,
  `login_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`ids`, `email`, `access_token`, `session_token`, `login_date`) VALUES
(126, '77', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOjc3LCJpZHMiOm51bGwsInNlc3Npb25JZCI6IjFiZDk4NzFlLWFlZGItNGY5NS1hM2Q1LTdkMTU0YzkyY2Y5NiIsImlhdCI6MTcxNjkxMzMzOCwiZXhwIjoxNzE2OTE2OTM4fQ.cfx_IEGJIPYaz_CB7Pxhw9bRH2pZFWTaZWDQaZTZYIM', '1bd9871e-aedb-4f95-a3d5-7d154c92cf96', '2024-05-28 18:22:18'),
(127, '77', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOjc3LCJpZHMiOm51bGwsInNlc3Npb25JZCI6ImYxNGM5MzBmLTE1ZjUtNDQzZS04NGRjLTI5MWM4NTI4Mzc2ZSIsImlhdCI6MTcxNjk5OTAyMCwiZXhwIjoxNzE3MDAyNjIwfQ.Koolie1PvJjMNzRvnUZm7SRJ1WicVrQ5X3s1QVjw4iE', 'f14c930f-15f5-443e-84dc-291c8528376e', '2024-05-29 18:10:20');

-- --------------------------------------------------------

--
-- Table structure for table `sessions_store`
--

CREATE TABLE `sessions_store` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sessions_store`
--

INSERT INTO `sessions_store` (`session_id`, `expires`, `data`) VALUES
('tnjn2kpDKBZZajJzBqUtjW8Bcz3VwNVy', 1717003925, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-05-29T17:10:23.393Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"data\":{\"user_ip\":\"::1\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ids` int(11) NOT NULL,
  `email` varchar(88) COLLATE utf8_polish_ci DEFAULT NULL,
  `user` varchar(55) COLLATE utf8_polish_ci DEFAULT NULL,
  `pass` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `pin` int(11) DEFAULT NULL,
  `notifications` int(11) DEFAULT NULL,
  `activation_token` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `reset_password_token` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `login_date` datetime DEFAULT NULL,
  `registration_date` datetime DEFAULT NULL,
  `login_count` int(11) DEFAULT '0',
  `role` varchar(10) COLLATE utf8_polish_ci DEFAULT NULL,
  `userBlock` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ids`, `email`, `user`, `pass`, `pin`, `notifications`, `activation_token`, `reset_password_token`, `login_date`, `registration_date`, `login_count`, `role`, `userBlock`) VALUES
(1, 'abc@abc.pl', 'ADMIN11', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', 777, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjEsInJvbGUiOiJhZG1pbiIsInVzZXIiOiJBRE1JTjExIiwiZXhwIjoxNzE1MjU0MTMwLCJpYXQiOjE3MTUyNTA1MzB9.gqTPgr9lPFxFaR2mq4QUB5adI9vDYYY9DRZw_mlr0zk', NULL, '2024-05-09 12:28:50', NULL, 1037, 'admin', 0),
(2, NULL, 'ADMIN111', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjIsInJvbGUiOiJhZG1pbjIiLCJ1c2VyIjoiQURNSU4xMTEiLCJleHAiOjE3MTUyMjAzOTUsImlhdCI6MTcxNTIxNjc5NX0.r1PzfBaJJSplfgoFyX4-YvAkFPqmovgUoA1cgv7CEfs', NULL, '2024-05-09 03:06:35', NULL, 18, 'admin2', 0),
(3, NULL, 'ADMIN1', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjMsInJvbGUiOm51bGwsInVzZXIiOiJBRE1JTjEiLCJleHAiOjE3MDcwMzc0NjIsImlhdCI6MTcwNzAzMzg2Mn0.qiupxDDsYKOXjhZwJOGir9yBYDQa8c1PNkwYbc2NfiQ', NULL, '2024-02-04 09:04:22', NULL, NULL, NULL, 0),
(4, NULL, '01585', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(71, 'hesidak940@bsomek.com', NULL, '$2b$10$nhksDTDiaqH/RMniHpx86ejMoq8SVvvNOCs427QQPAYQeSnMcRy8e', NULL, NULL, NULL, NULL, NULL, '2024-05-15 08:56:11', 0, NULL, 0),
(77, 'yovasec567@fincainc.com', NULL, '$2b$10$Hw9clcQtRnjoOFO8yo69He0gFkxfNfnAlzIq1P8YlASAAShdc/CCO', NULL, NULL, NULL, NULL, '2024-05-29 18:10:20', '2024-05-17 17:40:34', 110, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`b_ids`),
  ADD KEY `b_player_ids` (`b_player_ids`);

--
-- Indexes for table `buildings`
--
ALTER TABLE `buildings`
  ADD PRIMARY KEY (`buildings_ids`);

--
-- Indexes for table `buildings_upgrades`
--
ALTER TABLE `buildings_upgrades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `building_id` (`building_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`p_ids`),
  ADD KEY `players_ibfk_1` (`p_ids_user`);

--
-- Indexes for table `player_buildings`
--
ALTER TABLE `player_buildings`
  ADD PRIMARY KEY (`pb_ids`),
  ADD KEY `pb_player_ids` (`pb_player_ids`),
  ADD KEY `pb_buildings_ids` (`pb_buildings_ids`);

--
-- Indexes for table `player_items`
--
ALTER TABLE `player_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `player_id` (`player_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`ids`);

--
-- Indexes for table `sessions_store`
--
ALTER TABLE `sessions_store`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ids`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `b_ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `buildings`
--
ALTER TABLE `buildings`
  MODIFY `buildings_ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `buildings_upgrades`
--
ALTER TABLE `buildings_upgrades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `p_ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `player_buildings`
--
ALTER TABLE `player_buildings`
  MODIFY `pb_ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `player_items`
--
ALTER TABLE `player_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bank`
--
ALTER TABLE `bank`
  ADD CONSTRAINT `bank_ibfk_1` FOREIGN KEY (`b_player_ids`) REFERENCES `players` (`p_ids_user`);

--
-- Constraints for table `buildings_upgrades`
--
ALTER TABLE `buildings_upgrades`
  ADD CONSTRAINT `buildings_upgrades_ibfk_1` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`buildings_ids`);

--
-- Constraints for table `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `players_ibfk_1` FOREIGN KEY (`p_ids_user`) REFERENCES `users` (`ids`);

--
-- Constraints for table `player_buildings`
--
ALTER TABLE `player_buildings`
  ADD CONSTRAINT `player_buildings_ibfk_1` FOREIGN KEY (`pb_buildings_ids`) REFERENCES `buildings` (`buildings_ids`),
  ADD CONSTRAINT `player_buildings_ibfk_2` FOREIGN KEY (`pb_player_ids`) REFERENCES `users` (`ids`);

--
-- Constraints for table `player_items`
--
ALTER TABLE `player_items`
  ADD CONSTRAINT `player_items_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `users` (`ids`),
  ADD CONSTRAINT `player_items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
