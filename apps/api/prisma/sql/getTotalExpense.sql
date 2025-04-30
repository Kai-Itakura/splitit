-- @prisma {String} $1:groupId
SELECT
  SUM(e."amount") as "totalExpense"
FROM
  "Expense" e
WHERE e."groupId" = $1