from rest_framework import generics
from apps.news.models import Article
from apps.news.serializers import ArticleListSerializer

class SearchNewsListView(generics.ListAPIView):
    serializer_class = ArticleListSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        if query:
            return Article.objects.filter(status='published', title__icontains=query).order_by('-created_at')
        return Article.objects.none()