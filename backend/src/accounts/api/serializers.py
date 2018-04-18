
from django.contrib.auth import get_user_model

from rest_framework.serializers import (
    ModelSerializer,
)

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


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        #token['name'] = user.name
        token['test'] = 'test'
        # ...

        return token
