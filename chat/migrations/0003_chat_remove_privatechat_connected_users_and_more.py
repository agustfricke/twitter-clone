# Generated by Django 4.2 on 2023-04-21 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_message_privatechat_delete_chatmodel_message_room_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.CharField(max_length=50)),
                ('msj', models.CharField(max_length=50)),
                ('canal', models.CharField(max_length=50)),
            ],
        ),
        migrations.RemoveField(
            model_name='privatechat',
            name='connected_users',
        ),
        migrations.RemoveField(
            model_name='privatechat',
            name='user1',
        ),
        migrations.RemoveField(
            model_name='privatechat',
            name='user2',
        ),
        migrations.DeleteModel(
            name='Message',
        ),
        migrations.DeleteModel(
            name='PrivateChat',
        ),
    ]