# Generated by Django 4.2 on 2023-05-08 17:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0002_tweet_parent'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tweet',
            name='parent',
        ),
    ]
