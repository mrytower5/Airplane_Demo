-- Add your SQL queries here.
-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
SELECT 
    customer_id,
    created_at, 
    email, 
    first_name,
    last_name,
    comment,
    status
FROM comments
WHERE
      first_name ILIKE CONCAT('%', cast(:keyword AS varchar), '%')
  OR last_name ILIKE CONCAT('%', cast(:keyword AS varchar), '%')
ORDER BY
    first_name; 
