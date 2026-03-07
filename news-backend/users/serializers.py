from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # 'role' ko add kiya gaya hai taaki frontend me dikh sake
        fields = ('id', 'name', 'email', 'profile_picture', 'bio', 'role', 'created_at')
        # 'role' read-only hai taaki user edit profile se apna role change na kar sake
        read_only_fields = ('id', 'email', 'role', 'created_at')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('name', 'email', 'password')

    def create(self, validated_data):
        # Industry Standard Security: Yahan explicitly role='subscriber' set kiya hai
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            role='subscriber' 
        )
        return user