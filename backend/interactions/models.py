from django.db import models

class ArticleView(models.Model):
    article = models.ForeignKey(
        'news.News',
        on_delete=models.CASCADE,
        related_name='views'
    )
    ip_address = models.GenericIPAddressField()
    viewed_at = models.DateTimeField(auto_now_add=True)
