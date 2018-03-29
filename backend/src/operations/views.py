from rest_framework.response import Response
from rest_framework import routers, serializers, status
from rest_framework.views import APIView
from rest_framework import status

from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView
from .models import ProductOrder, Batch
from django.db.models.options import Options
from django import forms

from operations.models import Product, ProductOrder, Batch, BatchComment
from .forms import OrderForm, BatchForm
from operations.serializers import ProductSerializer, OrderSerializer, BatchSerializer, BatchCommentSerializer
#from django.template.context_processors import csrf TODO: Should csrf be used with Posts?

# Create your views here.


class StartBatchView(TemplateView):
    template_name = 'operations/startBatch.html'

    def get(self, request):
        context = {
            'batchForm': BatchForm(),
            'orderForm': OrderForm(),
        }
        return render(request, self.template_name, context)


    #TODO: Order can now be submitted with any numbers of digits (should only be constrained to 7 digits)
    def post(self, request):    
        batchForm = BatchForm(request.POST)
        orderForm = OrderForm(request.POST)
        orderNumber = None # init it so that the it can compile
        if orderForm.is_valid() and batchForm.is_valid():
            orderForm.save()
            batchForm.save()
            orderNumber = orderForm.cleaned_data["order_number"]
            print("the form is valid " + orderNumber)

        context = {
            'batchForm': BatchForm(),
            'orderForm': OrderForm(),
            'orderNumber': orderNumber #Cleaned data of order number. Sent to html template through args 'context', not used for anythin yet.
            }
        return render(request, self.template_name, context)


def index(request):
    context = {
    }
    return render(request, 'operations/index.html', context) 

class HistoryView(TemplateView):
    template_name = 'operations/history.html'
     
    def get(self, request):
        context = {}
        return render(request, self.template_name, context)


class ProductListView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def put(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderListView(APIView):
    def get(self, request):
        orders = ProductOrder.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def put(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BatchListView(APIView):
    def get(self, request):
        batchs = Batch.objects.all()
        serializer = BatchSerializer(batchs, many=True)
        return Response(serializer.data)

    def put(self, request):
        serializer = BatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BatchDetailView(APIView):
    def get(self, request, pk):
        batch = get_object_or_404(Batch, pk=pk)
        serializer = BatchSerializer(batch)
        return Response(serializer.data)

    def delete(self, request, pk):
        batch = get_object_or_404(Batch, pk=pk)
        batch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)    


class BatchCommentListView(APIView):
    def get(self, request):
        batchComments = BatchComment.objects.all()
        serializer = BatchCommentSerializer(batchComments, many=True)
        return Response(serializer.data)

    def put(self, request):
        serializer = BatchCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)