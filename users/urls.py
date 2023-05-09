from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('follow/<str:username>/', views.follow),
    path('u/search/', views.search),
    path('reco/', views.reco),
    path('register/', views.register),
    path('login/', views.MyTokenObtainPairSerializer.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('<str:username>/', views.UserDeatilView.as_view()),
]

