from django.urls import path
from .views import StaticPageDetailView

urlpatterns = [
    path('pages/<slug:slug>/', StaticPageDetailView.as_view()),
]