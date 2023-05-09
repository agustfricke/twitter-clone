from django.urls import path
from . import views

urlpatterns = [
    path('', views.noti),
    path('no/', views.noti_no_l),
    path('leer/', views.noti_read),
]

