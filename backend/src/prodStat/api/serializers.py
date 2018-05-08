from rest_framework.serializers import ModelSerializer

from prodStat.models import ProductionStatistic
from operations.api.serializers import BatchInfoSerializer

class ProductionStatisticSerializer(ModelSerializer):
    batch = BatchInfoSerializer()

    class Meta:
        model = ProductionStatistic
        fields = '__all__'

class ProductionStatisticSerializerReadOnlyDate(ProductionStatisticSerializer):
    batch = BatchInfoSerializer()

    class Meta:
        model = ProductionStatistic
        fields = '__all__'
        read_only_fields = ['time_stamp']