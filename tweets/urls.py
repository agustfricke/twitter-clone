from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'tweets', views.TweetViewSet, basename='tweets')

urlpatterns = [
    path('', include(router.urls)),
]
