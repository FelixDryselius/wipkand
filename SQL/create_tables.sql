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

CREATE TABLE floorstock_item
(
  item_id varchar(255) NOT NULL,
  item_name varchar(255),
  PRIMARY KEY (item_id)
);

CREATE TABLE production_statistic
(
  time_stamp datetime NOT NULL,
  batch_number char(10) NOT NULL,
  production_quantity INT,
  staff_quantity INT,
  PRIMARY KEY (time_stamp),
  FOREIGN KEY (batch_number) REFERENCES batch(batch_number)
);

CREATE TABLE floorstock_statistic
(
  time_stamp datetime NOT NULL,
  floorstock_item_id char(255) NOT NULL,
  quantity INT,
  batch_number char(10) NOT NULL,
  PRIMARY KEY (time_stamp, floorstock_item_id),
  FOREIGN KEY (batch_number) REFERENCES batch(batch_number),
  FOREIGN KEY (floorstock_item_id) REFERENCES floorstock_item(item_id)
);