/*
  Warnings:

  - You are about to drop the column `image` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `prise` on the `products` table. All the data in the column will be lost.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "image",
DROP COLUMN "prise",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "price" INTEGER NOT NULL;
