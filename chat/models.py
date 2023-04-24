from django.db import models
    


class Chat(models.Model):
    username = models.CharField(max_length=50, blank=False)
    message = models.CharField(max_length=50, blank=False)
    canal = models.CharField(max_length=50, blank=False)

