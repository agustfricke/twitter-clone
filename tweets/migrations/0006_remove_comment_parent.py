# Generated by Django 4.2 on 2023-04-18 18:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0005_comment_parent'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='parent',
        ),
    ]
