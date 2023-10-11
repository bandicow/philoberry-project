/*
  Warnings:

  - You are about to drop the column `nationality` on the `Artist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Artist` DROP COLUMN `nationality`,
    ADD COLUMN `major` VARCHAR(191) NULL;
