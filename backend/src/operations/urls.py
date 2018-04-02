from . import views
from django.urls import path, include, re_path
from operations.views import HistoryView, StartBatchView

app_name = 'operations' #to make django recognizes that this is the operations "urls", now we can write 'operations:PATH_NAME'

urlpatterns = [
    path('', views.index, name='index'),
    path('startBatch/', StartBatchView.as_view(), name='startBatch'),
    path('history/', HistoryView.as_view(), name="history"),

]