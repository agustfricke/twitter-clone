from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from users.models import User
from . models import Chat


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chat(request, pk):
    user_obj = User.objects.get(pk=pk)

    if request.user.id > user_obj.id:
        thread_name = f'chat_{request.user.id}-{user_obj.id}'
    else:
        thread_name = f'chat_{user_obj.id}-{request.user.id}'

    message_objs = Chat.objects.filter(thread_name=thread_name)
    return Response({ 'messages': message_objs })

    

