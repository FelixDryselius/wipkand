from django import forms
from .models import Product, ProductOrder, Batch, BatchComment

class OrderForm(forms.ModelForm):

    class Meta:
         model = ProductOrder
         fields = '__all__'

class BatchForm(forms.ModelForm):

    class Meta:
         model = Batch
         fields = '__all__'

class StartBatchForm(forms.Form):
    batch_number = forms.CharField(max_length=10)
    order_number = forms.CharField(max_length=7)
    article_number = forms.ModelChoiceField(Product.objects.all())
        