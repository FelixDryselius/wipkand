from django.urls import path

from prodStat.api.views import (
    ProductionStatisticAPIDetailView,
    ProductionStatisticAPIView
)

urlpatterns = [
    path('', ProductionStatisticAPIView.as_view(), name='list'),
    path('<str:pk>/', ProductionStatisticAPIDetailView.as_view(), name='detail')
]