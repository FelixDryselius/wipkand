
from django.contrib.auth import get_user_model

from rest_framework import generics, status
from rest_framework.response import Response

from rest_framework.generics import (
    CreateAPIView,
)
from rest_framework.permissions import (
    AllowAny,
)

from rest_framework.views import APIView

from rest_framework_simplejwt.authentication import AUTH_HEADER_TYPES
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

from accounts.api.serializers import JWTTokenSerializer, JWTTokenRefreshSerializer, UserRoleSerializer


class RoleView(APIView):
    # authentication_classes = (isAuthenticated,)
    # permission_classes = (AllowAny,)

    def get(self, request):
        user = request.user
        serializer = UserRoleSerializer(user)
        return Response(serializer.data)
        

class AuthView(generics.GenericAPIView):
    serializer_class = JWTTokenSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    www_authenticate_realm = 'api'

    def get_authenticate_header(self, request):
        return '{0} realm="{1}"'.format(
            AUTH_HEADER_TYPES[0],
            self.www_authenticate_realm,
        )

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class JWTTokenRefreshView(AuthView):
    """
    Takes a refresh type JSON web token and returns an access type JSON web
    token if the refresh token is valid.
    """
    serializer_class = JWTTokenRefreshSerializer
