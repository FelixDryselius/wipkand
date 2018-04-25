
from rest_framework.serializers import ValidationError, ModelSerializer

from operations.models import (
    Product,
    ProductOrder,
    Batch,
    BatchComment
)


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderSerializer(ModelSerializer):
    class Meta:
        model = ProductOrder
        fields = '__all__'


class OrderNoValidateSerializer(ModelSerializer):
    class Meta:
        model = ProductOrder
        fields = '__all__'
        extra_kwargs = {
            'order_number': {
                'validators': []
            }
        }


class BatchDetailSerializer(ModelSerializer):
    order_number = OrderNoValidateSerializer()

    class Meta:
        model = Batch
        fields = '__all__'
        #read_only_fields = ['order_number']

    def update(self, instance, validated_data):
        entered_order = validated_data.pop('order_number')
        previous_order = instance.order_number
        new_order_nr = entered_order['order_number']
        old_order_nr = previous_order.order_number
        new_product = entered_order['article_number']
        old_pruduct_frontend = previous_order.article_number
        if new_order_nr != old_order_nr:
            try:
                order_to_use = ProductOrder.objects.get(
                    pk=new_order_nr)
                print("FETCH OLD ORDER!")
                # Now have old order with a old product association
                old_product = order_to_use.article_number

                if not validate_order(old_product.article_number, new_product.article_number):
                    #print("WRONG NEW PRODUCT NUMBER")
                    # NEW PRODUCT NUMBER WITH OLD ORDER NUMBER
                    order_to_use.update(article_number=new_product)

            except ProductOrder.DoesNotExist:
                order_to_use = ProductOrder.objects.create(
                    order_number=new_order_nr, article_number=new_product)
                print("CREATED ORDER!")
            instance.order_number = order_to_use
            instance.save()

        if old_pruduct_frontend is not new_product and new_order_nr == old_order_nr:

            order_to_use = ProductOrder.objects.get(
                    pk=new_order_nr)

            order_to_use.article_number = new_product
            instance.order_number = order_to_use
            #previous_order.update(article_number=new_product)
            #previous_order.article_number = new_product

            #instance.order_number = previous_order
            instance.save()
        
        return instance

class BatchPatchSerializer(ModelSerializer):
    class Meta:
        model = Batch
        exclude = ('order_number',)


class BatchCreateSerializer(ModelSerializer):
    order_number = OrderNoValidateSerializer()

    class Meta:
        model = Batch
        fields = [
            'batch_number',
            'start_date',
            'end_date',
            'rework_date',
            'scrap',
            'production_yield',
            'order_number'
        ]

    # Do we need save after objects.create()?
    def create(self, validated_data):
        entered_order = validated_data.pop('order_number')
        selected_product = entered_order['article_number']

        try:
            order_to_use = ProductOrder.objects.get(
                pk=entered_order['order_number'])
            print("FETCH OLD ORDER!")
            associated_product = order_to_use.article_number

            if not validate_order(associated_product.article_number, selected_product.article_number):
                print("WRONG NEW PRODUCT NUMBER")
                raise ValidationError(
                    "An order with a different article number already exists!")

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


class CommentSerializer(ModelSerializer):
    class Meta:
        model = BatchComment
        fields = [
            'comment_id',
            'user_name',
            'post_date',
            'text_comment',
            'batch_number',
        ]
