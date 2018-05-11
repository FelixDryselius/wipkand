from django.db import models
from operations.models import *

# Create your models here.


class FloorstockItem(models.Model):
    item_id = models.CharField(primary_key=True, max_length=255)
    item_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'floorstock_item'

    def __str__(self):
        return self.item_id


class FloorstockStatistic(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    time_stamp = models.DateTimeField()
    floorstock_item = models.ForeignKey(FloorstockItem, models.DO_NOTHING)
    quantity = models.IntegerField(blank=True, null=True)
    batch = models.ForeignKey(Batch, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'floorstock_statistic'
        ordering = ['-time_stamp']

    def __str__(self):
        return str(self.time_stamp) + ' - ' + str(self.floorstock_item)