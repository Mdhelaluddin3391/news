from django.db import models
from apps.core.models import TimeStampedModel

class ContactMessage(TimeStampedModel):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    is_resolved = models.BooleanField(default=False)

    def __str__(self):
        return self.name