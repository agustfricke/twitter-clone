from rest_framework import viewsets 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from . models import Tweet
from users.models import User
from . serializers import TweetSerializer
from . permissions import IsAuthorOrReadOnly

class TweetViewSet(viewsets.ModelViewSet):
    serializer_class = TweetSerializer
    queryset = Tweet.objects.all()
    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request):
    data = request.data
    tweet = Tweet.objects.create(
            user = request.user,
            content = data['content']
            )
    serializer = TweetSerializer(tweet)
    return Response(serializer.data)


