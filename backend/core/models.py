from django.db import models

# Create your models here.
class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class PublishableModel(TimeStampedModel):
    is_active = models.BooleanField(default=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True
