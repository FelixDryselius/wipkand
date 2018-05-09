drop table batch_comment;
drop table production_statistic;
drop table floorstock_statistic;
drop table floorstock_item;
drop table batch;
drop table production_order;
drop table product;

CREATE TABLE product
(
  article_number char(8) NOT NULL,
  product_name varchar(255),
  reference_storage INT,
  label varchar(255),
  PRIMARY KEY (article_number)
);


CREATE TABLE production_order
(
  order_number char(7) NOT NULL,
  article_number char(8) NOT NULL,
  PRIMARY KEY (order_number),
  FOREIGN KEY (article_number) REFERENCES product(article_number)
);

CREATE TABLE batch
(
  ID int NOT NULL AUTO_INCREMENT,
  batch_number char(10) NOT NULL UNIQUE,
  start_date datetime,
  end_date datetime,
  scrap INT,
  production_yield INT,
  HMI1_good INT,
  HMI1_bad INT,
  HMI2_good INT,
  HMI2_bad INT,
  rework_date datetime,
  applied_labels INT,
  label_print_time datetime, 
  rework_time time,
  shifts int,
  production_order char(7) NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (production_order) REFERENCES production_order(order_number)
);

CREATE TABLE batch_comment
(
  comment_ID int NOT NULL AUTO_INCREMENT,
  user_name varchar(255),
  post_date datetime,
  text_comment text ,
  batch_id int,
  PRIMARY KEY (comment_ID),
  FOREIGN KEY (batch_id) REFERENCES batch(ID)
);

CREATE TABLE floorstock_item
(
  item_id varchar(255) NOT NULL,
  item_name varchar(255),
  PRIMARY KEY (item_id)
);

CREATE TABLE production_statistic
(
  time_stamp datetime NOT NULL,
  batch_id int NOT NULL,
  production_quantity INT,
  staff_quantity INT,
  PRIMARY KEY (time_stamp),
  FOREIGN KEY (batch_id) REFERENCES batch(ID)
);

CREATE TABLE floorstock_statistic
(
  ID int NOT NULL AUTO_INCREMENT,
  time_stamp datetime NOT NULL,
  floorstock_item_id char(255) NOT NULL,
  quantity INT,
  batch_id int NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (batch_id) REFERENCES batch(ID),
  FOREIGN KEY (floorstock_item_id) REFERENCES floorstock_item(item_id)
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
            
       
       
INSERT INTO batch (batch_number, start_date, end_date, scrap, production_yield, HMI1_good, HMI1_bad, HMI2_good, HMI2_bad, 
rework_date, applied_labels, label_print_time, rework_time, shifts, production_order)
	VALUES ('1000000001', '2018-03-01 07:30:00', '2018-03-02 16:24:03', 5, 14975, 73201, 1354, 73691, 1504,
			'2018-03-07 11:30:00', 1601, '2018-03-07 15:11:00', '00:29:21', 3,
			(SELECT order_number FROM production_order WHERE order_number = '1111111'));
            
INSERT INTO batch (batch_number, start_date, end_date, scrap, production_yield, HMI1_good, HMI1_bad, HMI2_good, HMI2_bad, 
rework_date, applied_labels, label_print_time, rework_time, shifts, production_order)
	VALUES ('1000000002', '2018-03-03 11:34:00', '2018-03-04 22:24:03', 17, 15915, 69031, 1444, 71881, 1374,
			'2018-03-08 09:30:00', 1401, '2018-03-08 11:11:00', '00:36:21', 3,
			(SELECT order_number FROM production_order WHERE order_number = '1111111'));
            

INSERT INTO batch (batch_number, start_date, end_date, scrap, production_yield, HMI1_good, HMI1_bad, HMI2_good, HMI2_bad, 
rework_date, applied_labels, label_print_time, rework_time, shifts, production_order)
	VALUES ('1000000003', '2018-03-04 23:44:20', '2018-03-06 16:55:43', 27, 15445, 61131, 1164, 73521, 1967,
			'2018-03-10 16:24:01', 1387, '2018-03-10 16:39:20', '00:31:21', 3,
			(SELECT order_number FROM production_order WHERE order_number = '2222222'));
            
INSERT INTO batch (batch_number, start_date, end_date, scrap, production_yield, HMI1_good, HMI1_bad, HMI2_good, HMI2_bad, 
rework_date, applied_labels, label_print_time, rework_time, shifts, production_order)
	VALUES ('1000000004', '2018-03-11 05:44:28', '2018-03-12 11:43:41', 41, 13461, 69324, 1573, 71521, 1467,
			'2018-03-20 16:11:01', 1787, '2018-03-20 17:31:20', '00:44:15', 3,
			(SELECT order_number FROM production_order WHERE order_number = '3333333'));
            
INSERT INTO batch (batch_number, start_date, end_date, scrap, production_yield, HMI1_good, HMI1_bad, HMI2_good, HMI2_bad, 
rework_date, applied_labels, label_print_time, rework_time, shifts, production_order)
	VALUES ('1000000005', '2018-03-12 21:15:28', '2018-03-15 05:23:41', 23, 13151, 70356, 1443, 71771, 1367,
			'2018-03-21 11:11:01', 1653, '2018-03-21 12:31:20', '00:33:15', 3,
			(SELECT order_number FROM production_order WHERE order_number = '4444444'));
            
            
INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('Helga', '2018-03-02 11:31:20', 'Batch Started', 1);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('Johan', '2018-03-02 12:31:20', 'Something happened', 1);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('Felix', '2018-03-03 12:33:20', 'Batch Started', 2);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('Simon', '2018-03-05 09:22:46', 'Batch Started', 3);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('Tesla', '2018-03-11 10:43:46', 'Batch Started', 4);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('John Oliver', '2018-03-12 23:18:46', 'Batch Started', 5);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('Melinda', '2018-03-12 23:44:46', 'Machine exploded', 5);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('Bill Gates','2018-03-13 00:11:33', 'We had a party', 5);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('Zuckerberg','2018-03-13 02:31:31', 'Manager joined us!', 5);




INSERT INTO floorstock_item (item_id, item_name)
VALUES ('301-6914', 'Groninger Lable 301-6914');

INSERT INTO floorstock_item (item_id, item_name)
VALUES ('301-6915', 'Groninger Lable 301-6915');

INSERT INTO floorstock_item (item_id, item_name)
VALUES ('301-7905', 'Groninger Lable 301-7905');

INSERT INTO floorstock_item (item_id, item_name)
VALUES ('301-8023', 'Groninger Lable 301-8023');

INSERT INTO floorstock_item (item_id, item_name)
VALUES ('301-8025', 'Groninger Lable 301-8025');

INSERT INTO floorstock_item (item_id, item_name)
VALUES ('001-1995', 'Groninger Carbon 001-1995');

INSERT INTO floorstock_item (item_id, item_name)
VALUES ('301-6906', 'Sleever 301-6906');

INSERT INTO floorstock_item (item_id, item_name)
VALUES ('301-6907', 'Pester 301-6907');

INSERT INTO floorstock_item (item_id, item_name)
VALUES ('301-6908', 'Pester 301-6908');

INSERT INTO floorstock_item (item_id, item_name)
VALUES ('scale_roll', 'Scale Roll');

INSERT INTO floorstock_item (item_id, item_name)
VALUES ('zebra_label', 'Zebra Label');



INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 00:00:00', 1800, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 01:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 02:00:00', 1500, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 03:00:00', 2300, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 04:00:00', 2500, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 05:00:00', 2650, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 06:00:00', 2400, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 07:00:00', 2500, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 08:00:00', 1100, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 09:00:00', 800, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 10:00:00', 0, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 11:00:00', 500, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 13:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 14:00:00', 2100, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 15:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 16:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 17:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 18:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 19:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 20:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 21:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 22:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (1, '2018-03-01 23:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (3, '2018-03-02 00:00:00', 1800, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (3, '2018-03-02 01:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (3, '2018-03-02 02:00:00', 1500, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (3, '2018-03-02 03:00:00', 2300, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (3, '2018-03-02 04:00:00', 2500, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (3, '2018-03-02 05:00:00', 2650, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (3, '2018-03-02 06:00:00', 2400, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (3, '2018-03-02 07:00:00', 2500, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (3, '2018-03-02 08:00:00', 1100, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (3, '2018-03-02 09:00:00', 800, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (3, '2018-03-02 10:00:00', 0, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (4, '2018-03-02 11:00:00', 500, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (4, '2018-03-02 13:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (4, '2018-03-02 14:00:00', 2100, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (4, '2018-03-02 15:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (4, '2018-03-02 16:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (4, '2018-03-02 17:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (4, '2018-03-02 18:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (4, '2018-03-02 19:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (4, '2018-03-02 20:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (4, '2018-03-02 21:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (4, '2018-03-02 22:00:00', 2000, 3);

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity)
VALUES (4, '2018-03-02 23:00:00', 2000, 3);



INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('001-1995', '2018-03-01 00:30:00', 1, 1);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('301-6914', '2018-03-01 01:30:00', 1, 1);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('301-6915', '2018-03-01 02:30:00', 1, 2);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('301-6906', '2018-03-01 03:30:00', 1, 2);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('301-6907', '2018-03-01 04:30:00', 2, 3);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('scale_roll', '2018-03-01 05:30:00', 1, 3);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('zebra_label', '2018-03-01 06:30:00', 1, 3);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('001-1995', '2018-03-01 07:30:00', 1, 4);