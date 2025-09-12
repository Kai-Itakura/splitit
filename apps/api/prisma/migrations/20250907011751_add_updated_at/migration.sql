/*
  Warnings:

  - Added the required column `updatedAt` to the `ProfileImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfileImage" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
