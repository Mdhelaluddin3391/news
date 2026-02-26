from rest_framework import generics
from .models import StaticPage
from .serializers import StaticPageSerializer

class StaticPageDetailView(generics.RetrieveAPIView):
    queryset = StaticPage.objects.all()
    serializer_class = StaticPageSerializer
    lookup_field = 'slug'