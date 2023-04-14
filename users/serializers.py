from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class UserSerializer(serializers.ModelSerializer):
    i_follow = serializers.SerializerMethodField(read_only=True)
    following = serializers.SerializerMethodField(read_only=True)
    followers = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'following', 'followers', 'avatar', 'bio', 'cover_image', 'date_joined']

        def get_i_follow(self, obj):
            current_user = self.context['request'].user
            if current_user in obj.followed.all():
                return True
            else:
                return False

        def get_following(self, obj):
            return obj.following.all().count()

        def get_followers(self, obj):
            return obj.followers.all().count()
