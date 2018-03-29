from . import views
from django.urls import path, include, re_path
from operations.views import HistoryView, StartBatchView, ProductListView, OrderListView, BatchListView, BatchCommentListView, BatchDetailView

app_name = 'operations' #to make django recognizes that this is the operations "urls", now we can write 'operations:PATH_NAME'

urlpatterns = [
    path('', views.index, name='index'),
    path('startBatch/', StartBatchView.as_view(), name='startBatch'),
    path('history/', HistoryView.as_view(), name="history"),
  
    
    #API urls
    path('operations/api/product', ProductListView.as_view(), name='productAPI'),
    path('operations/api/order', OrderListView.as_view(), name='orderAPI'),
    path('operations/api/batch', BatchListView.as_view(), name='batchListAPI'),
    path('operations/api/batch/<int:pk>', BatchDetailView.as_view(), name='batchDetailAPI'),
    path('operations/api/batchComment', BatchCommentListView.as_view(), name='batchCommentAPI'),
]