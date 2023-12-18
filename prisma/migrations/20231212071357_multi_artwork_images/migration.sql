-- CreateTable
CREATE TABLE `ArtworkImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `s3key` VARCHAR(191) NOT NULL,
    `artworkId` INTEGER NOT NULL,

    INDEX `ArtworkImages_artworkId_fkey`(`artworkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArtworkImages` ADD CONSTRAINT `ArtworkImages_artworkId_fkey` FOREIGN KEY (`artworkId`) REFERENCES `Artwork`(`artwork_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
