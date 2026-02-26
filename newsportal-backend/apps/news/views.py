from rest_framework import generics
from .models import Article
from .serializers import ArticleListSerializer, ArticleDetailSerializer

class TrendingNewsListView(generics.ListAPIView):
    serializer_class = ArticleListSerializer

    def get_queryset(self):
        return Article.objects.filter(status='published', is_trending=True).order_by('-views_count')[:10]

class BreakingNewsListView(generics.ListAPIView):
    serializer_class = ArticleListSerializer

    def get_queryset(self):
        return Article.objects.filter(status='published', is_breaking=True).order_by('-created_at')[:5]

class ArticleDetailView(generics.RetrieveAPIView):
    queryset = Article.objects.filter(status='published')
    serializer_class = ArticleDetailSerializer
    lookup_field = 'id'

class CategoryNewsListView(generics.ListAPIView):
    serializer_class = ArticleListSerializer

    def get_queryset(self):
        return Article.objects.filter(status='published', category__slug=self.kwargs['slug']).order_by('-created_at')

class SearchNewsListView(generics.ListAPIView):
    serializer_class = ArticleListSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        return Article.objects.filter(status='published', title__icontains=query).order_by('-created_at')