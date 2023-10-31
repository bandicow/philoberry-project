/*
  Warnings:

  - You are about to drop the column `descripton` on the `Artwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Artwork` DROP COLUMN `descripton`,
    ADD COLUMN `description` VARCHAR(191) NULL;
