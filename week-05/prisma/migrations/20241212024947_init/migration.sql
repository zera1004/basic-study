-- CreateTable
CREATE TABLE `Players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `speed` INTEGER NOT NULL,
    `shooting` INTEGER NOT NULL,

    UNIQUE INDEX `Players_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
