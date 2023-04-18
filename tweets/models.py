from django.db import models
from users.models import User

class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    image = models.ImageField(blank=True)
    liked = models.ManyToManyField(User, related_name='liked', blank=True)
    retweeted = models.ManyToManyField(User, related_name='retweeted', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    @property
    def retweeted_count(self):
        return self.retweeted.all().count()

    @property
    def likes_count(self):
        return self.liked.all().count()


class Comment(models.Model):
    body = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey(Tweet, related_name="parent_tweet", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

