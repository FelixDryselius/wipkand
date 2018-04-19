from django.urls import path

from prodStat.api.views import (
    ProductionStatisticAPIDetailView,
    ProductionStatisticAPIView
)

urlpatterns = [
    path('statistics/', ProductionStatisticAPIView.as_view(), name='list'),
    path('statistics/<str:pk>/', ProductionStatisticAPIDetailView.as_view(), name='detail')
]