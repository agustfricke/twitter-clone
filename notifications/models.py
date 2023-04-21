from django.db import models
from users.models import User
from tweets.models import Tweet, Comment

class Notification(models.Model):
    NOTIFICATION_TYPE = (
        ('L', 'Like'),
        ('C', 'Comment'),
        ('F', 'Follow'),
        ('RT', 'Retweet'),
        ('M', 'Message'),
    )
    notification_type = models.CharField(max_length=2, choices=NOTIFICATION_TYPE, default=None)
    from_user = models.ForeignKey(User,related_name='noti_from', on_delete=models.CASCADE)
    to_user = models.ForeignKey(User,related_name='noti_to', on_delete=models.CASCADE)
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.from_user} - {self.to_user}"

    class Meta:
        ordering = ['-created_at']
