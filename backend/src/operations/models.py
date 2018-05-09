from django.db import models
from django.db.models.options import Options

# Create your models here.

class Product(models.Model):
    article_number = models.CharField(primary_key=True, max_length=8)
    product_name = models.CharField(max_length=255, blank=True, null=True)
    reference_storage = models.IntegerField(blank=True, null=True)
    label = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product'


class ProductionOrder(models.Model):
    order_number = models.CharField(primary_key=True, max_length=7)
    article_number = models.ForeignKey(Product, models.DO_NOTHING, db_column='article_number')

    class Meta:
        managed = False
        db_table = 'production_order'
        ordering = ['-order_number']


class Batch(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    batch_number = models.CharField(unique=True, max_length=10)
    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)
    scrap = models.IntegerField(blank=True, null=True)
    production_yield = models.IntegerField(blank=True, null=True)
    hmi1_good = models.IntegerField(db_column='HMI1_good', blank=True, null=True)  # Field name made lowercase.
    hmi1_bad = models.IntegerField(db_column='HMI1_bad', blank=True, null=True)  # Field name made lowercase.
    hmi2_good = models.IntegerField(db_column='HMI2_good', blank=True, null=True)  # Field name made lowercase.
    hmi2_bad = models.IntegerField(db_column='HMI2_bad', blank=True, null=True)  # Field name made lowercase.
    rework_date = models.DateTimeField(blank=True, null=True)
    applied_labels = models.IntegerField(blank=True, null=True)
    label_print_time = models.DateTimeField(blank=True, null=True)
    rework_time = models.TimeField(blank=True, null=True)
    shifts = models.IntegerField(blank=True, null=True)
    order = models.ForeignKey('ProductionOrder', models.DO_NOTHING, db_column='production_order')

    class Meta:
        managed = False
        db_table = 'batch'
        ordering = ['-start_date']
    
    def __str__(self):
        return self.batch_number


class BatchComment(models.Model):
    comment_id = models.AutoField(db_column='comment_ID', primary_key=True)  # Field name made lowercase.
    user_name = models.CharField(max_length=255, blank=True, null=True)
    post_date = models.DateTimeField(blank=True, null=True)
    text_comment = models.TextField(blank=True, null=True)
    batch = models.ForeignKey(Batch, models.DO_NOTHING, blank=False, null=False)

    class Meta:
        managed = False
        db_table = 'batch_comment'
        ordering = ['-post_date']

    def __str__(self):
        return self.post_date
