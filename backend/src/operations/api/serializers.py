
from rest_framework.serializers import ValidationError, ModelSerializer, SlugRelatedField


from operations.models import (
    Product,
    ProductionOrder,
    Batch,
    BatchComment
)


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderSerializer(ModelSerializer):
    class Meta:
        model = ProductionOrder
        fields = '__all__'


class OrderNoValidateSerializer(ModelSerializer):
    class Meta:
        model = ProductionOrder
        fields = '__all__'
        extra_kwargs = {
            'order_number': {
                'validators': []
            }
        }


class BatchInfoSerializer(ModelSerializer):
    class Meta:
        model = Batch
        fields = [
            'id',
            'batch_number'
        ]


class BatchSerializer(ModelSerializer):
    order = OrderNoValidateSerializer()

    class Meta:
        model = Batch
        fields = '__all__'

    def create(self, validated_data):
        entered_order = validated_data.pop('order')
        entered_product = entered_order['article_number']
        order_to_use = get_order_create(entered_order, entered_product)

        batch_to_create = validated_data
        batch_to_create['order'] = order_to_use
        batch = Batch.objects.create(**batch_to_create)
        print("CREATED BATCH")
        return batch

    def update(self, instance, validated_data):

        entered_order = validated_data.pop('order')
        entered_order_number = entered_order['order_number']
        entered_product = entered_order['article_number']

        previous_order = instance.order
        previous_order_number = previous_order.order_number
        previous_product = previous_order.article_number

        if entered_order_number != previous_order_number:
            order_to_use = get_order_update(
                entered_order_number, entered_product)
            instance.order = order_to_use
            instance.save()

        elif previous_product != entered_product:
            order_to_use = ProductionOrder.objects.get(
                pk=previous_order_number)
            order_to_use.article_number = entered_product
            instance.order = order_to_use
            instance.save()
            order_to_use.save()
        else:
            update_batch_details(instance, validated_data)
        return instance


def get_order_create(order, product):
    '''
    Returns an order based on which order number the user entered
    and the product that is selected. Check if the entered order already exists.
    If not, create a new order with the selected product number. If the order does exist,
    check if the selected product is the same as the product associated
    with the order in the database. If not, raise a ValidationError.
    Return the order. THIS METHOD DOES NOT ALTER PREVIOUS ORDERS IN THE DATABASE
    '''
    try:
        order_to_use = ProductionOrder.objects.get(
            pk=order['order_number'])
        print("FETCH OLD ORDER!")

        product_for_order = order_to_use.article_number
        if product_for_order.article_number != product.article_number:
            print("WRONG NEW PRODUCT NUMBER")
            raise ValidationError(
                {"order_number": "The same order with a different article number already exists."}
            )

    except ProductionOrder.DoesNotExist:
        order_to_use = ProductionOrder.objects.create(
            order_number=order['order_number'], article_number=product)
        print("CREATED ORDER!")
    return order_to_use


def get_order_update(order_number, product):
    '''
    Returns an order based on which order number the user entered
    and the product that is selected. Check if the entered order already exists.
    If not, create a new order with the selected product number. If the order does exist,
    check if the selected product is the same as the product associated
    with the order in the database. If not, assign the selected product to the order.
    Return the order. THIS METHOD ALTERS PREVIOUS ORDERS IN THE DATABASE!
    '''
    try:
        order_to_use = ProductionOrder.objects.get(
            pk=order_number)
        print("FETCH OLD ORDER!")
        # Now have old order with a old product association
        product_for_entered_order = order_to_use.article_number

        if product_for_entered_order.article_number != product.article_number:
            # NEW PRODUCT NUMBER WITH OLD ORDER NUMBER
            order_to_use.article_number = product
            order_to_use.save()

    except ProductionOrder.DoesNotExist:
        order_to_use = ProductionOrder.objects.create(
            order_number=order_number, article_number=product)
        print("CREATED ORDER!")
    return order_to_use


def update_batch_details(instance, data):
    instance.batch_number = data.get(
        'batch_number', instance.batch_number)
    instance.start_date = data.get(
        'start_date', instance.start_date)
    instance.end_date = data.get(
        'end_date', instance.end_date)
    instance.rework_date = data.get(
        'rework_date', instance.rework_date)
    instance.label_print_time = data.get(
        'label_print_time', instance.label_print_time)
    instance.applied_labels = data.get(
        'applied_labels', instance.applied_labels)
    instance.rework_time = data.get(
        'rework_time', instance.rework_time)
    instance.shifts = data.get(
        'shifts', instance.shifts)
    instance.production_yield = data.get(
        'production_yield', instance.production_yield)
    instance.hmi1_good = data.get(
        'hmi1_good', instance.hmi1_good)
    instance.hmi1_bad = data.get(
        'hmi1_bad', instance.hmi1_bad)
    instance.hmi2_good = data.get(
        'hmi2_good', instance.hmi2_good)
    instance.hmi2_bad = data.get(
        'hmi2_bad', instance.hmi2_bad)
    instance.scrap = data.get('scrap', instance.scrap)
    instance.save()


class CommentSerializer(ModelSerializer):
    class Meta:
        model = BatchComment
        fields = [
            'comment_id',
            'user_name',
            'post_date',
            'text_comment',
            'batch',
        ]


class CommentExtendedSerializer(ModelSerializer):
    batch = BatchInfoSerializer()

    class Meta:
        model = BatchComment
        fields = [
            'comment_id',
            'user_name',
            'post_date',
            'text_comment',
            'batch',
        ]
