
from rest_framework import generics, mixins, permissions

from prodStat.models import ProductionStatistic
from prodStat.api.serializers import (
    ProductionStatisticSerializer,
    ProductionStatisticSerializerReadOnlyDate
)

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
    serializer_class = ProductionStatisticSerializer
    queryset = ProductionStatistic.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

