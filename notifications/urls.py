from django.urls import path
from . import  views

urlpatterns = [
    path('noti/', views.noti),
    path('noti/<int:pk>', views.get),
]

