from rest_framework import serializers
from .models import Comment, CommentLike
from accounts.models import User

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'profile_image')

class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    replies = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = ('id', 'article', 'author', 'content', 'parent_comment', 'is_approved', 'likes_count', 'created_at', 'replies')
        read_only_fields = ('id', 'created_at', 'likes_count')
    
    def get_replies(self, obj):
        if obj.replies.exists():
            return CommentSerializer(obj.replies.filter(is_approved=True), many=True).data
        return []
