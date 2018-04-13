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
    order_number = OrderCreateUpdateSerializer()

    class Meta:
        model = Batch
        fields = '__all__'
        # extra_kwargs = {
        #     'order_number': {
        #         'validators': [UnicodeOrderNumberValidator()],
        #     }

    def create(self, validated_data):
        #_order_number = validated_data['order_number']
        _order = validated_data.pop('order_number')
        _product = _order['article_number']
        _order_number = _order['order_number']
        
        try:
            new_order = ProductOrder.objects.get(pk=_order_number)
            print("FETCH OLD ORDER!")
        except ProductOrder.DoesNotExist:
            new_order = ProductOrder.objects.create(order_number=_order_number, article_number=_product)
            print("CREATED ORDER!")
        
        #validated_data.append(order_number=_order_number)
        batchData = validated_data
        batchData['order_number'] = new_order    

        batch = Batch.objects.create(**batchData)
        print("CREATED BATCH")
        return batch



class CommentListSerializer(ModelSerializer):
    class Meta:
        model = BatchComment
        fields = [
            'comment_id',
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



