/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Settlement` table. All the data in the column will be lost.
  - Added the required column `payeeId` to the `Settlement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Settlement" DROP CONSTRAINT "Settlement_receiverId_fkey";

-- AlterTable
ALTER TABLE "Settlement" DROP COLUMN "receiverId",
ADD COLUMN     "payeeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_payeeId_fkey" FOREIGN KEY ("payeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
