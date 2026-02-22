from django.contrib import admin
from .models import Comment, CommentLike

class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'article', 'is_approved', 'created_at')
    list_filter = ('is_approved', 'created_at')
    search_fields = ('content', 'author__username', 'article__title')
    fieldsets = (
        ('Content', {'fields': ('article', 'author', 'content', 'parent_comment')}),
        ('Moderation', {'fields': ('is_approved',)}),
        ('Metrics', {'fields': ('likes_count',)}),
    )
    readonly_fields = ('created_at', 'updated_at')

admin.site.register(Comment, CommentAdmin)
admin.site.register(CommentLike)
