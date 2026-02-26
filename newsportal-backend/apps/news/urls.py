from django.urls import path
from .views import TrendingNewsListView, BreakingNewsListView, ArticleDetailView, CategoryNewsListView, SearchNewsListView

urlpatterns = [
    path('trending/', TrendingNewsListView.as_view()),
    path('breaking/', BreakingNewsListView.as_view()),
    path('<int:id>/', ArticleDetailView.as_view()),
    path('category/<slug:slug>/', CategoryNewsListView.as_view()),
    path('search/', SearchNewsListView.as_view()),
]