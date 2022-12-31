-- Add your SQL queries here.
-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
SELECT 
    comment,
    num_offenses
 FROM 
    comment_detail 
WHERE customer_id = :customer_id; 

