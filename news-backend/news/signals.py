from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Article, Category, Author

# 1. Article Save (Create/Update) hone par
@receiver(post_save, sender=Article)
def clear_cache_on_article_save(sender, instance, **kwargs):
    print(f"Article '{instance.title}' saved. Clearing cache...")
    cache.clear()

# 2. Article Delete hone par
@receiver(post_delete, sender=Article)
def clear_cache_on_article_delete(sender, instance, **kwargs):
    print(f"Article '{instance.title}' deleted. Clearing cache...")
    cache.clear()

# 3. Category Save ya Delete hone par (Kyunki Categories bhi cache hoti hain)
@receiver(post_save, sender=Category)
@receiver(post_delete, sender=Category)
def clear_cache_on_category_change(sender, instance, **kwargs):
    print(f"Category '{instance.name}' updated. Clearing cache...")
    cache.clear()

# 4. Author Save ya Delete hone par
@receiver(post_save, sender=Author)
@receiver(post_delete, sender=Author)
def clear_cache_on_author_change(sender, instance, **kwargs):
    print("Author updated. Clearing cache...")
    cache.clear()