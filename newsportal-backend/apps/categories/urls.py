from django.urls import path
from .views import CategoryListView, TagListView

urlpatterns = [
    path('categories/', CategoryListView.as_view()),
    path('tags/', TagListView.as_view()),
]