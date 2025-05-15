from django.contrib import admin
from .models import Room, Message, UserProfile

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_by', 'created_at')
    search_fields = ('name', 'description')
    list_filter = ('created_at',)

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('user', 'room', 'content', 'timestamp')
    search_fields = ('content', 'user__username', 'room__name')
    list_filter = ('timestamp', 'room')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'status', 'last_active')
    search_fields = ('user__username', 'status')
    list_filter = ('last_active',)
