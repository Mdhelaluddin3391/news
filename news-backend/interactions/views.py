from rest_framework import viewsets, permissions
from .models import Bookmark, Comment
from .serializers import BookmarkSerializer, CommentSerializer

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    
    # --- NAYA CODE YAHAN SE START HAI ---
    def get_permissions(self):
        # 'list' aur 'retrieve' (comments dekhna) sabke liye allow hai
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        # Comment create, update ya delete karne ke liye login (IsAuthenticated) hona zaroori hai
        return [permissions.IsAuthenticated()]
    # --- NAYA CODE YAHAN END HAI ---
    
    def get_queryset(self):
        # Agar URL mein article_id pass kiya hai, toh sirf uske comments laaye
        article_id = self.request.query_params.get('article_id')
        queryset = Comment.objects.filter(is_active=True).order_by('-created_at')
        if article_id:
            queryset = queryset.filter(article_id=article_id)
        return queryset

    def perform_create(self, serializer):
        # Comment banane wale user ko automatically set karein
        serializer.save(user=self.request.user)

class BookmarkViewSet(viewsets.ModelViewSet):
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated] # Sirf logged in users

    def get_queryset(self):
        # Sirf current logged-in user ke saved articles return karein
        return Bookmark.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)