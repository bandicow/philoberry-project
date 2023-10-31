/*
  Warnings:

  - You are about to drop the column `image_url` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `mainImageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `ProductImage` table. All the data in the column will be lost.
  - Added the required column `order` to the `Artwork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s3key` to the `Artwork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s3key` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Artwork` DROP COLUMN `image_url`,
    ADD COLUMN `order` INTEGER NOT NULL,
    ADD COLUMN `s3key` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `mainImageUrl`,
    ADD COLUMN `mainImage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ProductImage` DROP COLUMN `url`,
    ADD COLUMN `s3key` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Setting` MODIFY `id` INTEGER NOT NULL DEFAULT 100;
