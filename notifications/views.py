from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.views import APIView

from .models import Notification
from .serializers import NotificationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def noti(request):
    notify_list = Notification.objects.filter(to_user=request.user,)
    noti_count = Notification.objects.filter(to_user=request.user, is_read=False).count()
    if noti_count == 0:
        noti_count  = None  
    serializer = NotificationSerializer(notify_list, many=True)
    return Response({"notifications": serializer.data, "noti_count": noti_count})
    
class NotiDelete(APIView):
    def get(self, request):
        notify_list = Notification.objects.filter(to_user=request.user, is_read=False)
        for i in notify_list:
            i.is_read = True
            i.save()
        Notification.objects.filter(Q(notification_type='M',to_user=request.user)).delete()
        return Response({"user_seen": True})
    
    def post(self,request, pk):
        noti_id = Notification.objects.get(pk=pk)
        notification = get_object_or_404(Notification, noti_id)
        if notification.to_user == request.user:
            notification.is_read =  True
            notification.delete()
            return Response({"notification_deleted": True})


