
from rest_framework import generics, mixins, permissions

from prodStat.models import ProductionStatistic
from prodStat.api.serializers import ProductionStatisticSerializer


class ProductionStatisticAPIDetailView(
        generics.RetrieveAPIView,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin):

    permission_classes = [permissions.AllowAny]
    serializer_class = ProductionStatisticSerializer
    queryset = ProductionStatistic.objects.all()


class ProductionStatisticAPIView(
        generics.ListAPIView,
        mixins.CreateModelMixin):

    permission_classes = [permissions.AllowAny]
    serializer_class = ProductionStatisticSerializer
    queryset = ProductionStatistic.objects.all()
