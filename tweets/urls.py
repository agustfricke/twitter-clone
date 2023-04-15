from django.urls import path
from . import views

urlpatterns = [
    path('', views.TweetList.as_view()),
    path('<int:pk>/', views.TweetDetail.as_view()),
]
