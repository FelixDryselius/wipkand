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

    def get_queryset(self, *args, **kwargs):
        queryset_list = BatchComment.objects.all()
        print('PRINTING ARGS: ')
        for arg in args:
            print(arg)

        print('PRINTING KWARGS: ')
        for kwarg in kwargs:
            print(kwarg)

        return queryset_list

class CommentDetailAPIView(RetrieveAPIView):
    serializer_class = CommentDetailSerializer
    queryset = BatchComment.objects.all()

    #def get(self, request, *args, **kwargs):



# class OrderListView(APIView):
#     def get(self, request):
#         orders = ProductOrder.objects.all()
#         serializer = OrderSerializer(orders, many=True)
#         return Response(serializer.data)

#     def put(self, request):
#         serializer = OrderSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class BatchListView(APIView):
#     def get(self, request):
#         batchs = Batch.objects.all()
#         serializer = BatchSerializer(batchs, many=True)
#         return Response(serializer.data)

#     def put(self, request):
#         serializer = BatchSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class BatchDetailView(APIView):
#     def get(self, request, pk):
#         batch = get_object_or_404(Batch, pk=pk)
#         serializer = BatchSerializer(batch)
#         return Response(serializer.data)

#     def delete(self, request, pk):
#         batch = get_object_or_404(Batch, pk=pk)
#         batch.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)    


# class BatchCommentListView(APIView):
#     def get(self, request):
#         batchComments = BatchComment.objects.all()
#         serializer = BatchCommentSerializer(batchComments, many=True)
#         return Response(serializer.data)

#     def put(self, request):
#         serializer = BatchCommentSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)