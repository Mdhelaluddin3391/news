from django.urls import path
from .views import CommentListCreateView

urlpatterns = [
    path('article/<int:article_id>/', CommentListCreateView.as_view()),
]