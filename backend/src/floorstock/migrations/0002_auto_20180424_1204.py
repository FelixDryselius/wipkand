# Generated by Django 2.0.3 on 2018-04-24 10:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('floorstock', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='floorstockstatistic',
            options={'managed': False, 'ordering': ['-time_stamp']},
        ),
    ]