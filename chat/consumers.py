import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from . models import Chat

class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.my_user = self.scope['url_route']['kwargs']['my_username']
        self.other_username = self.scope['url_route']['kwargs']['username']
        self.room_name = f'{self.my_user}-{self.other_username}'
        self.room_group_name = 'chat_%s' % self.room_name
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def receive(self, text_data=None):
        data = json.loads(text_data)
        message = data['message']
        username = data['username']

        await self.save_message(username, self.room_group_name, message)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
            }
        )

    async def chat_message(self, event):
        message = event['message']
        username = event['username']

        await self.send(text_data=json.dumps({
            'message': message,
            'username': username
        }))
        print('message', message, 'username', username)

    async def disconnect(self):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    @database_sync_to_async
    def save_message(self, username, canal, message):
        Chat.objects.create(
            sender=username, msj=message, canal=canal)
