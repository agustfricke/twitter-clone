from rest_framework import serializers
from . models import Tweet
from users.serializers import UserSerializer

class TweetSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.SerializerMethodField(source='user.avatar.url')

    class Meta:
        model = Tweet
        fields = '__all__'

    def get_avatar(self, obj):
        return obj.user.avatar.url
