from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from . models import Tweet
from users.models import User
from . serializers import TweetSerializer
from . permissions import IsOwnerOrReadOnly

class TweetList(generics.ListCreateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TweetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer

    permission_classes = [IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]



