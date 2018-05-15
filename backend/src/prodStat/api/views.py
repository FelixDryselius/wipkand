
from django.shortcuts import get_object_or_404

from rest_framework import generics, mixins, permissions

from prodStat.models import ProductionStatistic
from prodStat.api.serializers import (
    ProductionStatisticSerializer,
    ProductionStatisticSerializerReadOnlyDate,
    ProductionStatisticExtendedSerializer
)
from operations.models import Batch

class ProductionStatisticAPIDetailView(
        generics.RetrieveAPIView,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin):

    permission_classes = [permissions.AllowAny]
    serializer_class = ProductionStatisticSerializer
    queryset = ProductionStatistic.objects.all()

    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            serializer_class = ProductionStatisticSerializerReadOnlyDate
        return serializer_class

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class ProductionStatisticAPIView(
        generics.ListAPIView,
        mixins.CreateModelMixin):

    permission_classes = [permissions.AllowAny]
    search_fields = ('time_stamp', 'staff_quantity')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            serializer_class = ProductionStatisticExtendedSerializer
        else:
            serializer_class = ProductionStatisticSerializer
        return serializer_class

    def get_queryset(self, *args, **kwargs):
            queryset = ProductionStatistic.objects.all()
            _batch_number = self.request.query_params.get("batch_number", None)
            _start_date = self.request.query_params.get("start_date", None)
            _end_date = self.request.query_params.get("end_date", None)
            if _batch_number:
                _batch = get_object_or_404(Batch, batch_number=_batch_number)
                queryset = queryset.filter(batch=_batch)
            if _start_date and _end_date:
                queryset = queryset.filter(time_stamp__gte=_start_date).filter(time_stamp__lte=_end_date)
            return queryset

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

