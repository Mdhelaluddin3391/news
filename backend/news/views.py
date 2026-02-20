from rest_framework.views import APIView
from rest_framework.response import Response
from .services import get_homepage_data
from .serializers import NewsSerializer

class HomePageAPIView(APIView):

    def get(self, request):
        data = get_homepage_data()

        return Response({
            "featured": NewsSerializer(data["featured"]).data if data["featured"] else None,
            "latest": NewsSerializer(data["latest"], many=True).data,
            "breaking": NewsSerializer(data["breaking"], many=True).data,
            "trending": NewsSerializer(data["trending"], many=True).data,
        })
