from rest_framework import generics, exceptions
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from . models import Tweet, Comment
from users.models import User
from . serializers import TweetSerializer, MyTweetSerializer, CommentSerializer
from . permissions import IsOwnerOrReadOnly


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    permission_classes = [IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def liked(request, pk):

    tweet = Tweet.objects.get(pk=pk)

    if request.user in tweet.liked.all():
        liked = False
        tweet.liked.remove(request.user)
    else:
        liked = True
        tweet.liked.add(request.user)
    return Response({
        'liked': liked,
        'count': tweet.likes_count
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def retweet(request, pk):
    tweet = Tweet.objects.get(pk=pk)

    if request.user in tweet.retweeted.all():
        retweeted = False
        tweet.retweeted.remove(request.user)
    else:
        retweeted = True
        tweet.retweeted.add(request.user)
    return Response({
        'retweeted': retweeted,
        'count': tweet.retweeted_count
    })




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_tweets(request, username):
    user = User.objects.get(username=username)
    tweets = Tweet.objects.filter(user=user)
    serializer = MyTweetSerializer(tweets, many=True)
    return Response(serializer.data)

class TweetList(generics.ListCreateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TweetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer

    permission_classes = [IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]



