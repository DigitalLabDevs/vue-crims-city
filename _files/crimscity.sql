-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 23, 2024 at 06:40 AM
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
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
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

INSERT INTO `items` (`id`, `name`, `description`, `img_url`, `category`, `attack`, `defense`, `price`, `weight`, `durability`) VALUES
(1, 'Pistolet', 'Mały pistolet kaliber 9mm.', 'pistol1.jpg', 'Weapon', 50, NULL, 100.00, 1.50, 100),
(2, 'Kamizelka kuloodporna', 'Kamizelka chroniąca przed pociskami.', 'vest1.jpg', 'Defense', NULL, 30, 200.00, 2.00, 200),
(3, 'Telefon', 'Nowoczesny smartfon.', 'phone1.jpg', 'Items', NULL, NULL, 500.00, 0.50, NULL),
(4, 'Stare Buty', 'Podarte stare buty.', 'old_shoes.jpg', 'Trash', NULL, NULL, 0.10, 1.00, NULL),
(5, 'Karabin', 'Szybkostrzelny karabin automatyczny.', 'rifle1.jpg', 'Weapon', 80, NULL, 200.00, 3.00, 150),
(6, 'Hełm', 'Hełm ochronny.', 'helmet3.jpg', 'Defense', NULL, 40, 150.00, 1.00, 250);

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
(70, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6Ijc3MWI4YWE0LTU5MmQtNGFhMy1hNmFhLWI0ZWNhNzE0OGRhYSIsImlhdCI6MTcxNjEzODU3NCwiZXhwIjoxNzE2MTQyMTc0fQ.H26dKBGHsaaWu2VeoGW2j1ggR3I6OpOjdiUiVPQOpKI', '771b8aa4-592d-4aa3-a6aa-b4eca7148daa', '2024-05-19 19:09:34'),
(71, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6IjlkZjEwY2VkLTJiYTgtNDEyZS1iMDgyLWQxMmIyYTRjYTExMSIsImlhdCI6MTcxNjEzODcwOSwiZXhwIjoxNzE2MTQyMzA5fQ.qAqY5A4wBeX45SL93DwEb5QfA_bIbydyeI5ITz4w2nM', '9df10ced-2ba8-412e-b082-d12b2a4ca111', '2024-05-19 19:11:49'),
(72, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6IjlkZjEwY2VkLTJiYTgtNDEyZS1iMDgyLWQxMmIyYTRjYTExMSIsImlhdCI6MTcxNjEzODc5MywiZXhwIjoxNzE2MTQyMzkzfQ.xqnwcWJ3Cu-DIM70UdYzlho5JjuIkSPgQyAWMk3boD0', '9df10ced-2ba8-412e-b082-d12b2a4ca111', '2024-05-19 19:13:13'),
(73, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6ImFmZWFiODM1LTViMWMtNGMzNC1iMjk0LTJmMDBkM2QxMmU3MCIsImlhdCI6MTcxNjEzODk3NywiZXhwIjoxNzE2MTQyNTc3fQ.X_uf1C_UPNeVZZgA-r0N71YlRvB_UW-KMeL80S20NHA', 'afeab835-5b1c-4c34-b294-2f00d3d12e70', '2024-05-19 19:16:17'),
(74, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6ImFmZWFiODM1LTViMWMtNGMzNC1iMjk0LTJmMDBkM2QxMmU3MCIsImlhdCI6MTcxNjEzOTE0NiwiZXhwIjoxNzE2MTQyNzQ2fQ.mLGzOx9QPOLm6ayUWb93rZAmXYyTrF7XnIAeGvOGJHY', 'afeab835-5b1c-4c34-b294-2f00d3d12e70', '2024-05-19 19:19:06'),
(75, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6ImFmZWFiODM1LTViMWMtNGMzNC1iMjk0LTJmMDBkM2QxMmU3MCIsImlhdCI6MTcxNjEzOTIwNiwiZXhwIjoxNzE2MTQyODA2fQ.Tdu1JMR_2upM60SwmAd-OnYCVA5tT1wSSm2bFQTrygI', 'afeab835-5b1c-4c34-b294-2f00d3d12e70', '2024-05-19 19:20:06'),
(76, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6ImFmZWFiODM1LTViMWMtNGMzNC1iMjk0LTJmMDBkM2QxMmU3MCIsImlhdCI6MTcxNjEzOTMyMywiZXhwIjoxNzE2MTQyOTIzfQ.J65ZspmgAhDm57hQaQSQ_jt4-Z4MUTYA8zaITHXKK6k', 'afeab835-5b1c-4c34-b294-2f00d3d12e70', '2024-05-19 19:22:03'),
(78, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6ImQzYTdjODA4LWJkMmItNGZlMy1hNjIxLWQwNzYwNTkxNGFkYSIsImlhdCI6MTcxNjEzOTQxNCwiZXhwIjoxNzE2MTQzMDE0fQ.0xMrF0gkfdTA4V9n5PDwIt8gUgrASqqAT2SSkgLjkLk', 'd3a7c808-bd2b-4fe3-a621-d07605914ada', '2024-05-19 19:23:34'),
(79, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6IjA5OTViNDQ3LWU3MTctNGM3Yi04ODRiLWUzM2E4N2NiOGIxYiIsImlhdCI6MTcxNjE4NDg2MCwiZXhwIjoxNzE2MTg4NDYwfQ.-mr8tskGi8Gpo4_j-RsrQ_IZjdl1kKSo33TDS-NpX9o', '0995b447-e717-4c7b-884b-e33a87cb8b1b', '2024-05-20 08:01:00'),
(80, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6ImU0NDBlOGE5LTAxOTctNDRiZC1hNTQwLWRhMjE4ZGI2YWFhNSIsImlhdCI6MTcxNjMwNjIwNiwiZXhwIjoxNzE2MzA5ODA2fQ.A95IkLLeuwKDlfe0-CLkuqBB5GnAB4yktvQKYFkoZ84', 'e440e8a9-0197-44bd-a540-da218db6aaa5', '2024-05-21 17:43:26'),
(81, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6ImU0NDBlOGE5LTAxOTctNDRiZC1hNTQwLWRhMjE4ZGI2YWFhNSIsImlhdCI6MTcxNjMxMDA5NCwiZXhwIjoxNzE2MzEzNjk0fQ.eEsu_JzVDGIo0Ducn3xx9uMNehvRCUxAznc8usxRo_I', 'e440e8a9-0197-44bd-a540-da218db6aaa5', '2024-05-21 18:48:14'),
(82, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6ImU0NDBlOGE5LTAxOTctNDRiZC1hNTQwLWRhMjE4ZGI2YWFhNSIsImlhdCI6MTcxNjMxMzcxOCwiZXhwIjoxNzE2MzE3MzE4fQ.-FQDl5eOy97TPQb8s_Te41wmbc_yBOYqfAty9cUE-xY', 'e440e8a9-0197-44bd-a540-da218db6aaa5', '2024-05-21 19:48:38'),
(83, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6ImU0NDBlOGE5LTAxOTctNDRiZC1hNTQwLWRhMjE4ZGI2YWFhNSIsImlhdCI6MTcxNjMxOTUxMywiZXhwIjoxNzE2MzIzMTEzfQ.V6ZuKuZMUcCbCzNj8hfjzwBplZV8-MbCsBnWIH-EyXw', 'e440e8a9-0197-44bd-a540-da218db6aaa5', '2024-05-21 21:25:13'),
(84, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6ImU0NDBlOGE5LTAxOTctNDRiZC1hNTQwLWRhMjE4ZGI2YWFhNSIsImlhdCI6MTcxNjMyMzIxNSwiZXhwIjoxNzE2MzI2ODE1fQ.4XlorUbRF-vzOs062WJIywW0y7I4xGzRYBGkjIRAG8g', 'e440e8a9-0197-44bd-a540-da218db6aaa5', '2024-05-21 22:26:55'),
(85, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6ImU0NDBlOGE5LTAxOTctNDRiZC1hNTQwLWRhMjE4ZGI2YWFhNSIsImlhdCI6MTcxNjMyNzA4OSwiZXhwIjoxNzE2MzMwNjg5fQ.qrLfyYbqB23JrIXWy0lEo4fviwwich5REKIsEo9Z9ys', 'e440e8a9-0197-44bd-a540-da218db6aaa5', '2024-05-21 23:31:29'),
(86, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6Ijc1MDgzY2NiLTE5YTYtNGY1ZC1hNGExLTVkNDBiNWI1NjZjYyIsImlhdCI6MTcxNjM2MjI2MywiZXhwIjoxNzE2MzY1ODYzfQ.wY_AYXFNEhU3audAlDExC5OfDGU-vaoC_oGevdMkrQ0', '75083ccb-19a6-4f5d-a4a1-5d40b5b566cc', '2024-05-22 09:17:43'),
(87, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6Ijc1MDgzY2NiLTE5YTYtNGY1ZC1hNGExLTVkNDBiNWI1NjZjYyIsImlhdCI6MTcxNjM2OTk5MSwiZXhwIjoxNzE2MzczNTkxfQ.ELMu2M7BQYOTJuk_TkfjZP_yOBB1lQoqyuJkVHULIDo', '75083ccb-19a6-4f5d-a4a1-5d40b5b566cc', '2024-05-22 11:26:31'),
(88, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6IjNhZjI5NjNkLTAzMmQtNDY2OC05NzllLTgwNTI3MGZiNDQzZiIsImlhdCI6MTcxNjQzNjMzMiwiZXhwIjoxNzE2NDM5OTMyfQ.pXdMsCD7CeyF7rcxXiRrx0OWsXB3QwcFdnibA5A_4Lg', '3af2963d-032d-4668-979e-805270fb443f', '2024-05-23 05:52:12'),
(89, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6IjNhZjI5NjNkLTAzMmQtNDY2OC05NzllLTgwNTI3MGZiNDQzZiIsImlhdCI6MTcxNjQ0MTA4MiwiZXhwIjoxNzE2NDQ0NjgyfQ.P6nEvqoaJk0K-sRZ1R2BLS5lKoyxz9JXnyKbrskYwNQ', '3af2963d-032d-4668-979e-805270fb443f', '2024-05-23 07:11:22'),
(90, 'yovasec567@fincainc.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b3Zhc2VjNTY3QGZpbmNhaW5jLmNvbSIsInNlc3Npb25JZCI6IjNhZjI5NjNkLTAzMmQtNDY2OC05NzllLTgwNTI3MGZiNDQzZiIsImlhdCI6MTcxNjQ0NDc1MywiZXhwIjoxNzE2NDQ4MzUzfQ.aI-9YtY86k9Nfq_af3MdtE_6kX-BXUEggMTfkVIquXU', '3af2963d-032d-4668-979e-805270fb443f', '2024-05-23 08:12:33');

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
('JOpUU8lA2SHMncEAk1ZoCbM-L5myyokA', 1716448354, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-05-23T07:12:33.689Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"data\":{\"user_ip\":\"::1\"},\"user\":{\"email\":\"yovasec567@fincainc.com\"}}');

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
(77, 'yovasec567@fincainc.com', NULL, '$2b$10$Hw9clcQtRnjoOFO8yo69He0gFkxfNfnAlzIq1P8YlASAAShdc/CCO', NULL, NULL, NULL, NULL, '2024-05-23 08:12:33', '2024-05-17 17:40:34', 73, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
