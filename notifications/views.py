from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Notification
from .serializers import NotificationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def noti(request):
    notify_list = Notification.objects.filter(to_user=request.user)
    serializer = NotificationSerializer(notify_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def no_l(request):
    noti_count = Notification.objects.filter(to_user=request.user,is_read=False)
    if noti_count == 0:
        noti_count  = None  
    serializer = NotificationSerializer(noti_count, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def leer(request):
    notify_list = Notification.objects.filter(to_user=request.user, is_read=False)
    for i in notify_list:
        i.is_read = True
        i.save()
    return Response({'message': 'Notificaciones leidas'})


