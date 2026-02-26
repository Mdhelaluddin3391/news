from django.db import models
from apps.users.models import User
from apps.categories.models import Category, Tag

class Article(models.Model):
    STATUS_CHOICES = (
        ("draft", "Draft"),
        ("published", "Published"),
    )

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    excerpt = models.TextField()
    content = models.TextField()
    featured_image = models.ImageField(upload_to="articles/images/")
    
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="articles")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="articles")
    tags = models.ManyToManyField(Tag, blank=True, related_name="articles")

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")

    is_featured = models.BooleanField(default=False)
    is_trending = models.BooleanField(default=False)
    is_breaking = models.BooleanField(default=False)

    views_count = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']