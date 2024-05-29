/*
  Warnings:

  - Made the column `bookId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_collectionId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "bookId" SET NOT NULL;
