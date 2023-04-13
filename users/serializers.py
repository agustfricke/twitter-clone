from rest_framework import serializers
from . models import User
from rest_framework import CurrentUserDefault

class UserSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField(read_only=True)
    followers = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

        def get_following(self, obj):
            return obj.following.all().count()

        def get_followers(self, obj):
            return obj.followers.all().count()
