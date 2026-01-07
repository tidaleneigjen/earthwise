from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'profiles', views.AuthorProfileViewSet)
router.register(r'books', views.BookViewSet)
router.register(r'links', views.LinkViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'content', views.ContentViewSet, basename='content')
router.register(r'comments', views.CommentViewSet, basename='comment')

app_name = 'api'

urlpatterns = [
    path('', include(router.urls)),
]
