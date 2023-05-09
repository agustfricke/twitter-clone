from django.db import models

class Chat(models.Model):
    username = models.CharField(max_length=50)
    message = models.CharField(max_length=50)
    canal = models.CharField(max_length=50)
