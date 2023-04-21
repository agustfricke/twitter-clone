import os
from django.core.asgi import get_asgi_application
from django.urls import path
from channels.routing import ProtocolTypeRouter, URLRouter

from chat.consumers import PersonalChatConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_asgi_application()

application = ProtocolTypeRouter({
    'websocket': (
        URLRouter([
            path('ws/<str:username>/<str:my_username>/', PersonalChatConsumer.as_asgi())
        ])
    )
})
