from rest_framework import serializers, status
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from . models import User
from . serializers import UserSerializer, MyTokenObtainPairSerializer, MyUserSerializer



class MyTokenObtainPairSerializer(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register(request):
    data = request.data
    try:
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = MyUserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def register(request):
#     serializer = MyUserSerializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     serializer.save()
#     return Response(serializer.data)
