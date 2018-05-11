'''API views for operations'''
from django.shortcuts import get_object_or_404
from django.db.models import Q

from rest_framework import generics, mixins
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView
)
from rest_framework.permissions import (
    AllowAny,
)

from operations.models import Product, ProductionOrder, Batch, BatchComment
from operations.api.serializers import (
    ProductSerializer,
    OrderSerializer,
    OrderNoValidateSerializer,
    BatchSerializer,
    CommentSerializer,
    CommentExtendedSerializer
)


class ProductAPIView(ListAPIView):
    '''List of products'''
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    # permission_classes = [AllowAny]


class ProductDetailAPIView(RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    # permission_classes = [AllowAny]


class OrderAPIView(
    generics.ListAPIView,
        mixins.CreateModelMixin):

    serializer_class = OrderNoValidateSerializer
    queryset = ProductionOrder.objects.all()
    # permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class OrderDetailAPIView(
    generics.RetrieveAPIView,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin):

    serializer_class = OrderSerializer
    queryset = ProductionOrder.objects.all()

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class BatchAPIView(
    generics.ListAPIView,
        mixins.CreateModelMixin):

    serializer_class = BatchSerializer
    search_fields = ('id', 'batch_number', 'order__order_number',
                     'start_date', 'end_date')

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_queryset(self, *args, **kwargs):
        queryset = Batch.objects.all()
        _batch_number = self.request.query_params.get("batch_number", None)
        print(_batch_number)
        if _batch_number:
            if _batch_number == 'activeBatch':
                queryset = queryset.filter(end_date__exact=None)
                print("Current active batches: ")
                print(queryset)
            else:
                queryset = queryset.filter(batch_number=_batch_number)
        return queryset


class BatchDetailAPIView(
    generics.RetrieveAPIView,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin):

    #permission_classes = [AllowAny]
    serializer_class = BatchSerializer
    queryset = Batch.objects.all()

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class CommentAPIView(
    generics.ListAPIView,
        mixins.CreateModelMixin):

    '''Gets list of comments for a batch, or all comments if no batch is specified'''
    #permission_classes = [AllowAny]
    serializer_class = CommentSerializer
    search_fields = ('comment_id',
                     'text_comment', 'user_name', 'post_date')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            serializer_class = CommentExtendedSerializer
        else:
            serializer_class = CommentSerializer
        return serializer_class

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_queryset(self):
        _batch_number = self.request.query_params.get("batch_number", None)
        if _batch_number:
            _batch = get_object_or_404(Batch, batch_number=_batch_number)
            queryset = BatchComment.objects.filter(batch=_batch)
        else:
            queryset = BatchComment.objects.all()
        return queryset


class CommentDetailAPIView(
    generics.RetrieveAPIView,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin):

    '''Gets detail of batch and comment id'''
    serializer_class = CommentSerializer
    #permission_classes = [AllowAny]

    def get_object(self):
        return get_object_or_404(BatchComment, **self.kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
