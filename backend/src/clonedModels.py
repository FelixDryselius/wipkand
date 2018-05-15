# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AccountsCepheiduser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    staff = models.IntegerField()
    admin = models.IntegerField()
    operator = models.IntegerField()
    supervisor = models.IntegerField()
    active = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'accounts_cepheiduser'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


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
    production_order = models.ForeignKey('ProductionOrder', models.DO_NOTHING, db_column='production_order')

    class Meta:
        managed = False
        db_table = 'batch'


class BatchComment(models.Model):
    comment_id = models.AutoField(db_column='comment_ID', primary_key=True)  # Field name made lowercase.
    user_name = models.CharField(max_length=255, blank=True, null=True)
    post_date = models.DateTimeField(blank=True, null=True)
    text_comment = models.TextField(blank=True, null=True)
    batch = models.ForeignKey(Batch, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'batch_comment'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AccountsCepheiduser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class FloorstockItem(models.Model):
    item_id = models.CharField(primary_key=True, max_length=255)
    item_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'floorstock_item'


class FloorstockStatistic(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    time_stamp = models.DateTimeField()
    floorstock_item = models.ForeignKey(FloorstockItem, models.DO_NOTHING)
    quantity = models.IntegerField(blank=True, null=True)
    batch = models.ForeignKey(Batch, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'floorstock_statistic'


class Product(models.Model):
    article_number = models.CharField(primary_key=True, max_length=8)
    product_name = models.CharField(max_length=255, blank=True, null=True)
    reference_storage = models.IntegerField(blank=True, null=True)
    label = models.CharField(max_length=255, blank=True, null=True)
    batch_quantity_goal = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product'


class ProductionOrder(models.Model):
    order_number = models.CharField(primary_key=True, max_length=7)
    article_number = models.ForeignKey(Product, models.DO_NOTHING, db_column='article_number')

    class Meta:
        managed = False
        db_table = 'production_order'


class ProductionStatistic(models.Model):
    time_stamp = models.DateTimeField(primary_key=True)
    batch = models.ForeignKey(Batch, models.DO_NOTHING)
    production_quantity = models.IntegerField(blank=True, null=True)
    staff_quantity = models.IntegerField(blank=True, null=True)
    user_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'production_statistic'
