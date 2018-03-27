from . import views
from django.urls import path, include, re_path
from .views import startBatchView

app_name = 'operations' #to make django recognizes that this is the operations "urls", now we can write 'operations:PATH_NAME'

urlpatterns = [
    path('', views.index, name='index'),
    path('startBatch/', startBatchView.as_view(), name='startBatch'),
 
]