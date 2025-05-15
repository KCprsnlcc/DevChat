from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Room, Message, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'avatar', 'status', 'last_active']

class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'room', 'user', 'content', 'timestamp']
        read_only_fields = ['user', 'timestamp']

class RoomSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    messages = MessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Room
        fields = ['id', 'name', 'description', 'created_at', 'created_by', 'messages']
        read_only_fields = ['created_at', 'created_by']
        
    def create(self, validated_data):
        room = Room.objects.create(**validated_data)
        return room 