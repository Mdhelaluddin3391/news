# news/models.py
from django.db import models
from django.conf import settings
from categories.models import Category
from tags.models import Tag
from django.utils.text import slugify

class News(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='news_articles')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='news')
    tags = models.ManyToManyField(Tag, blank=True)
    
    # Content
    excerpt = models.CharField(max_length=500, help_text="Short description for home page cards")
    content = models.TextField()
    featured_image = models.ImageField(upload_to='news_images/')
    
    # Flags for Home Page (Ye index.html ke hisaab se bahut zaruri hain)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    is_featured = models.BooleanField(default=False, help_text="Show in the main big banner")
    is_breaking = models.BooleanField(default=False, help_text="Show in the top breaking news ticker")
    is_trending = models.BooleanField(default=False, help_text="Show in the trending sidebar")
    
    # Metrics
    views_count = models.PositiveIntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "News Article"
        verbose_name_plural = "News Articles"
        ordering = ['-created_at'] # Hamesha latest news pehle dikhegi

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(News, self).save(*args, **kwargs)

    def __str__(self):
        return self.title