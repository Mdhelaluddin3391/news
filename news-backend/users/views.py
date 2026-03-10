from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
import jwt
import datetime
from .serializers import RegisterSerializer, UserSerializer
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        # Current logged-in user ki profile return karega
        return self.request.user

class ForgotPasswordView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            
            # Generate a secure JWT token valid for 15 minutes
            payload = {
                'user_id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=15),
                'type': 'reset_password'
            }
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

            # Create the reset link
            reset_link = f"{settings.FRONTEND_URL}/reset-password.html?token={token}"

            # Send Email
            send_mail(
                subject='Password Reset Request - NewsHub',
                message=f'Hello {user.name},\n\nClick the link below to reset your password. This link is valid for 15 minutes:\n\n{reset_link}\n\nIf you did not request this, please ignore this email.',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )
        except User.DoesNotExist:
            pass

        return Response({"message": "If that email is registered, we have sent a reset link."})

class ResetPasswordView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        token = request.data.get('token')
        password = request.data.get('password')

        if not token or not password:
            return Response({"error": "Token and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            
            if payload.get('type') != 'reset_password':
                raise jwt.InvalidTokenError

            user = User.objects.get(id=payload['user_id'])
            user.set_password(password)
            user.save()

            return Response({"message": "Password reset successful."})

        except jwt.ExpiredSignatureError:
            return Response({"error": "The reset link has expired. Please request a new one."}, status=status.HTTP_400_BAD_REQUEST)
        except (jwt.InvalidTokenError, User.DoesNotExist):
            return Response({"error": "Invalid reset link."}, status=status.HTTP_400_BAD_REQUEST)
        

class GoogleLoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        token = request.data.get('token')
        if not token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Google token verify karein
            idinfo = id_token.verify_oauth2_token(
                token, 
                google_requests.Request(), 
                settings.GOOGLE_CLIENT_ID
            )

            email = idinfo['email']
            name = idinfo.get('name', 'Google User')
            picture = idinfo.get('picture', '')

            # Check karein ki user pehle se hai ya nahi
            user, created = User.objects.get_or_create(email=email)
            
            if created:
                # Naya user hai toh details save karein
                user.name = name
                user.role = 'subscriber'
                user.set_unusable_password() # Kyunki password Google handle kar raha hai
                user.save()

            # Generate JWT tokens for our app
            refresh = RefreshToken.for_user(user)

            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': UserSerializer(user).data
            })

        except ValueError:
            # Invalid token
            return Response({"error": "Invalid Google Token"}, status=status.HTTP_400_BAD_REQUEST)