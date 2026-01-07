from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import AuthorProfile, Book, Category, Content, Comment, Link
from .serializers import (
    UserSerializer, AuthorProfileSerializer, BookSerializer, LinkSerializer, CategorySerializer,
    ContentSerializer, CommentSerializer
)


class IsAuthorOrStaffOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if not (request.user and request.user.is_authenticated):
            return False
        if request.user.is_staff or request.user.is_superuser:
            return True
        return getattr(obj, 'author_id', None) == request.user.id


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)

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


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by('-is_featured', '-updated_at')
    serializer_class = BookSerializer
    lookup_field = 'slug'
    permission_classes = [IsAdminOrReadOnly]


class LinkViewSet(viewsets.ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = Link.objects.all()
        if not (self.request.user and self.request.user.is_authenticated):
            queryset = queryset.filter(is_published=True)
        return queryset

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
    permission_classes = [IsAuthorOrStaffOrReadOnly]

    def get_queryset(self):
        queryset = Content.objects.all()
        content_type = self.request.query_params.get('type', None)
        category = self.request.query_params.get('category', None)
        published = self.request.query_params.get('published', None)

        if not (self.request.user and self.request.user.is_authenticated):
            queryset = queryset.filter(is_published=True)
        
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
        self.check_object_permissions(request, content)
        content.is_published = True
        content.save()
        return Response({'status': 'published'})

    @action(detail=True, methods=['post'])
    def unpublish(self, request, slug=None):
        content = self.get_object()
        self.check_object_permissions(request, content)
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

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def approve(self, request, pk=None):
        comment = self.get_object()
        comment.is_approved = True
        comment.save()
        return Response({'status': 'approved'})
