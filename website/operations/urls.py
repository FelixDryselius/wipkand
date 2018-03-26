from . import views
from django.urls import path, include, re_path
from .views import createOrderView

urlpatterns = [
    path('', views.index, name='index'),
    path('createOrder/', createOrderView.as_view(), name='createOrder'),
]