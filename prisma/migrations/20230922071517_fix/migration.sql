/*
  Warnings:

  - You are about to drop the column `url` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Product_url_key` ON `Product`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `url`,
    ADD COLUMN `mainImageUrl` VARCHAR(191) NULL;
