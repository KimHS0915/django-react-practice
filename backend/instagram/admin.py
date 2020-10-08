from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Post, Tag, Comment


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["photo_tag", "caption"]
    list_display_links = ["caption"]
    list_per_page = 10
    list_filter = ("created_at", "updated_at")
    search_fields = ["caption"]

    def photo_tag(self, post):
        return mark_safe(f"<img src={post.photo.url} style='width: 100px;' />")


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ["author", "post", "message"]
    list_per_page = 20
    list_filter = ("created_at", "updated_at")
    search_fields = ["message"]
