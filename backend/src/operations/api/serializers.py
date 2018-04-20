from rest_framework.serializers import (
    ModelSerializer
)

from operations.models import (
    Product,
    ProductOrder,
    Batch,
    BatchComment
)

from rest_framework.serializers import ValidationError

from operations.api.validators import (
    OrderValidator
)


class ProductListSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'article_number',
            'product_name',
            'reference_storage',
            # 'label',
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
        extra_kwargs = {
            'order_number': {
                'validators': []
            }
        }

        # def validate(self, data):            
        #     _order_number = data['order_number']
        #     _article_number = data['article_number']

        #     try:
        #         new_order = ProductOrder.objects.get(pk=_order_number)
        #         print("FETCH OLD ORDER!")
        #     except ProductOrder.DoesNotExist:
        #         new_order = ProductOrder.objects.create(
        #             order_number=_order_number, article_number=_product)
        #         print("CREATED ORDER!")



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

    # Do we need save after objects.create()?
    def create(self, validated_data):
        entered_order = validated_data.pop('order_number')
        selected_product = entered_order['article_number']
        
        try:
            order_to_use = ProductOrder.objects.get(pk=entered_order['order_number'])
            print("FETCH OLD ORDER!")
            associated_product = order_to_use.article_number
            
            if not validate_order(associated_product.article_number, selected_product.article_number):
                print("WRONG NEW PRODUCT NUMBER")
                raise ValidationError("An order with a different article number already exists!")
        
        except ProductOrder.DoesNotExist:
            order_to_use = ProductOrder.objects.create(
                order_number=entered_order['order_number'], article_number=selected_product)
            print("CREATED ORDER!")

        batch_to_create = validated_data
        batch_to_create['order_number'] = order_to_use

        batch = Batch.objects.create(**batch_to_create)
        print("CREATED BATCH")
        return batch

def validate_order(old_order, new_product):
    if old_order != new_product:
        return False
    return True



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
