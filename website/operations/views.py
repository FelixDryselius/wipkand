from django.shortcuts import render
from django.views.generic import TemplateView
from .models import ProductOrder, Batch

from operations.models import Product, ProductOrder, Batch, BatchComment
from .forms import OrderForm, BatchForm
#from django.template.context_processors import csrf TODO: Should csrf be used with Posts?

# Create your views here.

class startBatchView(TemplateView):
    template_name = 'operations/startBatch.html'

    def get(self, request):
        orderForm = OrderForm()
        batchForm = BatchForm()
        return render(request, self.template_name, {
            'orderForm': orderForm,
            'batchForm': batchForm
        })


    #TODO: Order can now be submitted with any numbers of digits (should only be constrained to 7 digits)
    def post(self, request):
        orderParam = {"order_number", "article_number"}
        batchParam ={"batch_number"}
        orderForm = OrderForm(getattr(request.POST, orderParam)) #sets form according to user input on html page
        batchForm = BatchForm(getattr(request.POST, batchParam))
        orderNumber = None # init it so that the it can compile
        if orderForm.is_valid() and batchForm.is_valid(): # saves the form, eg new order to the database
            orderForm.save()
            batchForm.save()
            orderNumber = orderForm.cleaned_data['order_number']

        context = {
            'orderForm': OrderForm(),
            'batchForm': BatchForm(), 
            'orderNumber': orderNumber #Cleaned data of order number. Sent to html template through args 'context', not used for anythin yet.
            }
        return render(request, self.template_name, context)


def index(request):
    context = {
    }
    return render(request, 'operations/index.html', context) 

