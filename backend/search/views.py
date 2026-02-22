from django.shortcuts import render
from django.db.models import Q
from news.models import News
from .models import SearchQuery

def search_articles(query):
    """Search articles by title, content, or author"""
    
    results = News.objects.filter(
        Q(title__icontains=query) |
        Q(content__icontains=query) |
        Q(author__username__icontains=query),
        status='published'
    ).distinct()
    
    # Track search query
    SearchQuery.objects.create(
        query=query,
        results_count=results.count()
    )
    
    return results
