/*
  Warnings:

  - The primary key for the `Artist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Artist` table. All the data in the column will be lost.
  - The primary key for the `Artwork` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `artistId` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `isFavorited` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `artist_id` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artist_id` to the `Artwork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artwork_id` to the `Artwork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Artwork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isSold` to the `Artwork` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Artwork` DROP FOREIGN KEY `Artwork_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_productId_fkey`;

-- DropIndex
DROP INDEX `Artist_email_key` ON `Artist`;

-- AlterTable
ALTER TABLE `Artist` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `id`,
    ADD COLUMN `artist_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `artist_image` VARCHAR(191) NULL,
    ADD COLUMN `nationality` VARCHAR(191) NULL,
    ADD COLUMN `profile` VARCHAR(191) NULL,
    ADD COLUMN `website_url` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`artist_id`);

-- AlterTable
ALTER TABLE `Artwork` DROP PRIMARY KEY,
    DROP COLUMN `artistId`,
    DROP COLUMN `content`,
    DROP COLUMN `id`,
    ADD COLUMN `artist_id` INTEGER NOT NULL,
    ADD COLUMN `artwork_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `createdAt` DATETIME(3) NULL,
    ADD COLUMN `dimensions` VARCHAR(191) NULL,
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `isSold` BOOLEAN NOT NULL,
    ADD COLUMN `medium` VARCHAR(191) NULL,
    ADD COLUMN `price` DOUBLE NULL,
    ADD PRIMARY KEY (`artwork_id`);

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `isFavorited`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `Image`;

-- CreateTable
CREATE TABLE `ProductImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Artwork` ADD CONSTRAINT `Artwork_artist_id_fkey` FOREIGN KEY (`artist_id`) REFERENCES `Artist`(`artist_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
