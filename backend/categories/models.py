from django.db import models
from core.models import TimeStampedModel

class Category(TimeStampedModel):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    description = models.TextField(blank=True)
    color = models.CharField(max_length=20, blank=True)

    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)

    def __str__(self):
        return self.name
