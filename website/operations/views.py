from rest_framework.response import Response
from rest_framework import routers, serializers, status
from rest_framework.views import APIView
from rest_framework import status

from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView
from .models import ProductOrder, Batch
from django.db.models.options import Options

from operations.models import Product, ProductOrder, Batch, BatchComment
from .forms import OrderForm, BatchForm, StartBatchForm
from operations.serializers import ProductSerializer, OrderSerializer, BatchSerializer, BatchCommentSerializer
#from django.template.context_processors import csrf TODO: Should csrf be used with Posts?

# Create your views here.

class startBatchView(TemplateView):
    template_name = 'operations/startBatch.html'

    def get(self, request):
        form = StartBatchForm()
        return render(request, self.template_name, { "form": form })


    #TODO: Order can now be submitted with any numbers of digits (should only be constrained to 7 digits)
    def post(self, request):
        form = StartBatchForm(request.POST)
        orderNumber = None # init it so that the it can compile
        if form.is_valid(): # saves the form, eg new order to the database
            #form.save()
            orderNumber = form.cleaned_data['order_number']

        context = {
            'form': StartBatchForm(),
            'orderNumber': orderNumber #Cleaned data of order number. Sent to html template through args 'context', not used for anythin yet.
            }
        return render(request, self.template_name, context)


def index(request):
    context = {
    }
    return render(request, 'operations/index.html', context) 


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