/*
  Warnings:

  - You are about to drop the `artworkimages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `artworkimages` DROP FOREIGN KEY `ArtworkImages_artworkId_fkey`;

-- DropTable
DROP TABLE `artworkimages`;

-- CreateTable
CREATE TABLE `ArtworkImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `s3key` VARCHAR(191) NOT NULL,
    `artworkId` INTEGER NOT NULL,

    INDEX `ArtworkImages_artworkId_fkey`(`artworkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArtworkImage` ADD CONSTRAINT `ArtworkImage_artworkId_fkey` FOREIGN KEY (`artworkId`) REFERENCES `Artwork`(`artwork_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
