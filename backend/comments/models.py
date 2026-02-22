from django.db import models
from django.conf import settings
from news.models import News

class Comment(models.Model):
    """Article comments/discussion model"""
    
    article = models.ForeignKey(
        News,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    
    # Comment structure
    content = models.TextField(max_length=1000)
    parent_comment = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='replies'
    )
    
    # Moderation
    is_approved = models.BooleanField(default=False)  # Pending approval from admin
    
    # Metrics
    likes_count = models.PositiveIntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Comment"
        verbose_name_plural = "Comments"
    
    def __str__(self):
        return f"Comment by {self.author} on {self.article}"


class CommentLike(models.Model):
    """User likes on comments"""
    
    comment = models.ForeignKey(
        Comment,
        on_delete=models.CASCADE,
        related_name='user_likes'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('comment', 'user')
    
    def __str__(self):
        return f"{self.user} likes comment {self.comment.id}"
