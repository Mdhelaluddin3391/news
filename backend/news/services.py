from .models import News
from django.db.models import Count

def get_homepage_data():

    featured = News.published.filter(is_featured=True).select_related(
        'category', 'author'
    ).first()

    latest = News.published.select_related(
        'category', 'author'
    ).order_by('-published_at')[:6]

    breaking = News.published.filter(is_breaking=True)[:5]

    trending = News.published.order_by('-views_count')[:5]

    return {
        "featured": featured,
        "latest": latest,
        "breaking": breaking,
        "trending": trending
    }
