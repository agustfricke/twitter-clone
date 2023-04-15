from rest_framework import serializers, status
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework_simplejwt.views import TokenObtainPairView

from . models import User
from . serializers import UserSerializer, MyTokenObtainPairSerializer, MyUserSerializer
from . permissions import IsUserOrReadOnly

class UserDetailView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsUserOrReadOnly]
    lookup_field = 'username'
    lookup_url_kwarg = 'username'

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
        message = {'detail': 'Something went wrong'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



