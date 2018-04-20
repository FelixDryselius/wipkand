'''API views for operations'''

from django.shortcuts import get_object_or_404
from django.db.models import Q

"""The following import and related code are part of a test"""
from rest_framework.authentication import SessionAuthentication

from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    # UpdateAPIView,
    # DestroyAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView,
)

from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny,
)

from operations.models import Product, ProductOrder, Batch, BatchComment
from operations.api.serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
    OrderListSerializer,
    OrderDetailSerializer,
    OrderCreateUpdateSerializer,
    BatchListSerializer,
    BatchDetailSerializer,
    BatchCreateUpdateSerializer,
    CommentListSerializer,
    CommentDetailSerializer,
    CommentCreateUpdateSerializer,
)

class ProductListAPIView(ListAPIView):
    '''List of products'''
    serializer_class = ProductListSerializer
    queryset = Product.objects.all()
    # permission_classes = [AllowAny]

class ProductDetailAPIView(RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    queryset = Product.objects.all()
    # permission_classes = [AllowAny]


class OrderListAPIView(ListAPIView):
    serializer_class = OrderListSerializer
    queryset = ProductOrder.objects.all()
    # permission_classes = [AllowAny]

class OrderDetailAPIView(RetrieveAPIView):
    serializer_class = OrderDetailSerializer
    queryset = ProductOrder.objects.all()
    # permission_classes = [AllowAny]

class OrderCreateAPIView(CreateAPIView):
    serializer_class = OrderCreateUpdateSerializer
    #permission_classes = [AllowAny]
    #permission_classes = [IsAuthenticated]
    #authentication_classes = [SessionAuthentication] #part of a test


class BatchListAPIView(ListAPIView):
    serializer_class = BatchListSerializer
    # permission_classes = [AllowAny]

    def get_queryset(self, *args, **kwargs):
        queryset_list = Batch.objects.all()
        query = self.request.GET.get("q")
        print ("In the get_queryset. query is: ")
        print(query)
        x = type(query) is str
        print("Type of query is string: " + str(x))
        if query:
            if query == 'activeBatch':
                queryset_list = queryset_list.filter(end_date__exact=None)
                print(queryset_list)
        return queryset_list


class BatchDetailAPIView(RetrieveAPIView):
    # permission_classes = [AllowAny]
    #authentication_classes = [SessionAuthentication]
    serializer_class = BatchDetailSerializer
    queryset = Batch.objects.all()

class BatchCreateAPIView(CreateAPIView):
    serializer_class = BatchCreateUpdateSerializer
    # permission_classes = [AllowAny]
    #authentication_classes = [SessionAuthentication]
    queryset = Batch.objects.all()

class BatchUpdateAPIView(RetrieveUpdateAPIView):
    # permission_classes = [AllowAny]
    serializer_class = BatchCreateUpdateSerializer
    queryset = Batch.objects.all()


class CommentListAPIView(ListAPIView):
    '''Gets list of comments for a batch, or all comments if no batch is specified'''
    # permission_classes = [AllowAny]
    serializer_class = CommentListSerializer
    queryset = BatchComment.objects.all()
    lookup_url_kwarg = 'batch_number'

    def get_queryset(self):
        _batch_number = self.kwargs.get(self.lookup_url_kwarg)
        if _batch_number is not None:
            queryset_list = BatchComment.objects.filter(batch_number=_batch_number)
        else:
            queryset_list = BatchComment.objects.all()
        return queryset_list

class CommentDetailAPIView(RetrieveAPIView):
    '''Gets detail of batch and comment id'''
    serializer_class = CommentDetailSerializer
    # permission_classes = [AllowAny]

    def get_object(self):
        return get_object_or_404(BatchComment, **self.kwargs)

#TODO: Not able to create comments with same comment_id as another comment,
#even though the batch is different
class CommentCreateAPIView(CreateAPIView):
    serializer_class = CommentCreateUpdateSerializer
    #permission_classes = [AllowAny]

    #permission_classes = [IsAuthenticated]

