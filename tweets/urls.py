from django.urls import path
from . import views

urlpatterns = [
    path('', views.TweetList.as_view()),
    path('<int:pk>/', views.TweetDetail.as_view()),
    path('<str:username>/', views.get_user_tweets),
    path('like/<int:pk>/', views.liked),
    path('retweet/<int:pk>/', views.retweet),
    path('comments/<int:pk>/', views.CommentList.as_view()),
    path('comment/<int:pk>/', views.CommentDetail.as_view()),
]
