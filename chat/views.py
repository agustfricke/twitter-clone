from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from users.models import User
from . models import Chat
from . serializers import ChatSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chat(request, username):
    user_obj = User.objects.get(username=username)

    if request.user.username > user_obj.username:
        canal = f'chat_{user_obj.username}-{request.user.username}'
        print(canal)

    else:
        canal = f'chat_{request.user.username}-{user_obj.username}'
        print(canal)

    mess = Chat.objects.filter(canal=canal)
    serializer = ChatSerializer(mess, many=True)
    return Response(serializer.data)


