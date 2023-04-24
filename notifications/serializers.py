from rest_framework import serializers
from .models import Notification
from users.serializers import UserSerializer
from tweets.serializers import MyTweetSerializer

class NotificationSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(read_only=True)
    to_user = serializers.StringRelatedField(read_only=True)
    tweet = MyTweetSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'
    
