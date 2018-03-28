from . import views
from django.urls import path, include, re_path
from operations.views import startBatchView, ProductListView

app_name = 'operations' #to make django recognizes that this is the operations "urls", now we can write 'operations:PATH_NAME'

urlpatterns = [
    path('', views.index, name='index'),
    path('startBatch/', startBatchView.as_view(), name='startBatch'),

    
    #These paths should not be available when in production
    path('operations/api/product', ProductListView.as_view(), name='productAPI'),
]