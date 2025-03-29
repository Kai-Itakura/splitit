/*
  Warnings:

  - You are about to drop the column `amount` on the `ExpenseShare` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Group` table. All the data in the column will be lost.
  - Added the required column `title` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExpenseShare" DROP COLUMN "amount";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;
