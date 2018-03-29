from django import forms
from .models import Product, ProductOrder, Batch, BatchComment

class OrderForm(forms.ModelForm):

    class Meta:
         model = ProductOrder
         fields = '__all__'

class BatchForm(forms.ModelForm):

    class Meta:
         model = Batch
         fields = ["batch_number", "order_number"]

