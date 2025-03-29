/*
  Warnings:

  - Added the required column `amount` to the `Settlement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Settlement" ADD COLUMN     "amount" INTEGER NOT NULL;
