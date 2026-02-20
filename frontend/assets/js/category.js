import { initComponents, getQueryParam } from './app.js';
import { fetchNewsByCategory, fetchCategories } from './api-adapter.js';

const renderArticleCard = (a) => `
  <div class="category-news-card">
    <img src="${a.image}" alt="${a.title}">
    <div class="category-news-card-content">
      <span class="category-tag">${a.category_slug.toUpperCase()}</span>
      <h3 class="category-news-title"><a href="/news-detail.html?id=${a.id}">${a.title}</a></h3>
      <p class="category-news-excerpt">${a.excerpt}</p>
      <div class="category-news-meta">
        <span><i class="far fa-clock"></i> ${new Date(a.date).toLocaleString()}</span>
        <span><i class="far fa-eye"></i> ${a.views} views</span>
      </div>
    </div>
  </div>
`;

const updateDateTime = () => {
  const now = new Date();
  const dateElement = document.getElementById('current-date');
  const timeElement = document.getElementById('current-time');
  if (!dateElement || !timeElement) return;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateElement.textContent = now.toLocaleDateString('en-US', options);
  timeElement.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const init = async () => {
  await initComponents();
  updateDateTime();
  setInterval(updateDateTime, 60000);

  const slug = getQueryParam('slug') || 'technology';
  const categories = await fetchCategories();
  const category = categories.find((c) => c.slug === slug) || { name: slug };
  const titleEl = document.getElementById('category-title');
  const descEl = document.getElementById('category-description');
  if (titleEl) titleEl.textContent = category.name;
  if (descEl) descEl.textContent = `Latest articles for ${category.name}.`;

  const articles = await fetchNewsByCategory(slug);
  const grid = document.getElementById('category-news-grid');
  if (!grid) return;
  if (!articles || articles.length === 0) {
    grid.innerHTML = '<p>No articles found in this category.</p>';
    return;
  }
  grid.innerHTML = articles.map(renderArticleCard).join('');
};

document.addEventListener('DOMContentLoaded', init);
