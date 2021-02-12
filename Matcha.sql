-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.99.100
-- Generation Time: Feb 12, 2021 at 04:59 PM
-- Server version: 8.0.23
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Matcha`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`%` PROCEDURE `delete_like` ()  BEGIN
        DELETE FROM blocked WHERE HOUR(TIMEDIFF(created_at, now())) >= 10 AND dlt = 1;
    END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `blocked`
--

CREATE TABLE `blocked` (
  `id` int NOT NULL,
  `blocker` int NOT NULL,
  `blocked` int NOT NULL,
  `dlt` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int NOT NULL,
  `visitor_id` int NOT NULL,
  `visited_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `visitor_id`, `visited_id`, `created_at`) VALUES
(1, 1, 2, '2021-02-08 14:14:56'),
(3, 1, 4, '2021-02-08 14:19:24'),
(4, 1, 6, '2021-02-08 16:38:01'),
(5, 1, 8, '2021-02-08 16:38:05'),
(6, 1, 14, '2021-02-08 16:38:07'),
(9, 1, 15, '2021-02-09 16:35:35'),
(10, 1, 12, '2021-02-09 16:36:13'),
(11, 2, 5, '2021-02-10 16:18:33'),
(12, 2, 7, '2021-02-10 16:18:43'),
(13, 3, 14, '2021-02-12 15:44:08');

-- --------------------------------------------------------

--
-- Table structure for table `imgProfil`
--

CREATE TABLE `imgProfil` (
  `id` int NOT NULL,
  `users_id` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `pointer` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `liker` int NOT NULL,
  `liked` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int NOT NULL,
  `users_id` int NOT NULL,
  `city` varchar(255) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `long` float(10,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `users_id`, `city`, `lat`, `long`) VALUES
(1, 1, 'Northwest', 65.135612, -19.075956),
(3, 2, 'Azamor', 33.119366, -8.325620),
(4, 3, 'Tagleft', 32.252300, -6.257130),
(5, 5, 'Tagleft', 32.262299, -6.256130),
(6, 4, 'Ouled', 32.362301, -6.356130),
(7, 7, 'Ouled', 32.462299, -6.456130),
(8, 8, 'Oulad', 32.562302, -6.556130),
(9, 9, 'Bni', 32.662300, -6.656130),
(10, 10, 'Oulad', 32.762299, -6.756130),
(11, 11, 'Boulanouare', 32.862301, -6.856130),
(12, 12, 'Oulad', 32.962299, -6.956130),
(14, 14, 'M\'Garto', 33.162300, -7.156130),
(15, 15, 'El', 33.262299, -7.256130),
(16, 16, 'Oulad', 33.362301, -7.356130),
(17, 13, 'Casablanca', 33.562302, -7.556130),
(18, 6, 'Sidi', 33.502300, -7.506130);

-- --------------------------------------------------------

--
-- Table structure for table `matchs`
--

CREATE TABLE `matchs` (
  `id` int NOT NULL,
  `liker` int NOT NULL,
  `liked` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `name`) VALUES
(1, '#chess'),
(2, '#sport'),
(3, '#wine'),
(4, '#party'),
(5, '#weed'),
(6, '#rock'),
(7, '#metal'),
(8, '#rap'),
(9, '#reading'),
(10, '#coding'),
(11, '#docker'),
(12, '#blues'),
(13, '#matcha'),
(14, '#smart'),
(15, '#peterson'),
(16, '#tinder'),
(17, '#geek'),
(18, '#fuckU');

-- --------------------------------------------------------

--
-- Table structure for table `tag_user`
--

CREATE TABLE `tag_user` (
  `id` int NOT NULL,
  `users_id` int NOT NULL,
  `tag_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tag_user`
--

INSERT INTO `tag_user` (`id`, `users_id`, `tag_id`) VALUES
(9, 3, 5),
(10, 3, 13),
(11, 4, 1),
(12, 4, 16),
(13, 4, 14),
(14, 4, 4),
(15, 5, 13),
(16, 5, 14),
(17, 5, 7),
(18, 5, 8),
(19, 5, 8),
(20, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `oauth_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `vkey` varchar(255) NOT NULL,
  `verify` int NOT NULL DEFAULT '0',
  `age` int DEFAULT NULL,
  `gender` enum('Male','Women','Both') DEFAULT NULL,
  `type` enum('Male','Women','Both') DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `fameRating` int DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `oauth_id`, `email`, `userName`, `firstName`, `lastName`, `password`, `vkey`, `verify`, `age`, `gender`, `type`, `bio`, `fameRating`) VALUES
(1, NULL, 'hassanseffiani@gmail.com', 'hsf', 'hsf', 'killer', '$2b$10$LEb3P9Oh7hIiV/peSVcq0ukVzXKYJghlm56yErcQfErnC3mIKo2Di', '8ed36dad89cc210327dc5f1bf7b125af8257cb2d17fdeed0a5a35363c18d91ed', 1, NULL, NULL, NULL, NULL, 300),
(2, NULL, 'hassanseffiani1@gmail.com', 'hsf1', 'hsf', 'killer', '$2b$10$uosJXbLE6wakMcuf0eQj4OHPjcnP927gyWAcgkubtc.3jsO8JUQN2', '38f5a1f3990219e246ba81c0b44e38d0011225e74fea1c7ff7aba97f9e5e6eee', 1, 19, 'Male', 'Women', 'ewqe', 101),
(3, NULL, 'hassanseffiani2@gmail.com', 'hsf2', 'hsf', 'killer', '$2b$10$D5oIGX0rnur68i0rPnAOe.3VuqUQmLJW/dHTYClcpEK/82vAe9fDW', '6728794d2be2ee19a7cc92edd3667ba692666bf6320d8533a479d8de1070e7b1', 1, 20, 'Male', 'Women', 'hsf3', 158),
(4, NULL, 'hassanseffiani3@gmail.com', 'hsf3', 'hsf', 'killer', '$2b$10$fbKE8bU3k.u6gvwiG9/8JegMumYukM1wHIZN6MxZAMew6P58YZpKK', 'dc2c19b64d0a577c53e31241e2c7a9ba252c33b43accf00ba1b59d2956914601', 1, 21, 'Women', 'Male', 'hsf4', 85),
(5, NULL, 'hassanseffiani5@gmail.com', 'hsf5', 'hsf', 'killer', '$2b$10$piZs9lmFc0C.VKdA3R7bquXHE684gVZapws95JFi2OcwfPKs798Ry', 'e9456c8ddf6d785b5e6c3edf0ba5acf3da8c6b9d364b148335e49456e97db76e', 1, 22, 'Male', 'Women', 'hsf5', 87),
(6, NULL, 'hassanseffiani6@gmail.com', 'hsf6', 'hsf', 'killer', '$2b$10$1SPkAcfUuL9DdJ6VKL1jruskJ1IaJ3gnbtFGrWudG.VwAd5tZXo1S', '6bb02f4cd101c8f1b335a09a2b5348c333b8f829615daf995b848ab78cf23071', 1, 23, 'Women', 'Male', 'hsf6', 800),
(7, NULL, 'hassanseffiani7@gmail.com', 'hsf7', 'hsf', 'killer', '$2b$10$cODooAVZu8T0QoaWOlFgPuumwmznkUY0etEE3KdPvaREuk97OH4vi', '2c63da54c98c898388830940fb940d00572a26ca46e690f1b363b32c93e2b539', 1, 24, 'Male', 'Women', 'hsf7', 78),
(8, NULL, 'hassanseffiani8@gmail.com', 'hsf8', 'hsf', 'killer', '$2b$10$hTjDZwFzQ.Uavk9Lo5aALejyMNuZDmfVwZDw5XaxeDnU6LzlRWzNq', '97be55b68b72a7c0ef398f6669ba35504f2723657e87e7abda012f141e2c953f', 1, 25, 'Women', 'Male', 'hsf8', 158),
(9, NULL, 'hassanseffiani9@gmail.com', 'hsf9', 'hsf', 'killer', '$2b$10$zHASi/H3aNiIIjZxoquiOufGXErwof7lImISY//51k7XwMuCwwuiW', '350ed02542008080850a19376e54df7d7640c9474149946ddaf91f05a34b22ef', 1, 26, 'Male', 'Both', 'hsf9', 85),
(10, NULL, 'hassanseffiani10@gmail.com', 'hsf10', 'hsf', 'killer', '$2b$10$/FhpHO1B0sRmS0A09uPa9Ot9v8t3Iq/58YHxpF33PxXJw9tncv75q', '03079b90a25d19a503d3ce87577aff440cef60aae89b30cc9f56a19fcc0b69ab', 1, 27, 'Both', 'Women', 'hsf10', 58),
(11, NULL, 'hassanseffiani11@gmail.com', 'hsf11', 'hsf', 'killer', '$2b$10$Gk5j8x1utFP5oK9H9jIjMuejSYpUHxCogsF.YQl/Xp.j9FH2vLduK', '975ed4f9217b165e7193aa9de03acb4d03f235d2e33c7b3fd6f2bc9c05b361d0', 1, 28, 'Male', 'Women', 'hsf11', 52),
(12, NULL, 'hassanseffiani12@gmail.com', 'hsf12', 'hsf', 'killer', '$2b$10$2beIBJkgihiXWCM50jaydOEuzcB7L3QlQMalmOubA33hDOZPbSXni', '8ad44838a863f5bc0189b452f289e93c46994507bcb32ece87f29c1ab1ee0f34', 1, 29, 'Women', 'Both', 'hsf12', 300),
(13, NULL, 'hassanseffiani13@gmail.com', 'hsf13', 'hsf', 'killer', '$2b$10$r7Exv8nTg.f4zUmnuFvVvuhF2ZNIcYb6wIb22T0E6Wzq4Qwi3yKCy', '538eb74b99ddbdc7c67677642f5865ca8f8fb785692883aa7586458f7e40b35c', 1, 30, 'Male', 'Women', 'hsf13', 25),
(14, NULL, 'hassanseffiani14@gmail.com', 'hsf14', 'hsf', 'killer', '$2b$10$Gnkm8CKx0u.60Xm55TkbxOLv4UTvyh4KUmf5Z1KV3VQkvmoa1iYYm', '68539e1c7c9498700fd885300c4c7da495062e08b7c5b386f95b94f90203cd79', 1, 31, 'Women', 'Male', 'hsf14', 600),
(15, NULL, 'hassanseffiani15@gmail.com', 'hsf15', 'hsf', 'killer', '$2b$10$QnyzItAyGqFkLggZQnpRw.vVUeV6HW34FV6bApSEsI4P3JuyyyNhO', '3bb2d8045d1481f43e4fa1fe78a14ca572742d8c7cae702e6ff7e5f7a0eafbf1', 1, 32, 'Women', 'Male', 'hsf15', 200),
(16, NULL, 'hassanseffiani16@gmail.com', 'hsf16', 'hsf', 'killer', '$2b$10$trUxriEmMveAO3HSI0wsx.1m1gkXm.DO30kNnRlcdvnsmsihb8fRy', '8aeb7b2d8667ccd9dcc6f962365b05f12bf0c95844086c86f71633d77c8fdd0e', 1, 33, 'Male', 'Women', 'hsf16', 25),
(17, '100162585403909249676', 'hassanseffiani@gmail.com', 'Oli Hsf', 'Oli', 'Hsf', '*', 'ya29.A0AfH6SMCjTG_IIf8-eRlaNtsi7JJsiqFUmxHsUV1H_wCGtiPUwI5d19T_BYvSa99trN1lh5-2IZq6aQKiP72maXfwt95Mz5ipJbPE00hwJ6UDGpoxYxBTieKGpt5klMnSgB6QlRANzo3atNjgMhnv1FlsLdhB', 1, 22, 'Male', 'Women', 'wqew', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocked`
--
ALTER TABLE `blocked`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imgProfil`
--
ALTER TABLE `imgProfil`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indexes for table `matchs`
--
ALTER TABLE `matchs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tag_user`
--
ALTER TABLE `tag_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocked`
--
ALTER TABLE `blocked`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `imgProfil`
--
ALTER TABLE `imgProfil`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `matchs`
--
ALTER TABLE `matchs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tag_user`
--
ALTER TABLE `tag_user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `imgProfil`
--
ALTER TABLE `imgProfil`
  ADD CONSTRAINT `imgProfil_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tag_user`
--
ALTER TABLE `tag_user`
  ADD CONSTRAINT `tag_user_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tag_user_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`%` EVENT `myevent` ON SCHEDULE EVERY 1 SECOND STARTS '2021-02-05 16:21:51' ON COMPLETION NOT PRESERVE ENABLE DO CALL delete_like()$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
