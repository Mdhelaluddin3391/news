from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import SavedArticle
from .serializers import SavedArticleSerializer, SavedArticleCreateSerializer

class SavedArticleListView(generics.ListAPIView):
    serializer_class = SavedArticleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedArticle.objects.filter(user=self.request.user)

class SavedArticleToggleView(generics.GenericAPIView):
    serializer_class = SavedArticleCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        article_id = request.data.get('article')
        saved_article = SavedArticle.objects.filter(user=request.user, article_id=article_id).first()
        
        if saved_article:
            saved_article.delete()
            return Response({"status": "removed"}, status=status.HTTP_200_OK)
        else:
            SavedArticle.objects.create(user=request.user, article_id=article_id)
            return Response({"status": "saved"}, status=status.HTTP_201_CREATED)