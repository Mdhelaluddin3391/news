from django.urls import path
from .views import SearchNewsListView

urlpatterns = [
    path('', SearchNewsListView.as_view()),
]