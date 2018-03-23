# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


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


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Batch(models.Model):
    batch_number = models.IntegerField(primary_key=True)
    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)
    scrap = models.IntegerField(blank=True, null=True)
    yield_1 = models.IntegerField(blank=True, null=True)
    hmi_1_good = models.IntegerField(db_column='HMI_1_good', blank=True, null=True)  # Field name made lowercase.
    hmi1_bad = models.IntegerField(db_column='HMI1_bad', blank=True, null=True)  # Field name made lowercase.
    hmi2_good = models.IntegerField(db_column='HMI2_good', blank=True, null=True)  # Field name made lowercase.
    hmi2_bad = models.IntegerField(db_column='HMI2_bad', blank=True, null=True)  # Field name made lowercase.
    rework_date = models.DateTimeField(blank=True, null=True)
    applied_labels = models.IntegerField(blank=True, null=True)
    rework_time = models.DateTimeField(blank=True, null=True)
    yield_2 = models.IntegerField(blank=True, null=True)
    order_number = models.ForeignKey('ProductOrder', models.DO_NOTHING, db_column='order_number', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'batch'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

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


class Product(models.Model):
    article_number = models.CharField(primary_key=True, max_length=8)
    reference_storage = models.IntegerField(blank=True, null=True)
    label = models.CharField(max_length=8, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product'


class ProductOrder(models.Model):
    order_number = models.IntegerField(primary_key=True)
    article_number = models.ForeignKey(Product, models.DO_NOTHING, db_column='article_number', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'product_order'


class UserComment(models.Model):
    comment_id = models.IntegerField(db_column='comment_ID', primary_key=True)  # Field name made lowercase.
    post_date = models.DateTimeField(blank=True, null=True)
    text_comment = models.TextField(blank=True, null=True)
    batch_number = models.ForeignKey(Batch, models.DO_NOTHING, db_column='batch_number')

    class Meta:
        managed = False
        db_table = 'user_comment'
        unique_together = (('comment_id', 'batch_number'),)
