from floorstock import views
from django.urls import path, include, re_path
#from .views import FloorstockView

app_name = 'floorstock' #to make django recognizes that this is the operations "urls", now we can write 'operations:PATH_NAME'

urlpatterns = [
    path('', views.index, name='index'),
]