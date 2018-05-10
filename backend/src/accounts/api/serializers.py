
from datetime import datetime

from django.contrib.auth import get_user_model
from django.utils.six import text_type

from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.settings import api_settings


class UserRoleSerializer(serializers.BaseSerializer):
    def to_representation(self, user):
        return {
            'user': user.username,
            'isAdmin': user.is_admin,
            'isOperator': user.is_operator,
            'isSupervisor': user.is_supervisor,
        }

class JWTTokenSerializer(TokenObtainSerializer):
    @classmethod
    def get_token(cls, user):
        token = RefreshToken.for_user(user)
        return token

    def validate(self, attrs):
        data = super(JWTTokenSerializer, self).validate(attrs)

        refresh = self.get_token(self.user)
        data['refresh'] = text_type(refresh)
        data['access'] = text_type(refresh.access_token)
        data['expires'] = datetime.utcfromtimestamp(refresh['exp'])
        data['user'] = attrs['username']

        return data

class JWTTokenRefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        refresh = RefreshToken(attrs['refresh'])

        data = {'access': text_type(refresh.access_token)}

        if api_settings.ROTATE_REFRESH_TOKENS:
            if api_settings.BLACKLIST_AFTER_ROTATION:
                try:
                    # Attempt to blacklist the given refresh token
                    refresh.blacklist()
                except AttributeError:
                    # If blacklist app not installed, `blacklist` method will
                    # not be present
                    pass

            refresh.set_jti()
            refresh.set_exp()

            data['refresh'] = text_type(refresh)
            data['expires'] = datetime.utcfromtimestamp(refresh['exp'])

        return data