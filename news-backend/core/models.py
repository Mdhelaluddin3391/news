from django.db import models
from tinymce.models import HTMLField


class BaseModel(models.Model):
    """
    Industry standard: Ek abstract base class jisme sabhi tables ke liye 
    created_at aur updated_at fields automatically handle honge.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_resolved = models.BooleanField(default=False, help_text="Mark if this query has been handled.")

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"
    

