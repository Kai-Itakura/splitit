/*
  Warnings:

  - You are about to drop the column `mimetype` on the `ProfileImage` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `ProfileImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProfileImage" DROP COLUMN "mimetype",
DROP COLUMN "size";
