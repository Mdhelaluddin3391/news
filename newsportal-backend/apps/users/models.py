from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True, verbose_name="Email Address")
    
    full_name = models.CharField(max_length=255)
    
    bio = models.TextField(blank=True, null=True, help_text="Author ke baare me jankari")
    profile_picture = models.ImageField(upload_to='users/profiles/', blank=True, null=True)
    
    followers = models.ManyToManyField(
        'self', 
        symmetrical=False, 
        related_name='following', 
        blank=True
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']

    def __str__(self):
        return self.full_name if self.full_name else self.email

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'