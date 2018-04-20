from django.db import models

# Create your models here.


class FloorstockItem(models.Model):
    item_id = models.CharField(primary_key=True, max_length=255)
    item_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'floorstock_item'


class FloorstockStatistic(models.Model):
    floorstock_item = models.ForeignKey(
        FloorstockItem, models.DO_NOTHING, primary_key=True)
    time_stamp = models.DateTimeField()
    quantity = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'floorstock_statistic'
        unique_together = (('floorstock_item', 'time_stamp'),)
