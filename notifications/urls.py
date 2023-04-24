from django.urls import path
from . import  views

urlpatterns = [
    path('noti/', views.noti),
    path('leer/', views.leer),
    path('no_l/', views.no_l),
]

