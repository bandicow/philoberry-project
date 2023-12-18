/*
  Warnings:

  - You are about to drop the column `s3key` on the `artwork` table. All the data in the column will be lost.
  - Added the required column `mainImage` to the `Artwork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `artwork` DROP COLUMN `s3key`,
    ADD COLUMN `mainImage` VARCHAR(191) NOT NULL;
