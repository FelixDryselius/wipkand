CREATE TABLE product
(
  article_number char(8) NOT NULL,
  reference_storage INT,
  label char(8),
  PRIMARY KEY (article_number)
);


CREATE TABLE product_order
(
  order_number INT NOT NULL,
  article_number  char(8),
  PRIMARY KEY (order_number),
  FOREIGN KEY (article_number) REFERENCES product(article_number)
);

CREATE TABLE batch
(
  batch_number INT NOT NULL,
  start_date datetime,
  end_date datetime,
  scrap INT,
  yield_1 INT,
  HMI_1_good INT,
  HMI1_bad INT,
  HMI2_good INT,
  HMI2_bad INT,
  rework_date datetime,
  applied_labels INT ,
  rework_time datetime,
  yield_2 INT,
  order_number INT ,
  PRIMARY KEY (batch_number),
  FOREIGN KEY (order_number) REFERENCES product_order(order_number)
);

CREATE TABLE user_comment
(
  comment_ID int NOT NULL,
  post_date datetime,
  text_comment text ,
  batch_number INT,
  PRIMARY KEY (comment_ID, batch_number),
  FOREIGN KEY (batch_number) REFERENCES batch(batch_number)
);
