from rest_framework import serializers
from . models import Tweet, Comment

class CommentSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar.url')

    class Meta:
        model = Comment
        fields = '__all__'

    def get_avatar(self, obj):
        return obj.user.avatar.url

class MyTweetSerializer(serializers.ModelSerializer):

    likes_count = serializers.SerializerMethodField(read_only=True)
    retweets_count = serializers.SerializerMethodField(read_only=True)
    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar.url')

    class Meta:
        model = Tweet
        fields = ['id', 'user', 
                  'avatar', 
                  'content', 
                  'image', 'liked', 
                  'retweeted', 'created_at', 
                  'likes_count', 'retweets_count','parent']

    def get_avatar(self, obj):
        return obj.user.avatar.url

    def get_likes_count(self, obj):
        return obj.liked.all().count()

    def get_retweets_count(self, obj):
        return obj.retweeted.all().count()

class TweetSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar.url')

    likes_count = serializers.SerializerMethodField(read_only=True)
    retweets_count = serializers.SerializerMethodField(read_only=True)

    iliked = serializers.SerializerMethodField(read_only=True)
    iretweeted = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'user', 
                  'avatar', 
                  'content', 
                  'image', 'liked', 'retweeted', 'created_at', 'likes_count', 'retweets_count', 'iliked', 'iretweeted', 'parent']



    def get_avatar(self, obj):
        return obj.user.avatar.url

    def get_likes_count(self, obj):
        return obj.liked.all().count()

    def get_retweets_count(self, obj):
        return obj.retweeted.all().count()

    def get_iliked(self, obj):
        return True if self.context['request'].user in obj.liked.all() else False

    def get_iretweeted(self, obj):
        return True if self.context['request'].user in obj.retweeted.all() else False
