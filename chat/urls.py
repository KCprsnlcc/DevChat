from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'rooms', views.RoomViewSet)
router.register(r'messages', views.MessageViewSet, basename='message')
router.register(r'users', views.UserViewSet)
router.register(r'profiles', views.UserProfileViewSet, basename='profile')

urlpatterns = [
    path('', include(router.urls)),
    path('room/<int:room_id>/messages/', views.room_messages, name='room_messages'),
    path('current-user/', views.CurrentUserView.as_view(), name='current_user'),
    path('register/', views.RegisterView.as_view(), name='register'),
] 