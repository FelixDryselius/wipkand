from rest_framework.serializers import ModelSerializer

from prodStat.models import ProductionStatistic

class ProductionStatisticSerializer(ModelSerializer):
    class Meta:
        model = ProductionStatistic
        fields = '__all__'
