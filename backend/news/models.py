from django.db import models
from core.models import PublishableModel
from django.conf import settings
from django.utils.text import slugify
from django.utils.crypto import get_random_string



class News(PublishableModel):

    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    excerpt = models.TextField()
    content = models.TextField()

    image = models.ImageField(upload_to='news/')

    category = models.ForeignKey(
        'categories.Category',
        on_delete=models.CASCADE,
        related_name='articles'
    )

    tags = models.ManyToManyField(
        'tags.Tag',
        blank=True,
        related_name='articles'
    )

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='articles'
    )

    is_featured = models.BooleanField(default=False)
    is_breaking = models.BooleanField(default=False)

    views_count = models.PositiveIntegerField(default=0)
    comments_count = models.PositiveIntegerField(default=0)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')

    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return self.title
    
class PublishedManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(
            status='published',
            is_active=True
        )








def save(self, *args, **kwargs):
    if not self.slug:
        base_slug = slugify(self.title)
        slug = base_slug
        while News.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{get_random_string(4)}"
        self.slug = slug
    super().save(*args, **kwargs)
