/*
  Warnings:

  - You are about to drop the `DownloadVerification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DownloadVerification" DROP CONSTRAINT "DownloadVerification_bookId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "bookId" DROP NOT NULL,
ALTER COLUMN "collectionId" DROP NOT NULL;

-- DropTable
DROP TABLE "DownloadVerification";
