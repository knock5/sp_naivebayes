SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_sp_naivebayes`
--

-- --------------------------------------------------------

--
-- Table structure for table `cust`
--

CREATE TABLE `cust` (
  `cust_id` int(11) NOT NULL,
  `nama` varchar(191) NOT NULL,
  `umur` int(11) NOT NULL,
  `status_pernikahan` enum('lajang','menikah') NOT NULL,
  `pekerjaan` enum('PNS','petani','pengangguran','pelajar','karyawan') NOT NULL,
  `penghasilan` varchar(191) NOT NULL,
  `jaminan` enum('KTP','BPKB') NOT NULL,
  `tempat_tinggal` enum('sendiri','kontrak') NOT NULL,
  `hasil` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cust`
--

INSERT INTO `cust` (`cust_id`, `nama`, `umur`, `status_pernikahan`, `pekerjaan`, `penghasilan`, `jaminan`, `tempat_tinggal`, `hasil`) VALUES
(7, 'Budiono Sudarsono', 35, 'menikah', 'PNS', '3750000', 'KTP', 'sendiri', 'Layak'),
(8, 'Roberto Carlos', 31, 'menikah', 'karyawan', '4250000', 'BPKB', 'sendiri', 'Layak'),
(9, 'Luke Skywalker', 24, 'lajang', 'karyawan', '4250000', 'BPKB', 'kontrak', 'Layak');

-- --------------------------------------------------------

--
-- Table structure for table `dataset`
--

CREATE TABLE `dataset` (
  `dataset_id` int(11) NOT NULL,
  `umur` int(11) NOT NULL,
  `status_pernikahan` enum('lajang','menikah') NOT NULL,
  `pekerjaan` enum('PNS','petani','pengangguran','pelajar','karyawan') NOT NULL,
  `penghasilan` varchar(191) NOT NULL,
  `tempat_tinggal` enum('sendiri','kontrak') NOT NULL,
  `jaminan` enum('KTP','BPKB') NOT NULL,
  `hasil` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dataset`
--

INSERT INTO `dataset` (`dataset_id`, `umur`, `status_pernikahan`, `pekerjaan`, `penghasilan`, `tempat_tinggal`, `jaminan`, `hasil`) VALUES
(2, 45, 'menikah', 'petani', '3000000', 'sendiri', 'BPKB', 'layak'),
(3, 50, 'menikah', 'PNS', '5000000', 'sendiri', 'BPKB', 'layak'),
(4, 48, 'menikah', 'karyawan', '2500000', 'sendiri', 'KTP', 'layak'),
(5, 38, 'menikah', 'petani', '2000000', 'sendiri', 'KTP', 'tidak layak'),
(6, 30, 'lajang', 'petani', '1500000', 'kontrak', 'KTP', 'tidak layak'),
(7, 25, 'lajang', 'karyawan', '1300000', 'sendiri', 'KTP', 'layak'),
(8, 33, 'menikah', 'PNS', '4500000', 'kontrak', 'BPKB', 'tidak layak'),
(9, 60, 'menikah', 'PNS', '5000000', 'sendiri', 'BPKB', 'layak'),
(10, 24, 'lajang', 'pengangguran', '2000000', 'sendiri', 'KTP', 'layak'),
(11, 29, 'menikah', 'karyawan', '3500000', 'kontrak', 'BPKB', 'tidak layak');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `nama` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `nama`) VALUES
(1, 'admin'),
(2, 'bendahara');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `nama` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `roleId` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `nama`, `email`, `password`, `roleId`, `created_at`, `updated_at`) VALUES
(2, 'Silvi', 'silvi@gmail.com', '$2b$10$kcTJymdx7H.OY2EWNUKByeFDBD9jprfz.ifhcMhU4vhqmDszt5Jfe', 2, '2024-06-25 04:18:42.082', '2024-06-25 04:18:42.082'),
(16, 'Selvi', 'selvi@gmail.com', '$2b$10$s1u.m6qlgXBKjunvnxpOhuJJoCaQL8LgEdki4n2RmB4s72vhG7YBK', 1, '2024-06-25 04:59:55.478', '2024-06-25 04:59:55.478'),
(30, 'loli tamara', 'loli@gmail.com', '$2b$10$/7I6thUAJQUwCW8RPqUjXOdcdeVS.zkmN8F30F6mPetk95ZFm.Dpu', 2, '2024-06-25 05:10:47.335', '2024-06-25 05:10:47.335');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('10fdf11e-332e-43f4-b258-87b21172ef78', '1c27e5e2a66351a3d79303744216604f972ef3cdb4b3f4743808faa16e1ad9c9', '2024-06-25 04:17:19.601', '20240625041719_init', NULL, NULL, '2024-06-25 04:17:19.489', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cust`
--
ALTER TABLE `cust`
  ADD PRIMARY KEY (`cust_id`);

--
-- Indexes for table `dataset`
--
ALTER TABLE `dataset`
  ADD PRIMARY KEY (`dataset_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `Role_nama_key` (`nama`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD KEY `User_roleId_fkey` (`roleId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cust`
--
ALTER TABLE `cust`
  MODIFY `cust_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `dataset`
--
ALTER TABLE `dataset`
  MODIFY `dataset_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role` (`role_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
