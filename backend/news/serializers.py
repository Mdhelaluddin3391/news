from rest_framework import serializers
from .models import News

class NewsSerializer(serializers.ModelSerializer):

    category = serializers.StringRelatedField()
    author = serializers.StringRelatedField()

    class Meta:
        model = News
        fields = '__all__'
