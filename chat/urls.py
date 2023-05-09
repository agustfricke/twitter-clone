from django.urls import path
from . import  views

urlpatterns = [
    path('canal/<str:username>/', views.chat),
]
