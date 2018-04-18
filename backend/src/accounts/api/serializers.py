
from datetime import datetime

from django.contrib.auth import get_user_model
from django.utils.six import text_type

from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'password',
            # 'email',
        ]
        extra_kwargs = {"password":
                        {"write_only": True}
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
