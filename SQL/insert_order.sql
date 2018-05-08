INSERT INTO production_order (order_number, article_number)
	VALUES ('1111111', 
			(SELECT article_number FROM product WHERE article_number = '700-5280'));
            
INSERT INTO production_order (order_number, article_number)
	VALUES ('2222222', 
			(SELECT article_number FROM product WHERE article_number = '700-5208'));
            
INSERT INTO production_order (order_number, article_number)
	VALUES ('3333333', 
			(SELECT article_number FROM product WHERE article_number = '700-5208'));
            
INSERT INTO production_order (order_number, article_number)
	VALUES ('4444444', 
			(SELECT article_number FROM product WHERE article_number = '700-5288'));