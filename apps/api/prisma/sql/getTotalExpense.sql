SELECT
  SUM(e."amount")
FROM
  "Expense" e
WHERE e."groupId" = $1