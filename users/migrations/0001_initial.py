# Generated by Django 4.2 on 2023-04-13 23:30

from django.conf import settings
from django.db import migrations, models
import django.utils.timezone
import users.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(max_length=200, unique=True)),
                ('email', models.CharField(max_length=200, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('bio', models.TextField(blank=True, default='')),
                ('avatar', models.ImageField(default='default.jpg', upload_to='avatars')),
                ('cover_image', models.ImageField(default='cover.jpg', upload_to='avatars')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_staff', models.BooleanField(default=False)),
                ('following', models.ManyToManyField(blank=True, related_name='followed', to=settings.AUTH_USER_MODEL)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'ordering': ['-date_joined'],
            },
            managers=[
                ('objects', users.models.CustomUserManager()),
            ],
        ),
    ]
