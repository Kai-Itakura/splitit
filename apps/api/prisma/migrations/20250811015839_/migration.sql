/*
  Warnings:

  - The primary key for the `ProfileImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProfileImage` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ProfileImage_userId_key";

-- AlterTable
ALTER TABLE "ProfileImage" DROP CONSTRAINT "ProfileImage_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ProfileImage_pkey" PRIMARY KEY ("userId");
