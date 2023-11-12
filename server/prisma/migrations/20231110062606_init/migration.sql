-- CreateTable
CREATE TABLE `Artist` (
    `artist_id` INTEGER NOT NULL AUTO_INCREMENT,
    `artist_image` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `major` VARCHAR(191) NULL,
    `profile` VARCHAR(191) NULL,
    `website_url` VARCHAR(191) NULL,

    UNIQUE INDEX `Artist_name_key`(`name`),
    PRIMARY KEY (`artist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artwork` (
    `artwork_id` INTEGER NOT NULL AUTO_INCREMENT,
    `artist_name` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `s3key` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` INTEGER NULL,
    `material` VARCHAR(191) NOT NULL,
    `size` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `isSold` BOOLEAN NOT NULL,
    `order` INTEGER NOT NULL,

    PRIMARY KEY (`artwork_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `material` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `size` VARCHAR(191) NULL,
    `details` VARCHAR(191) NULL,
    `precautions` VARCHAR(191) NULL,
    `mainImage` VARCHAR(191) NULL,
    `seller` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,
    `url` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Product_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `s3key` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setting` (
    `id` INTEGER NOT NULL DEFAULT 100,
    `backgroundColor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PickArtist` (
    `id` INTEGER NOT NULL DEFAULT 100,
    `artist_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Artwork` ADD CONSTRAINT `Artwork_artist_name_fkey` FOREIGN KEY (`artist_name`) REFERENCES `Artist`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
