from django.contrib import admin
from operations.models import *

admin.site.register(Product)
admin.site.register(ProductionOrder)
admin.site.register(Batch)
admin.site.register(BatchComment)
