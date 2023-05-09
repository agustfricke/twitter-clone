from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . models import User

class SearchSerializer(serializers.ModelSerializer):

    username = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['username', 'avatar']


class UserSerializer(serializers.ModelSerializer):

    email = serializers.ReadOnlyField()
    username = serializers.ReadOnlyField()
    followers =  serializers.SerializerMethodField(read_only=True)
    i_follow = serializers.SerializerMethodField(read_only=True) 
    following = serializers.SerializerMethodField(read_only=True) 
    followed_usernames = serializers.SerializerMethodField(read_only=True) 

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar', 'bio', 'cover_image', 
                  'date_joined', 'i_follow', 'followers', 'following', 'name', 'followed_usernames']

    def get_i_follow(self, obj):
        current_user = self.context.get('request').user
        return True if current_user in obj.followed.all() else False
    
    def get_followers(self,obj):
        return obj.followed.count()
    
    def get_following(self,obj):
        return obj.following.count()

    def get_followed_usernames(self, obj): 
        return obj.followed_usernames

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['avatar'] = user.avatar.url

        return token

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
