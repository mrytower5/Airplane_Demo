-- update_user.sql
update comments 
set status = :status
where customer_id = :customer_id
returning *; 

update comment_detail 
set status = :status
where customer_id = :customer_id
returning *; 