"""vfal_monitor URL Configuration

"""
from django.contrib import admin

from django.urls import path, re_path, include
from django.views.generic.base import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),

    # API urls
    path('api/operations/', include('operations.api.urls'), name='operations-api'),
    path('api/users/', include('accounts.api.urls'), name='users-api'),
    path('api/statistics/', include('prodStat.api.urls'), name='statistics-api'),
    path('api/floorstock/', include('floorstock.api.urls'), name='floorstock-api'),

    # Route to angular
    path('', TemplateView.as_view(template_name="tempHome.html"), name='home'),
    re_path(r'^.*/$', TemplateView.as_view(template_name="tempHome.html"), name='home')
]
