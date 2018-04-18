
from django.contrib.auth import get_user_model

from rest_framework.serializers import (
    ModelSerializer,
)
from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


User = get_user_model()


class UserCreateSerializer(ModelSerializer):
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


class VFALTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(VFALTokenSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super(VFALTokenSerializer, self).validate(attrs)
        data['username'] = attrs['username']
        return data