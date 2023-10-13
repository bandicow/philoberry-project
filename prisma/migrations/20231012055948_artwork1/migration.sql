/*
  Warnings:

  - You are about to drop the column `dimensions` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `medium` on the `Artwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Artwork` DROP COLUMN `dimensions`,
    DROP COLUMN `medium`,
    ADD COLUMN `material` VARCHAR(191) NULL,
    ADD COLUMN `size` VARCHAR(191) NULL;
