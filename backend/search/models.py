from django.db import models
from news.models import News

class SearchQuery(models.Model):
    """Track search queries for analytics"""
    query = models.CharField(max_length=250)
    results_count = models.PositiveIntegerField(default=0)
    searched_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-searched_at']
        verbose_name = "Search Query"
        verbose_name_plural = "Search Queries"
    
    def __str__(self):
        return self.query
