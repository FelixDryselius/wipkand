from django.shortcuts import render
from django.views.generic import TemplateView

from operations.models import Product, ProductOrder, Batch, BatchComment
from .forms import OrderForm
#from django.template.context_processors import csrf TODO: Should csrf be used with Posts?

# Create your views here.

class startBatchView(TemplateView):
    template_name = 'operations/startBatch.html'

    def get(self, request):
        form = OrderForm()
        return render(request, self.template_name, {'form': form})

    #TODO: Order can now be submitted with any numbers of digits (should only be constrained to 7 digits)
    def post(self, request):
        form = OrderForm(request.POST)
        orderNumber = None
        if form.is_valid():
            form.save()
            
            #Cleaned data of order number. Sent to html template through args 'context'
            orderNumber = form.cleaned_data['order_number']
            form = OrderForm()

        context = {'form': form, 'orderNumber': orderNumber}
        return render(request, self.template_name, context)


def index(request):
    context = {
    }
    return render(request, 'operations/index.html', context) 


def startBatch(request):
    return render(request, 'operations/startBatch.html')
