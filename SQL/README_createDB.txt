Creates the database and populates with dummy data
Execute SQL scripts in order:
-create_tables.sql
-insert_product.sql
-insert_order.sql
-insert_batch.sql
-insert_comment.sql
-insert_floorstock_item.sql
-insert_operation_statistic.sql
-insert_floorstock_statistic.sql

Execute 'drop_tables.sql' for clearing database.

OBS:
For intervals between two whole hours time stamps are placed at the first hour, 
eg. 00:00 for time between 24:00-01:00