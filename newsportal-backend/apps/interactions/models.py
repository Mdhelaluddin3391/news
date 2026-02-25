from django.db import models
from apps.users.models import User
from apps.news.models import Article
from apps.core.models import TimeStampedModel


class SavedArticle(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="saved_articles")
    article = models.ForeignKey(Article, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("user", "article")


class Like(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("user", "article")