from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from . models import Noti
from . serializers import NotiSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def noti(request):
    user = request.user
    notis = Noti.objects.filter(to_user=user, is_read=True)
    serializer = NotiSerializer(notis, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def noti_no_l(request):
    user = request.user
    notis = Noti.objects.filter(to_user=user, is_read=False)
    serializer = NotiSerializer(notis, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def noti_read(request):
    user = request.user
    notis = Noti.objects.filter(to_user=user, is_read=False)
    for noti in notis:
        noti.is_read = True
        noti.save()
    return Response({ 'message': 'Leido'})










