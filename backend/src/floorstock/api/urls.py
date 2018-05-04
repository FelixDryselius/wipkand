from django.urls import path

from floorstock.api.views import (
    FloorstockItemAPIDetailView,
    FloorstockItemAPIView,
    FloorstockStatisticAPIView,
    FloorstockStatisticAPIDetailView
)

urlpatterns = [
    path('item/', FloorstockItemAPIView.as_view(), name='item-list'),
    path('item/<str:pk>/', FloorstockItemAPIDetailView.as_view(), name='item-detail'),

    path('changelog/', FloorstockStatisticAPIView.as_view(), name='changelog-list'),
    path('changelog/<str:pk>', FloorstockStatisticAPIDetailView.as_view(), name='changelog-detail'),
    # path('changelog/<str:floorstock_item>/',
    #       FloorstockStatisticAPIView.as_view(), name='changelog-item-list'),
    # path('changelog/<str:floorstock_item>/<str:pk>/',
    #       FloorstockStatisticAPIDetailView.as_view(), name='changelog-detail')
]
