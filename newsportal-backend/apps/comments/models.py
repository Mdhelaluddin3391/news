from django.db import models
from apps.core.models import TimeStampedModel
from apps.users.models import User
from apps.news.models import Article

class Comment(TimeStampedModel):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()

    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="replies"
    )

    is_approved = models.BooleanField(default=True)

    def __str__(self):
        return f"Comment by {self.user}"