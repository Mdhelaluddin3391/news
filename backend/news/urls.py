from django.urls import path
from .views import HomePageAPIView

urlpatterns = [
    path('home/', HomePageAPIView.as_view()),
]
