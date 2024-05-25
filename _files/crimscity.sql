-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 25, 2024 at 07:52 AM
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
-- Table structure for table `buildings`
--

CREATE TABLE `buildings` (
  `buildings_ids` int(11) NOT NULL,
  `buildings_name` varchar(30) NOT NULL,
  `buildings_img` varchar(30) NOT NULL,
  `buildings_description` varchar(200) NOT NULL,
  `buildings_capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buildings`
--

INSERT INTO `buildings` (`buildings_ids`, `buildings_name`, `buildings_img`, `buildings_description`, `buildings_capacity`) VALUES
(1, 'Fabryka fałszywek', 'fabfal', 'Fabryka banknotów', 3),
(2, 'Garaż', 'garage', 'Garaż', 3);

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
-- Table structure for table `player_buildings`
--

CREATE TABLE `player_buildings` (
  `pb_ids` int(11) NOT NULL,
  `pb_player_ids` int(11) DEFAULT NULL,
  `pb_buildings_ids` int(11) NOT NULL,
  `pb_level` int(11) NOT NULL DEFAULT '0',
  `pb_capacity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `player_buildings`
--

INSERT INTO `player_buildings` (`pb_ids`, `pb_player_ids`, `pb_buildings_ids`, `pb_level`, `pb_capacity`) VALUES
(1, 77, 1, 1, 3),
(2, 77, 2, 3, 3);

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
(93, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6IjYxMTIzNDcxLWExMDAtNGM0NS1hNGRiLTU2MmM2Y2Q4YzY2NyIsImlhdCI6MTcxNjUyNzkyNSwiZXhwIjoxNzE2NTMxNTI1fQ.sAscXpHPoI7RLypuOKMkOQjFO34lIBywIYyjEv13pRY', '61123471-a100-4c45-a4db-562c6cd8c667', '2024-05-24 07:18:45'),
(94, '77', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOjc3LCJzZXNzaW9uSWQiOiI1ZGQ2ODVmYy02MjRmLTQ4OGEtODc5Yi0zZWJiYjQ3ZjJjYjkiLCJpYXQiOjE3MTY1Mjk4NzQsImV4cCI6MTcxNjUzMzQ3NH0.hhe_Z5av-mHXY4ta5Gkq2Sog3FAwppDAyQ9qar5ksTM', '5dd685fc-624f-488a-879b-3ebbb47f2cb9', '2024-05-24 07:51:14'),
(95, '77', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOjc3LCJzZXNzaW9uSWQiOiIwMGFhYTBkMS1kYmExLTQxODktOWE3OS02OGVhY2I3MWI3NmYiLCJpYXQiOjE3MTY1MzA2MTQsImV4cCI6MTcxNjUzNDIxNH0.6jn582LeOaKkizGWNCNL3xRPUWA2Ywhq8yKodtrmJEg', '00aaa0d1-dba1-4189-9a79-68eacb71b76f', '2024-05-24 08:03:34'),
(96, '77', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOjc3LCJzZXNzaW9uSWQiOiI5ZDAxOTIzZC1mODg5LTQwOTQtOGViOC02ODcxZDk1ODI3NjgiLCJpYXQiOjE3MTY1NTU1OTUsImV4cCI6MTcxNjU1OTE5NX0.4C5zD6um7_IseUFLgzQphCUqTrDRzk9VWYonE8sQqzk', '9d01923d-f889-4094-8eb8-6871d9582768', '2024-05-24 14:59:55'),
(97, '77', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOjc3LCJzZXNzaW9uSWQiOiIxZjU3ODdiNy0yYWE2LTRiZDYtOTBlNy1kMjg5NjM0MGNjOTYiLCJpYXQiOjE3MTY1NTkxOTgsImV4cCI6MTcxNjU2Mjc5OH0.F3P04jN2jl0IAyDrdxb7vrFlT1i4QZkxiQjV4wgavJA', '1f5787b7-2aa6-4bd6-90e7-d2896340cc96', '2024-05-24 15:59:58'),
(98, '77', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOjc3LCJzZXNzaW9uSWQiOiIxZjU3ODdiNy0yYWE2LTRiZDYtOTBlNy1kMjg5NjM0MGNjOTYiLCJpYXQiOjE3MTY1NjI5NjksImV4cCI6MTcxNjU2NjU2OX0.fLk9iEm-m3zlOgVOlMtYETcb0WY-MoWQ3vXrMn4nyn4', '1f5787b7-2aa6-4bd6-90e7-d2896340cc96', '2024-05-24 17:02:49'),
(99, '77', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOjc3LCJzZXNzaW9uSWQiOiJkY2ZmNmMyOC1iMjdlLTRiODAtOWE0Yi1kNWUxMGYxNTkyNDEiLCJpYXQiOjE3MTY1NjkwMjEsImV4cCI6MTcxNjU3MjYyMX0.LOVfFaiV5gXtZ274dxxShBX1rAAGgCw9yV901ZhWy1I', 'dcff6c28-b27e-4b80-9a4b-d5e10f159241', '2024-05-24 18:43:41'),
(100, '77', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOjc3LCJzZXNzaW9uSWQiOiI3ZjUwMzIxNS04OWI3LTQzMzUtODM2NS03NTk1MTRjZTYzZmUiLCJpYXQiOjE3MTY2MTQzNDYsImV4cCI6MTcxNjYxNzk0Nn0.n1vMA3oyl3i6a36UiVAbPEkQqceCq_yhToLtsff80go', '7f503215-89b7-4335-8365-759514ce63fe', '2024-05-25 07:19:06'),
(101, '77', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOjc3LCJzZXNzaW9uSWQiOiIzMGQyMjI3OC1mNmU4LTQ2OGUtODQ5Zi1hN2NhMDU0ZDMyNmIiLCJpYXQiOjE3MTY2MTg2NjQsImV4cCI6MTcxNjYyMjI2NH0.8OFiLhl8XyLtqaRnvH1J8q0Ft2tAlOsbKe2NufhTW-0', '30d22278-f6e8-468e-849f-a7ca054d326b', '2024-05-25 08:31:04'),
(102, '77', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOjc3LCJzZXNzaW9uSWQiOiIzZjEyMDhkMC00NjJlLTQ2OWMtODJlYy01YmZiNTZjNzUyYzUiLCJpYXQiOjE3MTY2MjIzNjksImV4cCI6MTcxNjYyNTk2OX0.D_llhWpBwITl4mYrQZkl1xrA7sZt3mUHvwZPTHXlVyA', '3f1208d0-462e-469c-82ec-5bfb56c752c5', '2024-05-25 09:32:49');

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
('CGZMUoMop8HqaO6VEHWbcgwDFE_ISoxl', 1716622507, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-05-25T07:35:06.753Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"data\":{\"user_ip\":\"::1\"}}'),
('Yasg37ZusXaaBLlgDAbWbJK076Yk_zDf', 1716622268, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-05-25T07:31:07.715Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"data\":{\"user_ip\":\"::1\"}}'),
('ZgoETG5QqAmUTNJCKDIKLJLeaBLF07xs', 1716627159, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-05-25T06:19:06.703Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"data\":{\"user_ip\":\"::1\"},\"user\":{\"email\":\"yovasec567@fincainc.com\"}}'),
('deCkiZomOGltJsFcpz3F6dlaq-Vnp1HD', 1716622325, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-05-25T07:32:04.870Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"data\":{\"user_ip\":\"::1\"}}');

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
(77, 'yovasec567@fincainc.com', NULL, '$2b$10$Hw9clcQtRnjoOFO8yo69He0gFkxfNfnAlzIq1P8YlASAAShdc/CCO', NULL, NULL, NULL, NULL, '2024-05-25 09:32:49', '2024-05-17 17:40:34', 85, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buildings`
--
ALTER TABLE `buildings`
  ADD PRIMARY KEY (`buildings_ids`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `player_buildings`
--
ALTER TABLE `player_buildings`
  ADD PRIMARY KEY (`pb_ids`),
  ADD KEY `pb_player_ids` (`pb_player_ids`);

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
-- AUTO_INCREMENT for table `buildings`
--
ALTER TABLE `buildings`
  MODIFY `buildings_ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `player_buildings`
--
ALTER TABLE `player_buildings`
  MODIFY `pb_ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `player_items`
--
ALTER TABLE `player_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- Constraints for dumped tables
--

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
