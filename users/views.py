from rest_framework import serializers, status
from rest_framework import generics
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
import random
from rest_framework.views import APIView


from . models import User
from . serializers import UserSerializer, MyTokenObtainPairSerializer, MyUserSerializer, UserEditSerializer
from . permissions import IsUserOrReadOnly

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserEditSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,IsUserOrReadOnly]
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow(request, username):
    myprofile = request.user
    username = User.objects.get(username=username)

    if username in myprofile.following.all():
        myprofile.following.remove(username)
        return Response({'detail': 'User unfollowed'}, status=status.HTTP_200_OK)
    else:
        myprofile.following.add(username)
        return Response({'detail': 'User followed'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def recommend_user(request):
    users = User.objects.exclude(username=request.user.username)
    users = users.exclude(id__in = request.user.following.all())[:5]
    serializer = UserEditSerializer(users,many=True,context={'request':request})
    return Response(serializer.data)














