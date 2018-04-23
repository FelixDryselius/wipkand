
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

    # def get_object(self):
    #     return get_object_or_404(FloorstockStatistic, **self.kwargs)

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
    lookup_url_kwarg = 'floorstock_item'

    def get_queryset(self):
        floorstock_item = self.kwargs.get(self.lookup_url_kwarg)
        if floorstock_item is not None:
            queryset_list = FloorstockStatistic.objects.filter(
                floorstock_item=floorstock_item)
        else:
            queryset_list = FloorstockStatistic.objects.all()
        return queryset_list

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
