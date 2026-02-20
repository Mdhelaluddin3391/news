from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):

    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('editor', 'Editor'),
        ('author', 'Author'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='author')
    bio = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to='authors/', blank=True)

    twitter = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)

    def __str__(self):
        return self.username
