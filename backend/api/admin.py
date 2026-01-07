from django.contrib import admin
from .models import AuthorProfile, Book, Category, Content, Comment, Link

# Register your models here.

admin.site.register(AuthorProfile)
admin.site.register(Book)
admin.site.register(Link)
admin.site.register(Category)
admin.site.register(Content)
admin.site.register(Comment)
