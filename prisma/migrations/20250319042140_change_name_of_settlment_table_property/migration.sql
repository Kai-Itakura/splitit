/*
  Warnings:

  - You are about to drop the column `paid` on the `Settlement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settlement" DROP COLUMN "paid",
ADD COLUMN     "isSettled" BOOLEAN NOT NULL DEFAULT false;
