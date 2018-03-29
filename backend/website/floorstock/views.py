from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView
from django.db.models.options import Options
from django import forms



def index(request):
    context = {
    }
    return render(request, 'floorstock/index.html', context) 


class FloorstockView(TemplateView):
    template_name = 'floorstock/index.html'
     
    def get(self, request):
        context = {}
        return render(request, self.template_name, context)
