from rest_framework import serializers
from . models import Tweet, Comment
from users.serializers import UserSerializer

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'


class MyTweetSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.SerializerMethodField(source='user.avatar.url')

    likes_count = serializers.SerializerMethodField(read_only=True)
    retweeted_count  = serializers.SerializerMethodField(read_only=True)

    comment_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = '__all__'

    def get_comment_count(self,obj):
        return obj.parent_tweet.all().count()

    def get_avatar(self, obj):
        return obj.user.avatar.url

    def get_likes_count(self, obj):
        return obj.liked.all().count()

    def get_retweeted_count(self, obj):
        return obj.retweeted.all().count()


class TweetSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.SerializerMethodField(source='user.avatar.url')

    likes_count = serializers.SerializerMethodField(read_only=True)
    retweeted_count  = serializers.SerializerMethodField(read_only=True)

    iliked = serializers.SerializerMethodField(read_only=True)
    
    iretweeted = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = '__all__'

    def get_avatar(self, obj):
        return obj.user.avatar.url

    def get_likes_count(self, obj):
        return obj.liked.all().count()

    def get_retweeted_count(self, obj):
        return obj.retweeted.all().count()

    def get_iliked(self,obj):
        return True if self.context.get('request').user in obj.liked.all() else False

    def get_iretweeted(self,obj):
        return True if self.context.get('request').user in obj.retweeted.all() else False
