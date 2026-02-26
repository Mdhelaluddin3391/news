from django.urls import path
from .views import SavedArticleListView, SavedArticleToggleView

urlpatterns = [
    path('saved/', SavedArticleListView.as_view()),
    path('saved/toggle/', SavedArticleToggleView.as_view()),
]