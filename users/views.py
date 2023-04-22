from rest_framework import status
from rest_framework import generics
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from . models import User
from . serializers import UserSerializer, MyTokenObtainPairSerializer, MyUserSerializer, UserEditSerializer
from . permissions import IsUserOrReadOnly
from notifications.models import Notification


@api_view(['GET'])
def search(request):
    query = request.query_params.get('query')
    if query == None:
        query = ''
    users = User.objects.filter(username__icontains=query)
    serializer = UserSerializer(users, many=True)
    return Response({ 'users': serializer.data })


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
        Notification.objects.get_or_create(notification_type='F', to_user=username, from_user=myprofile)
        myprofile.following.add(username)
        return Response({'detail': 'User followed'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def recommend_user(request):
    users = User.objects.exclude(username=request.user.username)
    users = users.exclude(id__in = request.user.following.all())[:5]
    serializer = UserEditSerializer(users,many=True,context={'request':request})
    return Response(serializer.data)














