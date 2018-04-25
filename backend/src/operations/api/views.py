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

from operations.models import Product, ProductOrder, Batch, BatchComment
from operations.api.serializers import (
    ProductSerializer,
    OrderSerializer,
    OrderNoValidateSerializer,
    BatchCreateSerializer,
    BatchDetailSerializer,
    BatchPatchSerializer,
    CommentSerializer
)


class ProductAPIView(ListAPIView):
    '''List of products'''
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [AllowAny]


class ProductDetailAPIView(RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [AllowAny]


class OrderAPIView(
    generics.ListAPIView,
        mixins.CreateModelMixin):

    serializer_class = OrderNoValidateSerializer
    queryset = ProductOrder.objects.all()
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class OrderDetailAPIView(
    generics.RetrieveAPIView,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin):

    serializer_class = OrderSerializer
    queryset = ProductOrder.objects.all()
    permission_classes = [AllowAny]

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class BatchAPIView(
    generics.ListAPIView,
        mixins.CreateModelMixin):

    serializer_class = BatchCreateSerializer
    permission_classes = [AllowAny]
    search_fields = ('batch_number', 'order_number__order_number', 'start_date', 'end_date')

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_queryset(self, *args, **kwargs):
        queryset_list = Batch.objects.all()
        query = self.request.GET.get("q")
        print("In the get_queryset. query is: ")
        print(query)
        x = type(query) is str
        print("Type of query is string: " + str(x))
        if query:
            if query == 'activeBatch':
                queryset_list = queryset_list.filter(end_date__exact=None)
                print(queryset_list)
        return queryset_list


class BatchDetailAPIView(
    generics.RetrieveAPIView,
        mixins.UpdateModelMixin,
        mixins.DestroyModelMixin):

    permission_classes = [AllowAny]
    serializer_class = BatchDetailSerializer
    queryset = Batch.objects.all()

    def get_serializer_class(self):
        serializer_class = self.serializer_class

        if self.request.method == 'PATCH':
            serializer_class = BatchPatchSerializer
        else:
            serializer_class = BatchDetailSerializer

        return serializer_class

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class CommentAPIView(ListAPIView):
    '''Gets list of comments for a batch, or all comments if no batch is specified'''
    permission_classes = [AllowAny]
    serializer_class = CommentSerializer
    queryset = BatchComment.objects.all()
    lookup_url_kwarg = 'batch_number'

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_queryset(self):
        _batch_number = self.kwargs.get(self.lookup_url_kwarg)
        if _batch_number is not None:
            queryset_list = BatchComment.objects.filter(
                batch_number=_batch_number)
        else:
            queryset_list = BatchComment.objects.all()
        return queryset_list


class CommentDetailAPIView(RetrieveAPIView):
    '''Gets detail of batch and comment id'''
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return get_object_or_404(BatchComment, **self.kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

# TODO: Not able to create comments with same comment_id as another comment,
# even though the batch is different
