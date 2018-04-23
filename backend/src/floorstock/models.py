from django.db import models
from operations.models import *

# Create your models here.


class FloorstockItem(models.Model):
    item_id = models.CharField(primary_key=True, max_length=255)
    item_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'floorstock_item'


class FloorstockStatistic(models.Model):
    time_stamp = models.DateTimeField(primary_key=True)
    floorstock_item = models.ForeignKey(FloorstockItem, models.DO_NOTHING)
    quantity = models.IntegerField(blank=True, null=True)
    batch_number = models.ForeignKey(Batch, models.DO_NOTHING, db_column='batch_number')

    class Meta:
        managed = False
        db_table = 'floorstock_statistic'
        unique_together = (('time_stamp', 'floorstock_item'),)
