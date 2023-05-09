from rest_framework import status
from rest_framework import generics
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

from noti.serializers import NotiSerializer

from . models import User
from . serializers import MyTokenObtainPairSerializer, MyUserSerializer, UserSerializer, SearchSerializer
from .permissions import IsUserOrReadOnly
from noti.models import Noti


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow(request, username):
    me = request.user
    user = User.objects.get(username=username)

    if user in me.following.all():
        me.following.remove(user)
        return Response({ 'detail': 'Unfollowed' }, status=status.HTTP_200_OK)
    else:
        me.following.add(user)
        noti = Noti(
            type='follow you',
            to_user=user,
            from_user=me
                )
        noti.save()
        serializer = NotiSerializer(noti, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reco(request):
    users = User.objects.exclude(username=request.user.username)
    users = users.exclude(id__in = request.user.following.all())[:5]
    serializer = SearchSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search(request):
    query = request.query_params.get('query', None)
    if query is not None:
        users = User.objects.filter(username__icontains=query)
        serializer = SearchSerializer(users, many=True)
        return Response({ 'users': serializer.data })
    else:
        return Response({'users': []})

class UserDeatilView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]
    lookup_field = 'username'
    lookup_url_kwarg = 'username'

class MyTokenObtainPairSerializer(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register(request):
    data = request.data
    user = User.objects.create(
        username=data['username'],
        email=data['email'],
        password=make_password(data['password'])
    )
    serializer = MyUserSerializer(user, many=False)
    return Response(serializer.data)
