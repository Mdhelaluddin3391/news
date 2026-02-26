from rest_framework import serializers
from .models import Article
from apps.categories.serializers import CategorySerializer, TagSerializer

class ArticleListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    image = serializers.ImageField(source='featured_image', read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'excerpt', 'image', 'category', 'created_at', 'views_count']

class ArticleDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    image = serializers.ImageField(source='featured_image', read_only=True)
    author_name = serializers.CharField(source='author.full_name', read_only=True)
    author_id = serializers.IntegerField(source='author.id', read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'excerpt', 'content', 'image', 'category', 'tags', 'author_name', 'author_id', 'created_at', 'views_count']