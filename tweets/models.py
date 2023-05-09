from django.db import models
from users.models import User

class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=140)
    image = models.ImageField(blank=True, null=True)
    liked = models.ManyToManyField(User, default=None, blank=True, related_name='liked')
    retweeted = models.ManyToManyField(User, default=None, blank=True, related_name='retweeted')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE, related_name='parent')
    body = models.CharField(max_length=140)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']


