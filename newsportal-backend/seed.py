import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.users.models import User
from apps.categories.models import Category, Tag
from apps.news.models import Article

User.objects.all().delete()
Category.objects.all().delete()
Tag.objects.all().delete()
Article.objects.all().delete()

admin_user = User.objects.create_superuser(
    email='admin@news.com',
    username='admin',
    password='password123',
    full_name='Admin User'
)

tech = Category.objects.create(name='Technology', slug='technology', description='Tech news')
sports = Category.objects.create(name='Sports', slug='sports', description='Sports news')
politics = Category.objects.create(name='Politics', slug='politics', description='Politics news')

tag_ai = Tag.objects.create(name='AI', slug='ai')
tag_cricket = Tag.objects.create(name='Cricket', slug='cricket')
tag_election = Tag.objects.create(name='Election', slug='election')

article1 = Article.objects.create(
    title='The Future of AI in 2026',
    slug='future-of-ai-2026',
    excerpt='AI is revolutionizing the tech industry rapidly.',
    content='Here is the full content about the future of Artificial Intelligence...',
    featured_image='', 
    author=admin_user,
    category=tech,
    status='published',
    is_featured=True,
    is_trending=True,
    views_count=1500
)
article1.tags.add(tag_ai)

article2 = Article.objects.create(
    title='World Cup Finals Announced',
    slug='world-cup-finals',
    excerpt='The highly anticipated cricket world cup finals are here.',
    content='Details about the teams and the venue for the upcoming finals...',
    featured_image='', 
    author=admin_user,
    category=sports,
    status='published',
    is_breaking=True,
    views_count=850
)
article2.tags.add(tag_cricket)

article3 = Article.objects.create(
    title='Global Elections Update',
    slug='global-elections-update',
    excerpt='Major shifts seen in the latest election polls.',
    content='An in-depth analysis of the political landscape and election results...',
    featured_image='', 
    author=admin_user,
    category=politics,
    status='published',
    is_trending=True,
    views_count=1200
)
article3.tags.add(tag_election)

print("Database successfully seeded with dummy data!")