from django.db import models

# Create your models here.
class Advertisement(models.Model):
    POSITION_CHOICES = (
        ('header', 'Header Banner'),
        ('sidebar', 'Sidebar'),
        ('footer', 'Footer'),
    )

    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='ads/')
    link = models.URLField()
    position = models.CharField(max_length=50, choices=POSITION_CHOICES)
    is_active = models.BooleanField(default=True)
