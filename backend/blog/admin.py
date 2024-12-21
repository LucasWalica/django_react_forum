from django.contrib import admin
from .models import CommentOnPost, Post
# Register your models here.
admin.site.register(CommentOnPost)
admin.site.register(Post)
