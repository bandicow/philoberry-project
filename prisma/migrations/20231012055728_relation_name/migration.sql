/*
  Warnings:

  - You are about to drop the column `artist_id` on the `Artwork` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artist_name` to the `Artwork` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Artwork` DROP FOREIGN KEY `Artwork_artist_id_fkey`;

-- AlterTable
ALTER TABLE `Artwork` DROP COLUMN `artist_id`,
    ADD COLUMN `artist_name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Artist_name_key` ON `Artist`(`name`);

-- AddForeignKey
ALTER TABLE `Artwork` ADD CONSTRAINT `Artwork_artist_name_fkey` FOREIGN KEY (`artist_name`) REFERENCES `Artist`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
