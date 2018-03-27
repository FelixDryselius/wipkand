from . import views
from django.urls import path, include, re_path
from .views import startBatchView

urlpatterns = [
    path('', views.index, name='index'),
    path('startBatch/', startBatchView.as_view(), name='startBatch'),
]