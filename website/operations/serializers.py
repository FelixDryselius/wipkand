from rest_framework import serializers
from operations.models import Product, ProductOrder, Batch, BatchComment

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductOrder
        fields = '__all__'

class BatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Batch
        fields = '__all__'

class BatchCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = BatchComment
        fields = '__all__'