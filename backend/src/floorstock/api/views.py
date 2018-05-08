
from rest_framework import generics, mixins, permissions
from django.shortcuts import get_object_or_404

from floorstock.models import FloorstockItem, FloorstockStatistic
from floorstock.api.serializers import (
    FloorstockItemSerializer,
    FloorstockStatisticSerializer
)


class FloorstockItemAPIDetailView(
        generics.RetrieveAPIView,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin):

    permission_classes = [permissions.AllowAny]
    serializer_class = FloorstockItemSerializer
    queryset = FloorstockItem.objects.all()


class FloorstockItemAPIView(
        generics.ListAPIView,
        mixins.CreateModelMixin):

    permission_classes = [permissions.AllowAny]
    serializer_class = FloorstockItemSerializer
    queryset = FloorstockItem.objects.all()


class FloorstockStatisticAPIDetailView(
        generics.RetrieveAPIView,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin):

    permission_classes = [permissions.AllowAny]
    serializer_class = FloorstockStatisticSerializer
    queryset = FloorstockStatistic.objects.all()

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class FloorstockStatisticAPIView(
        generics.ListAPIView,
        mixins.CreateModelMixin):

    permission_classes = [permissions.AllowAny]
    serializer_class = FloorstockStatisticSerializer
    queryset = FloorstockStatistic.objects.all()
    search_fields = ('batch_number__batch_number', 'floorstock_item__item_id', 'time_stamp')

    def get_queryset(self):
        _batch_number = self.request.query_params.get("batch_number", None)
        if _batch_number:
            queryset = FloorstockStatistic.objects.filter(
                batch_number=_batch_number)
        else:
            queryset = FloorstockStatistic.objects.all()
        return queryset

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
