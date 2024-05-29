/*
  Warnings:

  - You are about to drop the column `orderType` on the `Order` table. All the data in the column will be lost.
  - Made the column `bookId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_collectionId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderType",
ALTER COLUMN "bookId" SET NOT NULL;

-- DropEnum
DROP TYPE "OrderType";
