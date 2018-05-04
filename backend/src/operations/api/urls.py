from django.urls import path

from operations.api.views import (

    ProductAPIView,
    ProductDetailAPIView,
    OrderAPIView,
    OrderDetailAPIView,
    BatchAPIView,
    BatchDetailAPIView,
    CommentAPIView,
    CommentDetailAPIView
)

#TODO: Split comments up to its own app maybe?
urlpatterns = [
    path('product/', ProductAPIView.as_view(), name='product-list'),
    path('product/<str:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),

    path('order/', OrderAPIView.as_view(), name='order-list'),
    path('order/<str:pk>/', OrderDetailAPIView.as_view(), name='order-detail'),

    path('batch/', BatchAPIView.as_view(), name='batch-list'),
    path('batch/<str:batch_number>/', BatchDetailAPIView.as_view(), name='batch-detail'),

    path('comment/', CommentAPIView.as_view(), name='comment-list'),
    path('comment/<str:batch_number>/', CommentAPIView.as_view(), name='batch-comment-list'),
    path('comment/<str:batch_number>/<int:pk>/', CommentDetailAPIView.as_view(), name='comment-detail'),
]