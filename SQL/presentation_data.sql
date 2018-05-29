INSERT INTO batch (is_active, batch_number, start_date, end_date, scrap, production_yield, HMI1_good, HMI1_bad, HMI2_good, HMI2_bad, 
rework_date, applied_labels, production_order)
	VALUES (0,'1000000006', '2018-05-20 12:00:00', '2018-05-21 15:23:41', 23, 13151, 70356, 1443, 71771, 1367,
			'2018-05-21 15:45:01', 1653,
			(SELECT order_number FROM production_order WHERE order_number = '5555555'));

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('JKB', '2018-05-20 12:00:00', 'Batch Started', 6);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('JKB', '2018-05-20 15:11:03', 'Long break', 6);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('JKB', '2018-05-20 19:41:23', 'Machine malfunctioning', 6);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('JKB', '2018-05-21 15:22:25', 'Finish batch', 6);


INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('001-1995', '2018-05-20 14:30:00', 1, 6);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('301-6906', '2018-05-20 17:31:00', 2, 6);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('scale_roll', '2018-05-20 18:31:00', 2, 6);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('zebra_label', '2018-05-21 00:30:00', 1, 6);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('301-8023', '2018-05-21 09:22:00', 1, 6);


INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-20 13:00:00', 903, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-20 14:00:00', 801, 2, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-20 15:00:00', 551, 2, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-20 16:00:00', 1120, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-20 17:00:00', 911, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-20 18:00:00', 892, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-20 19:00:00', 867, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-20 20:00:00', 854, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-20 21:00:00', 867, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-20 22:00:00', 841, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-20 23:00:00', 841, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 00:00:01', 841, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 01:00:00', 772, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 02:00:00', 551, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 03:00:00', 378, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 04:00:00', 551, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 05:00:00', 901, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 06:00:00', 801, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 07:00:00', 700, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 08:00:00', 866, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 09:00:00', 892, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 10:00:00', 850, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 11:00:00', 900, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 12:00:00', 841, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 13:00:00', 841, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 14:00:00', 500, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (6, '2018-05-21 15:00:00', 267, 3, 'JKB');
















INSERT INTO batch (is_active, batch_number, start_date, end_date, scrap, production_yield, HMI1_good, HMI1_bad, HMI2_good, HMI2_bad, 
rework_date, applied_labels, production_order)
	VALUES (0,'1000000007', '2018-05-21 16:55:00', '2018-05-22 16:11:41', 23, 13151, 70356, 1443, 71771, 1367,
			'2018-05-22 17:45:01', 1653,
			(SELECT order_number FROM production_order WHERE order_number = '4444444'));

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('JKB', '2018-05-21 16:55:00', 'Batch Started',7);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('JKB', '2018-05-21 18:11:03', 'Long break',7);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('JKB', '2018-05-22 00:41:23', 'Something happened',7);

INSERT INTO batch_comment (user_name, post_date, text_comment, batch_id)
VALUES ('JKB', '2018-05-22 16:05:25', 'Finish batch',7);


INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('001-1995', '2018-05-21 17:30:00', 1,7);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('301-6906', '2018-05-21 17:31:00', 2,7);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('scale_roll', '2018-05-21 18:31:00', 2,7);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('zebra_label', '2018-05-22 00:30:00', 1,7);

INSERT INTO floorstock_statistic (floorstock_item_id, time_stamp, quantity, batch_id)
VALUES ('301-8023', '2018-05-22 09:22:00', 1,7);


INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-21 18:00:00', 800, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-21 19:00:00', 700, 2, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-21 20:00:00', 700, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-21 21:00:00', 500, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-21 22:00:00', 700, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-21 23:00:00', 700, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 00:00:00', 500, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 01:00:00', 800, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 02:00:00', 900, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 03:00:00', 700, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 04:00:00', 700, 2, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 05:00:00', 500, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 06:00:00', 500, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 07:00:00', 800, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 08:00:00', 900, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 09:00:00', 800, 2, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 10:00:00', 800, 3, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 11:00:00', 500, 2, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 12:00:00', 500, 2, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 13:00:00', 500, 2, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 14:00:00', 500, 2, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 15:00:00', 1000, 4, 'JKB');

INSERT INTO production_statistic (batch_id, time_stamp, production_quantity, staff_quantity, user_name)
VALUES (7, '2018-05-22 16:00:00', 1000, 4, 'JKB');