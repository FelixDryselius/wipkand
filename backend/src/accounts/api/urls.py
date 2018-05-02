
from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from accounts.api.views import (
    UserCreateAPIView,
    AuthView,
    JWTTokenRefreshView,
    )

urlpatterns = [
    path('register/', UserCreateAPIView.as_view(), name='register'),
    path('token/', AuthView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', JWTTokenRefreshView.as_view(), name='token_refresh'),
]