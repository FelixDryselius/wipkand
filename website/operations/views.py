from django.shortcuts import render
from django.views.generic import TemplateView
from .models import ProductOrder, Batch
from django.db.models.options import Options

from operations.models import Product, ProductOrder, Batch, BatchComment
from .forms import OrderForm, BatchForm, StartBatchForm
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
        form.pop("batch_number")
        print(form)
        print('\n')
        if form.is_valid(): # saves the form, eg new order to the database
           # form.save()
            print("the form is valid")
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

