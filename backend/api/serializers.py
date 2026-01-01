from rest_framework import serializers
from django.contrib.auth.models import User
from .models import AuthorProfile, Book, Category, Content, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class AuthorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = AuthorProfile
        fields = ['id', 'user', 'bio', 'profile_picture', 'website']


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = [
            'id', 'title', 'slug', 'description', 'cover_image',
            'purchase_url', 'is_featured', 'created_at', 'updated_at'
        ]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']

class ContentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Content
        fields = [
            'id', 'title', 'slug', 'content_type', 'author', 'categories',
            'content', 'excerpt', 'featured_image', 'is_published',
            'published_date', 'created_at', 'updated_at'
        ]
        read_only_fields = ['author', 'created_at', 'updated_at']

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'text', 'created_at', 'is_approved']
        read_only_fields = ['author', 'created_at', 'is_approved']
