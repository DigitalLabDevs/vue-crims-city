-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Maj 11, 2024 at 07:17 PM
-- Wersja serwera: 5.7.24
-- Wersja PHP: 8.3.4

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
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `ids` int(11) NOT NULL,
  `email` varchar(88) COLLATE utf8_polish_ci DEFAULT NULL,
  `user` varchar(55) COLLATE utf8_polish_ci DEFAULT NULL,
  `pass` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `pin` int(11) DEFAULT NULL,
  `notifications` int(11) DEFAULT NULL,
  `token` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `login_date` datetime DEFAULT NULL,
  `login_count` int(11) DEFAULT '0',
  `role` varchar(10) COLLATE utf8_polish_ci DEFAULT NULL,
  `userBlock` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ids`, `email`, `user`, `pass`, `pin`, `notifications`, `token`, `login_date`, `login_count`, `role`, `userBlock`) VALUES
(1, 'abc@abc.pl', 'ADMIN11', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', 777, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjEsInJvbGUiOiJhZG1pbiIsInVzZXIiOiJBRE1JTjExIiwiZXhwIjoxNzE1MjU0MTMwLCJpYXQiOjE3MTUyNTA1MzB9.gqTPgr9lPFxFaR2mq4QUB5adI9vDYYY9DRZw_mlr0zk', '2024-05-09 12:28:50', 1037, 'admin', 0),
(2, NULL, 'ADMIN111', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjIsInJvbGUiOiJhZG1pbjIiLCJ1c2VyIjoiQURNSU4xMTEiLCJleHAiOjE3MTUyMjAzOTUsImlhdCI6MTcxNTIxNjc5NX0.r1PzfBaJJSplfgoFyX4-YvAkFPqmovgUoA1cgv7CEfs', '2024-05-09 03:06:35', 18, 'admin2', 0),
(3, NULL, 'ADMIN1', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjMsInJvbGUiOm51bGwsInVzZXIiOiJBRE1JTjEiLCJleHAiOjE3MDcwMzc0NjIsImlhdCI6MTcwNzAzMzg2Mn0.qiupxDDsYKOXjhZwJOGir9yBYDQa8c1PNkwYbc2NfiQ', '2024-02-04 09:04:22', NULL, NULL, 0),
(4, NULL, '01585', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, 0, '', NULL, NULL, NULL, 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ids`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
