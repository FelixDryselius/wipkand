from django.shortcuts import render

from .models import Product, ProductOrder, Batch, BatchComment

# Create your views here.

def index(request):
    context = {

    }

    return render(request, 'operations/index.html', context) 