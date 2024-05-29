/*
  Warnings:

  - Changed the type of `type` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BookType" AS ENUM ('Book', 'Collection');

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "type",
ADD COLUMN     "type" "BookType" NOT NULL;
