from rest_framework.serializers import ModelSerializer

from prodStat.models import ProductionStatistic

class ProductionStatisticSerializer(ModelSerializer):

    class Meta:
        model = ProductionStatistic
        fields = '__all__'

class ProductionStatisticSerializerReadOnlyDate(ProductionStatisticSerializer):

    class Meta:
        model = ProductionStatistic
        fields = '__all__'
        read_only_fields = ['time_stamp']