from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Article, Category
from .serializers import ArticleSerializer, CategorySerializer
from users.permissions import IsReporterAuthorOrAbove, IsOwnerOrEditorOrAdmin
from .models import Article, Category, Author
from .serializers import ArticleSerializer, CategorySerializer, AuthorSerializer
from users.permissions import IsReporterAuthorOrAbove, IsOwnerOrEditorOrAdmin

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """Frontend par categories dikhane ke liye (ReadOnly)"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-published_at')
    serializer_class = ArticleSerializer
    
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    
    filterset_fields = ['category__slug', 'author', 'is_featured', 'is_trending', 'is_breaking']
    
    search_fields = ['title', 'content', 'description']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        
        elif self.action == 'create':
            permission_classes = [IsReporterAuthorOrAbove]
        
        elif self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsOwnerOrEditorOrAdmin]
            
        else:
            permission_classes = [permissions.IsAuthenticated]
            
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
       
        serializer.save(author=self.request.user.author_profile)

class AuthorViewSet(viewsets.ReadOnlyModelViewSet):
    """Frontend par sabhi authors ki list dikhane ke liye (ReadOnly)"""
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [permissions.AllowAny]