from rest_framework import serializers
from . models import Tweet
from users.serializers import UserSerializer
from users.models import User 

class TweetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tweet
        fields = '__all__'
