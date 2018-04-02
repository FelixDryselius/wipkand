
from django.shortcuts import get_object_or_404

from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    # UpdateAPIView,
    # DestroyAPIView,
    # CreateAPIView,
    # RetrieveUpdateAPIView,
)

from operations.models import Product, ProductOrder, Batch, BatchComment
from operations.api.serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
    OrderListSerializer,
    OrderDetailSerializer,
    BatchListSerializer,
    BatchDetailSerializer,
    CommentListSerializer,
    CommentDetailSerializer,
)

class ProductListAPIView(ListAPIView):
    serializer_class = ProductListSerializer
    queryset = Product.objects.all()


class ProductDetailAPIView(RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    queryset = Product.objects.all()


class OrderListAPIView(ListAPIView):
    serializer_class = OrderListSerializer
    queryset = ProductOrder.objects.all()

class OrderDetailAPIView(RetrieveAPIView):
    serializer_class = OrderDetailSerializer
    queryset = ProductOrder.objects.all()


class BatchListAPIView(ListAPIView):
    serializer_class = BatchListSerializer
    queryset = Batch.objects.all()

class BatchDetailAPIView(RetrieveAPIView):
    serializer_class = BatchDetailSerializer
    queryset = Batch.objects.all()


class CommentListAPIView(ListAPIView):
    serializer_class = CommentListSerializer
    queryset = BatchComment.objects.all()
    lookup_url_kwarg = 'batch_number'

    def get_queryset(self, *args, **kwargs):
        _batch_number = self.kwargs.get(self.lookup_url_kwarg)

        if _batch_number is not None:
            queryset_list = BatchComment.objects.filter(batch_number=_batch_number)
        else:
            queryset_list = BatchComment.objects.all()
        return queryset_list

#Could probably be optimized better
class CommentDetailAPIView(RetrieveAPIView):
    serializer_class = CommentDetailSerializer
    queryset = BatchComment.objects.all()
    multiple_lookup_fields = {'batch_number', 'pk'}

    def get_object(self):
        queryset = self.get_queryset()
        filter = {}
        for field in self.multiple_lookup_fields:
            filter[field] = self.kwargs[field]

        obj = get_object_or_404(queryset, **filter)
        return obj