/*
  Warnings:

  - You are about to drop the column `expneseId` on the `ExpenseShare` table. All the data in the column will be lost.
  - You are about to drop the `_GroupToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `expenseId` to the `ExpenseShare` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExpenseShare" DROP CONSTRAINT "ExpenseShare_expneseId_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_B_fkey";

-- AlterTable
ALTER TABLE "ExpenseShare" DROP COLUMN "expneseId",
ADD COLUMN     "expenseId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_GroupToUser";

-- CreateTable
CREATE TABLE "_EventGroupToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EventGroupToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EventGroupToUser_B_index" ON "_EventGroupToUser"("B");

-- AddForeignKey
ALTER TABLE "ExpenseShare" ADD CONSTRAINT "ExpenseShare_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventGroupToUser" ADD CONSTRAINT "_EventGroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventGroupToUser" ADD CONSTRAINT "_EventGroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
