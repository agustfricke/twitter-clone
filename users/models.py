from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager

class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('You must privided a valid email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=200, unique=True)
    email = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=255, blank=True)
    following = models.ManyToManyField("self",symmetrical=False,related_name="followed" ,blank=True)
    bio = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(default='user.png')
    cover_image = models.ImageField(default='cover.png')
    date_joined = models.DateTimeField(default=timezone.now)

    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        ordering = ['-date_joined']

    @property
    def followed_usernames(self):
        return [{'username': user.username, 'avatar': user.avatar.url} for user in self.followed.all()]


    
