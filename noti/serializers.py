from rest_framework import serializers
from . models import Noti
from tweets.serializers import MyTweetSerializer

class NotiSerializer(serializers.ModelSerializer):
    
    to_user = serializers.ReadOnlyField(source='to_user.username')
    avatar = serializers.ReadOnlyField(source='to_user.avatar.url')
    from_user = serializers.ReadOnlyField(source='from_user.username')
    tweet = MyTweetSerializer(read_only=True)

    class Meta:
        model = Noti
        fields = '__all__'

    def get_avatar(self, obj):
        return obj.user.avatar.url
