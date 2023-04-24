from django.db import models
    


class Chat(models.Model):
    sender = models.CharField(max_length=50, blank=False)
    msj = models.CharField(max_length=50, blank=False)
    canal = models.CharField(max_length=50, blank=False)

