from rest_framework.serializers import ModelSerializer

from floorstock.models import FloorstockItem, FloorstockStatistic


class FloorstockItemSerializer(ModelSerializer):
    class Meta:
        model = FloorstockItem
        fields = '__all__'

class FloorstockStatisticSerializer(ModelSerializer):

    class Meta:
        model = FloorstockStatistic
        fields = '__all__'