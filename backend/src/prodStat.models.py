# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class FloorstockItem(models.Model):
    item_id = models.CharField(primary_key=True, max_length=255)
    item_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'floorstock_item'


class ProductionStatistic(models.Model):
    batch_number = models.ForeignKey('Batch', models.DO_NOTHING, db_column='batch_number', primary_key=True)
    time_stamp = models.DateTimeField()
    production_quantity = models.IntegerField(blank=True, null=True)
    staff_quantity = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'production_statistic'
        unique_together = (('batch_number', 'time_stamp'),)


class FloorstockStatistic(models.Model):
    floorstock_item = models.ForeignKey(FloorstockItem, models.DO_NOTHING, primary_key=True)
    time_stamp = models.DateTimeField()
    quantity = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'floorstock_statistic'
        unique_together = (('floorstock_item', 'time_stamp'),)
