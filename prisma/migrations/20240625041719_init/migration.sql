-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dataset` (
    `dataset_id` INTEGER NOT NULL AUTO_INCREMENT,
    `umur` INTEGER NOT NULL,
    `status_pernikahan` ENUM('lajang', 'menikah') NOT NULL,
    `pekerjaan` ENUM('PNS', 'petani', 'pengangguran', 'pelajar', 'karyawan') NOT NULL,
    `penghasilan` VARCHAR(191) NOT NULL,
    `tempat_tinggal` ENUM('sendiri', 'kontrak') NOT NULL,
    `jaminan` ENUM('KTP', 'BPKB') NOT NULL,
    `hasil` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`dataset_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_nama_key`(`nama`),
    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cust` (
    `cust_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `umur` INTEGER NOT NULL,
    `status_pernikahan` ENUM('lajang', 'menikah') NOT NULL,
    `pekerjaan` ENUM('PNS', 'petani', 'pengangguran', 'pelajar', 'karyawan') NOT NULL,
    `penghasilan` VARCHAR(191) NOT NULL,
    `jaminan` ENUM('KTP', 'BPKB') NOT NULL,
    `tempat_tinggal` ENUM('sendiri', 'kontrak') NOT NULL,
    `hasil` VARCHAR(191) NULL,

    PRIMARY KEY (`cust_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
