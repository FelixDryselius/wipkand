from django import forms
from .models import Product, ProductOrder, Batch, BatchComment

class OrderForm(forms.ModelForm):

    class Meta:
         model = ProductOrder
         fields = '__all__'

