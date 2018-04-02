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
