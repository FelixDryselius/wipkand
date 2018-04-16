drop table batch_comment;
drop table batch;
drop table product_order;
drop table product;

CREATE TABLE product
(
  article_number char(8) NOT NULL,
  product_name varchar(255),
  reference_storage INT,
  label varchar(255),
  PRIMARY KEY (article_number)
);


CREATE TABLE product_order
(
  order_number char(7) NOT NULL,
  article_number char(8) NOT NULL,
  PRIMARY KEY (order_number),
  FOREIGN KEY (article_number) REFERENCES product(article_number)
);

CREATE TABLE batch
(
  batch_number char(10) NOT NULL,
  start_date datetime,
  end_date datetime,
  scrap INT,
  yield_1 INT,
  HMI1_good INT,
  HMI1_bad INT,
  HMI2_good INT,
  HMI2_bad INT,
  rework_date datetime,
  applied_labels INT,
  label_print_time datetime, 
  rework_time time,
  yield_2 INT,
  order_number char(7) NOT NULL,
  PRIMARY KEY (batch_number),
  FOREIGN KEY (order_number) REFERENCES product_order(order_number)
);

CREATE TABLE batch_comment
(
  comment_ID int NOT NULL,
  user_name varchar(255),
  post_date datetime,
  text_comment text ,
  batch_number char(10),
  PRIMARY KEY (comment_ID, batch_number),
  FOREIGN KEY (batch_number) REFERENCES batch(batch_number)
);


INSERT INTO product (article_number, product_name, reference_storage, label)
VALUES ('700-5208', 'ASSY,WRAP,10 8ML SAMPLE RGT,IVD,GX,MTB', 5, '700-5208_LABEL');

INSERT INTO product (article_number, product_name, reference_storage, label)
VALUES ('700-5194', 'ASSY,WRAP,10 ELUTION,IVD,GX,MRSA/SA', 0, '700-5194_LABEL');

INSERT INTO product (article_number, product_name, reference_storage, label)
VALUES ('700-5196', 'ASSY,WRAP,10 ELUTION,IVD,GX,C.DIFFICILE', 6, '700-5196_LABEL');

INSERT INTO product (article_number, product_name, reference_storage, label)
VALUES ('700-5197', 'ASSY,WRAP,10 ELUTION,IVD,GX,SA COMP', 6, '700-5197_LABEL');

INSERT INTO product (article_number, product_name, reference_storage, label)
VALUES ('700-5280', 'ASSY,WRAP,10 ELUTION,IVD,GX,MRSA NXG', 0, '700-5280_LABEL');

INSERT INTO product (article_number, product_name, reference_storage, label)
VALUES ('700-5288', 'ASSY,WRAP,10 ELUTION,IVD,GX,MTB/RIF,JP', 0, '700-5288_LABEL');


INSERT INTO product_order (order_number, article_number)
	VALUES ('1111111', 
			(SELECT article_number FROM product WHERE article_number = '700-5280'));
            
INSERT INTO product_order (order_number, article_number)
	VALUES ('2222222', 
			(SELECT article_number FROM product WHERE article_number = '700-5208'));
            
INSERT INTO product_order (order_number, article_number)
	VALUES ('3333333', 
			(SELECT article_number FROM product WHERE article_number = '700-5208'));
            
INSERT INTO product_order (order_number, article_number)
	VALUES ('4444444', 
			(SELECT article_number FROM product WHERE article_number = '700-5288'));
            
            
INSERT INTO batch (batch_number, start_date, end_date, scrap, yield_1, HMI1_good, HMI1_bad, HMI2_good, HMI2_bad, 
rework_date, applied_labels, label_print_time, rework_time, yield_2, order_number)
	VALUES ('1000000001', '2018-03-01 07:30:00', '2018-03-02 16:24:03', 5, 14975, 73201, 1354, 73691, 1504,
			'2018-03-07 11:30:00', 1601, '2018-03-07 15:11:00', '00:29:21', 149650, 
			(SELECT order_number FROM product_order WHERE order_number = '1111111'));
            
INSERT INTO batch (batch_number, start_date, end_date, scrap, yield_1, HMI1_good, HMI1_bad, HMI2_good, HMI2_bad, 
rework_date, applied_labels, label_print_time, rework_time, yield_2, order_number)
	VALUES ('1000000002', '2018-03-03 11:34:00', '2018-03-04 22:24:03', 17, 15915, 69031, 1444, 71881, 1374,
			'2018-03-08 09:30:00', 1401, '2018-03-08 11:11:00', '00:36:21', 145699, 
			(SELECT order_number FROM product_order WHERE order_number = '1111111'));
            

INSERT INTO batch (batch_number, start_date, end_date, scrap, yield_1, HMI1_good, HMI1_bad, HMI2_good, HMI2_bad, 
rework_date, applied_labels, label_print_time, rework_time, yield_2, order_number)
	VALUES ('1000000003', '2018-03-04 23:44:20', '2018-03-06 16:55:43', 27, 15445, 61131, 1164, 73521, 1967,
			'2018-03-10 16:24:01', 1387, '2018-03-10 16:39:20', '00:31:21', 143298, 
			(SELECT order_number FROM product_order WHERE order_number = '2222222'));
            
INSERT INTO batch (batch_number, start_date, end_date, scrap, yield_1, HMI1_good, HMI1_bad, HMI2_good, HMI2_bad, 
rework_date, applied_labels, label_print_time, rework_time, yield_2, order_number)
	VALUES ('1000000004', '2018-03-11 05:44:28', '2018-03-12 11:43:41', 41, 13461, 69324, 1573, 71521, 1467,
			'2018-03-20 16:11:01', 1787, '2018-03-20 17:31:20', '00:44:15', 143298, 
			(SELECT order_number FROM product_order WHERE order_number = '3333333'));
            
INSERT INTO batch (batch_number, start_date, end_date, scrap, yield_1, HMI1_good, HMI1_bad, HMI2_good, HMI2_bad, 
rework_date, applied_labels, label_print_time, rework_time, yield_2, order_number)
	VALUES ('1000000005', '2018-03-12 21:15:28', '2018-03-15 05:23:41', 23, 13151, 70356, 1443, 71771, 1367,
			'2018-03-21 11:11:01', 1653, '2018-03-21 12:31:20', '00:33:15', 153198, 
			(SELECT order_number FROM product_order WHERE order_number = '4444444'));
            
            

INSERT INTO batch_comment (comment_ID, user_name, post_date, text_comment, batch_number)
VALUES (1, 'Helga', '2018-03-02 11:31:20', 'Batch Started', '1000000001');

INSERT INTO batch_comment (comment_ID, user_name, post_date, text_comment, batch_number)
VALUES (2, 'Johan', '2018-03-02 12:31:20', 'Something happened', '1000000001');

INSERT INTO batch_comment (comment_ID, user_name, post_date, text_comment, batch_number)
VALUES (1, 'Felix', '2018-03-03 12:33:20', 'Batch Started', '1000000002');

INSERT INTO batch_comment (comment_ID, user_name, post_date, text_comment, batch_number)
VALUES (1, 'Simon', '2018-03-05 09:22:46', 'Batch Started', '1000000003');

INSERT INTO batch_comment (comment_ID, user_name, post_date, text_comment, batch_number)
VALUES (1, 'Tesla', '2018-03-11 10:43:46', 'Batch Started', '1000000004');

INSERT INTO batch_comment (comment_ID, user_name, post_date, text_comment, batch_number)
VALUES (1, 'John Oliver', '2018-03-12 23:18:46', 'Batch Started', '1000000005');

INSERT INTO batch_comment (comment_ID, user_name, post_date, text_comment, batch_number)
VALUES (2, 'Melinda', '2018-03-12 23:44:46', 'Machine exploded', '1000000005');

INSERT INTO batch_comment (comment_ID, user_name, post_date, text_comment, batch_number)
VALUES (3, 'Bill Gates','2018-03-13 00:11:33', 'We had a party', '1000000005');

INSERT INTO batch_comment (comment_ID, user_name, post_date, text_comment, batch_number)
VALUES (4, 'Zuckerberg','2018-03-13 02:31:31', 'Manager joined us!', '1000000005');

