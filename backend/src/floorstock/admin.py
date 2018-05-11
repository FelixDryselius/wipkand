from django.contrib import admin

from floorstock.models import FloorstockItem, FloorstockStatistic

# Register your models here.
admin.site.register(FloorstockItem)
admin.site.register(FloorstockStatistic)
