from rest_framework import serializers
from . models import Tweet

class TweetSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Tweet
        fields = '__all__'
