-- AlterTable
ALTER TABLE "Expense"
ALTER COLUMN "createdAt"
DROP DEFAULT;

UPDATE "Expense"
SET
  "createdAt" = CURRENT_TIMESTAMP;