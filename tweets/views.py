from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from notifications.models import Notification
from . models import Tweet, Comment
from users.models import User
from . serializers import TweetSerializer, MyTweetSerializer, CommentSerializer
from . permissions import IsOwnerOrReadOnly
from backend.pagination import CustomPagination

class TweetList(generics.ListCreateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    pagination_class = CustomPagination
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentList(generics.ListCreateAPIView):
    def get_object(self,pk):
        tweet = Tweet.objects.get(pk=pk)
        return tweet
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    def post(self,request,pk):
        tweet = self.get_object(pk)
        data = request.data
        comment = Comment(
                body=data['body'], 
                user=request.user,
                tweet=tweet)
        comment.save()
        if request.user != tweet.user:
            Notification.objects.get_or_create(notification_type='C', tweet=tweet, to_user=tweet.user, from_user=request.user)
        serializer = CommentSerializer(comment, many=False)
        return Response(serializer.data)

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
        if request.user != tweet.user:
            Notification.objects.get_or_create(notification_type='L', tweet=tweet, to_user=tweet.user, from_user=request.user)
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
        if request.user != tweet.user:
            Notification.objects.get_or_create(notification_type='RT', tweet=tweet, to_user=tweet.user, from_user=request.user)
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



class TweetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer

    permission_classes = [IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]

