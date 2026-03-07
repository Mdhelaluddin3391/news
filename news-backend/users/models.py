from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from core.models import BaseModel

class UserManager(BaseUserManager):
    """Custom manager email base login ke liye"""
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email address is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin') # Automatically make superusers 'admin'
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser, BaseModel):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('editor', 'Editor'),
        ('reporter', 'Reporter'),
        ('author', 'Author'),
        ('subscriber', 'Subscriber'),
    )

    username = None
    email = models.EmailField(unique=True, verbose_name="Email Address")
    name = models.CharField(max_length=255)
    
    # NEW: Add the role field
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='subscriber')
    
    profile_picture = models.ImageField(upload_to='users/avatars/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"