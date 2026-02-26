from rest_framework import serializers
from .models import SavedArticle
from apps.news.serializers import ArticleListSerializer

class SavedArticleSerializer(serializers.ModelSerializer):
    article = ArticleListSerializer(read_only=True)

    class Meta:
        model = SavedArticle
        fields = ['id', 'article', 'saved_at']

class SavedArticleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedArticle
        fields = ['article']