from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import AuthorProfile, Category, Content, Comment
from .serializers import (
    UserSerializer, AuthorProfileSerializer, CategorySerializer,
    ContentSerializer, CommentSerializer
)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class AuthorProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint for author profiles.
    """
    queryset = AuthorProfile.objects.all()
    serializer_class = AuthorProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for content categories.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ContentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for content pieces (articles, blogs, teachings, etc.).
    """
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Content.objects.all()
        content_type = self.request.query_params.get('type', None)
        category = self.request.query_params.get('category', None)
        published = self.request.query_params.get('published', None)
        
        if content_type:
            queryset = queryset.filter(content_type=content_type)
        if category:
            queryset = queryset.filter(categories__slug=category)
        if published and published.lower() == 'true':
            queryset = queryset.filter(is_published=True)
            
        return queryset.order_by('-published_date')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def publish(self, request, slug=None):
        content = self.get_object()
        content.is_published = True
        content.save()
        return Response({'status': 'published'})

    @action(detail=True, methods=['post'])
    def unpublish(self, request, slug=None):
        content = self.get_object()
        content.is_published = False
        content.save()
        return Response({'status': 'unpublished'})

class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for comments on content.
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Comment.objects.filter(is_approved=True)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        comment = self.get_object()
        comment.is_approved = True
        comment.save()
        return Response({'status': 'approved'})
