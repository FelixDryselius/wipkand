from django.db import models

# Create your models here.

class Product(models.Model):
    article_number = models.CharField(primary_key=True, max_length=8)
    product_name = models.CharField(max_length=255, blank=True, null=True)
    reference_storage = models.IntegerField(blank=True, null=True)
    label = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product'


class ProductOrder(models.Model):
    order_number = models.CharField(primary_key=True, max_length=7)
    article_number = models.ForeignKey(Product, models.DO_NOTHING, db_column='article_number', blank=False, null=False)

    class Meta:
        managed = False
        db_table = 'product_order'

class Batch(models.Model):
    batch_number = models.CharField(primary_key=True, max_length=10)
    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)
    scrap = models.IntegerField(blank=True, null=True)
    yield_1 = models.IntegerField(blank=True, null=True)
    hmi1_good = models.IntegerField(db_column='HMI1_good', blank=True, null=True)  # Field name made lowercase.
    hmi1_bad = models.IntegerField(db_column='HMI1_bad', blank=True, null=True)  # Field name made lowercase.
    hmi2_good = models.IntegerField(db_column='HMI2_good', blank=True, null=True)  # Field name made lowercase.
    hmi2_bad = models.IntegerField(db_column='HMI2_bad', blank=True, null=True)  # Field name made lowercase.
    rework_date = models.DateTimeField(blank=True, null=True)
    applied_labels = models.IntegerField(blank=True, null=True)
    label_print_time = models.DateTimeField(blank=True, null=True)
    rework_time = models.TimeField(blank=True, null=True)
    yield_2 = models.IntegerField(blank=True, null=True)
    order_number = models.ForeignKey('ProductOrder', models.DO_NOTHING, db_column='order_number', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'batch'

class BatchComment(models.Model):
    comment_id = models.IntegerField(db_column='comment_ID', primary_key=True)  # Field name made lowercase.
    post_date = models.DateTimeField(blank=True, null=True)
    text_comment = models.TextField(blank=True, null=True)
    batch_number = models.ForeignKey(Batch, models.DO_NOTHING, db_column='batch_number')

    class Meta:
        managed = False
        db_table = 'batch_comment'
        unique_together = (('comment_id', 'batch_number'),)
