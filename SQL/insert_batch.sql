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