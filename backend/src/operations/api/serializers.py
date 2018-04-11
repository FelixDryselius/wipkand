from rest_framework.serializers import (
    ModelSerializer
) 

from operations.models import (
    Product,
    ProductOrder,
    Batch,
    BatchComment
)


class ProductListSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'article_number',
            'product_name',
            'reference_storage',
            #'label',
        ]

class ProductDetailSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderListSerializer(ModelSerializer):
    class Meta:
        model = ProductOrder
        fields = [
            'order_number',
            'article_number',
        ]

class OrderDetailSerializer(ModelSerializer):
    class Meta:
        model = ProductOrder
        fields = '__all__'

class OrderCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = ProductOrder
        fields = '__all__'


class BatchListSerializer(ModelSerializer):
    class Meta:
        model = Batch
        fields = [
            'batch_number',
            'start_date',
            'end_date',
            'rework_date',
            'scrap',
            'yield_1',
            'yield_2',
            'order_number',
        ]

class BatchDetailSerializer(ModelSerializer):
    class Meta:
        model = Batch
        fields = '__all__'

class BatchCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Batch
        fields = '__all__'


class CommentListSerializer(ModelSerializer):
    class Meta:
        model = BatchComment
        fields = [
            'comment_id',
            'user_name',
            'post_date',
            'text_comment',
            'batch_number',
        ]

class CommentDetailSerializer(ModelSerializer):
    class Meta:
        model = BatchComment
        fields = '__all__'

class CommentCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = BatchComment
        fields = '__all__'