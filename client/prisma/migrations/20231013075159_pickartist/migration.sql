/*
  Warnings:

  - Made the column `price` on table `Artwork` required. This step will fail if there are existing NULL values in that column.
  - Made the column `material` on table `Artwork` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `Artwork` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Artwork` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Artwork` MODIFY `price` DOUBLE NOT NULL,
    MODIFY `material` VARCHAR(191) NOT NULL,
    MODIFY `size` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PickArtist` (
    `id` INTEGER NOT NULL DEFAULT 100,
    `artist_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
