from django.db import models
from users.models import User
from tweets.models import Tweet, Comment

class Noti(models.Model):
    type = models.CharField(max_length=40)
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='noti_from')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='noti_to')
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE, null=True, blank=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
